"""Render the canonical SUBMISSION.md as a review PDF or final attachment.

Run: uv run --with reportlab python scripts/build-submission-pdf.py
After applicant audio is verified: uv run --with reportlab python scripts/build-submission-pdf.py --final
This is an authoring helper, not an application runtime dependency.
"""
from pathlib import Path
import argparse
import html
import re
from collections.abc import Iterator

import reportlab
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Flowable, PageBreak, Paragraph, Preformatted, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = (ROOT / "SUBMISSION.md").read_text(encoding="utf-8")


def section(name: str) -> str:
    match = re.search(r"^## " + re.escape(name) + r"\n(.*?)(?=^## |^---|\Z)", SOURCE, re.M | re.S)
    if not match:
        raise ValueError(f"Missing section: {name}")
    return match.group(1).strip()


def fonts() -> tuple[str, str]:
    font_dir = Path(reportlab.__file__).resolve().parent / "fonts"
    pdfmetrics.registerFont(TTFont("Submission", str(font_dir / "Vera.ttf")))
    pdfmetrics.registerFont(TTFont("Submission-Bold", str(font_dir / "VeraBd.ttf")))
    pdfmetrics.registerFontFamily("Submission", normal="Submission", bold="Submission-Bold")
    return "Submission", "Submission-Bold"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--final", action="store_true", help="Only after applicant audio/link checks")
    args = parser.parse_args()
    voice = section("Voice response to Maya (two minutes or less)")
    if args.final:
        # The entire voice section must be replaced; a URL alongside rehearsal
        # text is not a finished recording section. Playback is verified separately.
        if not re.fullmatch(r"https://\S+", voice):
            raise ValueError("Final PDF requires only the real applicant recording URL in the voice section")
        output = ROOT / "output/pdf/VCycene-submission.pdf"
    else:
        output = ROOT / "output/pdf/VCycene-submission-draft.pdf"
    regular, bold = fonts()
    styles = {
        "title": ParagraphStyle("title", fontName=bold, fontSize=19, leading=23, textColor=colors.HexColor("#1d2939"), spaceAfter=9),
        "subtitle": ParagraphStyle("subtitle", fontName=regular, fontSize=9, leading=13, textColor=colors.HexColor("#667085"), spaceAfter=10),
        "heading": ParagraphStyle("heading", fontName=bold, fontSize=11, leading=15, textColor=colors.HexColor("#193a52"), spaceBefore=11, spaceAfter=6),
        "body": ParagraphStyle("body", fontName=regular, fontSize=9, leading=13, textColor=colors.HexColor("#344054"), spaceAfter=7),
        "warning": ParagraphStyle("warning", fontName=bold, fontSize=9, leading=13, textColor=colors.HexColor("#9f2d20"), spaceAfter=10),
        "code": ParagraphStyle("code", fontName="Courier", fontSize=8, leading=11, textColor=colors.HexColor("#344054"), leftIndent=8, spaceAfter=8),
    }

    def para(text: str, style: str = "body") -> Paragraph:
        escaped = html.escape(text).replace("`", "").replace("\n", "<br/>")
        escaped = re.sub(r"https://[^\s<]+", lambda m: f'<link href="{m.group(0)}" color="#1266a6">{m.group(0)}</link>', escaped)
        return Paragraph(escaped, styles[style])

    def counted_heading(label: str, name: str, limit: int) -> str:
        count = len(section(name).split())
        if count > limit:
            raise ValueError(f"{name} exceeds its {limit}-word limit ({count})")
        return f"{label}  ({count} / {limit} words)"

    def blocks(text: str) -> Iterator[Flowable]:
        for part in re.split(r"\n\s*\n", text):
            if not part.strip():
                continue
            if part.startswith("```"):
                code = part.strip().strip("`").removeprefix("bash\n").strip()
                yield Preformatted(code, styles["code"])
            else:
                yield para(part)

    story: list[Flowable] = [
        para("VCycene Monday Queue", "title"),
        para(
            ("Application submission" if args.final else "Application review copy")
            + "  |  Fictional scenario: Monday, October 5, 2026",
            "subtitle",
        ),
    ]
    if not args.final:
        story.append(para("DRAFT — NOT READY TO SUBMIT. Applicant recording and final access checks remain pending.", "warning"))
    story.append(para("01  Open the tool", "heading"))
    tool = section("Tool")
    repository = re.search(r"^Repository: (https://\S+)$", tool, re.M)
    if not repository:
        raise ValueError("The canonical tool section needs a repository URL")
    story.append(para(repository.group(0)))
    story.extend(blocks(tool.replace(repository.group(0), "", 1).strip()))
    story.append(para(counted_heading("02  Build notes", "Build notes (under 200 words)", 200), "heading"))
    story.extend(blocks(section("Build notes (under 200 words)")))
    story.extend([Spacer(1, 12), para("The customer and team responses follow. All names, tickets, and policies are fictional.", "subtitle"), PageBreak(), para("Customer and team responses", "title"), para("Scenario date: October 5, 2026  |  Messages remain unsent", "subtitle")])
    for label, name in [
        (counted_heading("03  Maya written reply", "Written reply to Maya (under 150 words)", 150), "Written reply to Maya (under 150 words)"),
        ("04  Voice response to Maya" if args.final else "04  Recording pending", "Voice response to Maya (two minutes or less)"),
        (counted_heading("05  Message to Wei", "Message to Wei (under 120 words)", 120), "Message to Wei (under 120 words)"),
        (counted_heading("06  Manager update", "Message to manager, Monday end of day (under 120 words)", 120), "Message to manager, Monday end of day (under 120 words)"),
    ]:
        story.append(para(label, "heading"))
        text = section(name)
        if label.startswith("04") and not args.final:
            first, *rest = text.split("\n\n")
            story.append(para(first, "warning"))
            story.extend(para(part) for part in rest)
        else:
            story.extend(blocks(text))

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont(regular, 8)
        canvas.setFillColor(colors.HexColor("#667085"))
        canvas.drawString(48, 28, "VCycene Monday Queue" if args.final else "REVIEW COPY  |  Recording pending")
        canvas.drawRightString(letter[0] - 48, 28, f"Page {doc.page}")
        canvas.restoreState()

    output.parent.mkdir(parents=True, exist_ok=True)
    document = SimpleDocTemplate(str(output), pagesize=letter, rightMargin=48, leftMargin=48, topMargin=42, bottomMargin=48, title="VCycene Monday Queue submission" if args.final else "VCycene Monday Queue draft", author="Raghunath Prabhakar")
    document.build(story, onFirstPage=footer, onLaterPages=footer)
    print(output)


if __name__ == "__main__":
    main()
