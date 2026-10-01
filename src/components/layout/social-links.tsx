import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/content";

const icons = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  x: XIcon,
};

const labels = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
  instagram: "Instagram",
  x: "X",
};

export function SocialLinks({
  links,
  className,
  iconClassName = "size-4",
  variant = "subtle",
}: {
  links: SiteSettings["social"];
  className?: string;
  iconClassName?: string;
  variant?: "subtle" | "boxed";
}) {
  if (!links.length) return null;
  return (
    <ul className={cn("flex items-center", className)}>
      {links.map((link) => {
        const Icon = icons[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels[link.platform]}
              className={cn(
                "inline-flex items-center justify-center transition",
                variant === "subtle" && "text-white/70 hover:text-teal-400",
                variant === "boxed" &&
                  "size-10 rounded-full bg-white/10 text-white ring-1 ring-white/10 hover:bg-teal-500 hover:text-white",
              )}
            >
              <Icon className={iconClassName} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
