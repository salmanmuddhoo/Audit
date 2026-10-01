"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";
import { FacebookIcon, LinkedinIcon, WhatsappIcon, XIcon } from "@/components/ui/brand-icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedinIcon },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: XIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: WhatsappIcon },
    { label: "Share by email", href: `mailto:?subject=${t}&body=${u}`, Icon: Mail },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const cls =
    "inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-500 hover:text-teal-600";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-navy-900">Share</span>
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>
          <Icon className="size-4" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className={cls}>
        {copied ? <Check className="size-4 text-teal-600" /> : <Link2 className="size-4" />}
      </button>
      {copied ? <span className="text-xs text-teal-600">Link copied</span> : null}
    </div>
  );
}
