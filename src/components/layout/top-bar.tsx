import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "./social-links";
import type { SiteSettings } from "@/lib/content";

export function TopBar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="hidden bg-navy-950 text-[13px] text-white/80 md:block">
      <Container className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href={`mailto:${settings.contact.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
            <Mail className="size-3.5 text-teal-400" aria-hidden />
            {settings.contact.email}
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-teal-400" aria-hidden />
            {settings.contact.location}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden font-medium tracking-wide text-teal-400 lg:inline">{settings.tagline}</span>
          <SocialLinks links={settings.social} className="gap-3" iconClassName="size-3.5" />
        </div>
      </Container>
    </div>
  );
}
