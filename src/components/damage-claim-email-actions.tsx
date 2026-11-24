import { z } from "zod";

import { Button, buttonVariants } from "./ui/button";

const email = z.email();

function composeHref(recipient: string | undefined, subject: string) {
  const address = email.safeParse(recipient?.trim());
  if (!address.success) return undefined;

  const at = address.data.lastIndexOf("@");
  const mailbox = encodeURIComponent(address.data.slice(0, at));
  return `mailto:${mailbox}${address.data.slice(at)}?subject=${encodeURIComponent(subject)}`;
}

const actions = [
  {
    label: "Email claims team",
    href: composeHref(import.meta.env.VITE_T104_CLAIMS_EMAIL, "T-104: Carrier damage claim"),
    missing: "Claims team address is not configured.",
  },
  {
    label: "Email Tom",
    href: composeHref(import.meta.env.VITE_T104_CUSTOMER_EMAIL, "T-104: Update on your damaged delivery"),
    missing: "Tom’s email address is not configured.",
  },
];

export function DamageClaimEmailActions() {
  const unavailable = actions.filter((action) => !action.href);

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap gap-2">
        {actions.map(({ label, href }) => href ? (
          <a key={label} className={buttonVariants({ variant: "outline", size: "sm" })} href={href}>
            {label}
          </a>
        ) : (
          <Button key={label} variant="outline" size="sm" disabled aria-describedby="claim-email-help">
            {label}
          </Button>
        ))}
      </div>
      <p id="claim-email-help" className="text-xs text-muted-foreground">
        {unavailable.length > 0 && unavailable.map(({ missing }) => missing).join(" ")}
        {unavailable.length < actions.length && (
          <>{unavailable.length > 0 && " "}Opens your mail app. Check the From address and send there.</>
        )}
      </p>
    </div>
  );
}