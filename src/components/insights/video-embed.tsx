import { PlayCircle } from "lucide-react";

function toEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").pop();
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function VideoEmbed({ url, title }: { url?: string; title: string }) {
  const src = url ? toEmbed(url) : null;
  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-3xl bg-gradient-to-br from-navy-900 to-teal-600 text-white">
        <div className="text-center">
          <PlayCircle className="mx-auto size-14 text-white/90" aria-hidden />
          <p className="mt-3 font-display text-lg font-semibold">Video coming soon</p>
          <p className="text-sm text-white/70">Read the summary below in the meantime.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="aspect-video overflow-hidden rounded-3xl bg-navy-950 shadow-card">
      <iframe
        src={src}
        title={title}
        className="size-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
