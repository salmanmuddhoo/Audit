import { cn } from "@/lib/utils";

/**
 * A small animated figure that walks along a horizontal track. Place inside
 * a relatively positioned parent; the track mirrors the pathway's offsets.
 */
export function Walker({ className }: { className?: string }) {
  return (
    <div className={cn("walker-track pointer-events-none", className)} aria-hidden>
      <div className="walker">
        <svg viewBox="0 0 24 34" className="walker-figure" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* back arm */}
          <g className="walker-arm-b" style={{ transformOrigin: "12px 11px" }}>
            <path d="M12 11 L8.5 17.5" stroke="#0a4a84" strokeWidth="2.1" />
          </g>
          {/* back leg */}
          <g className="walker-leg-b" style={{ transformOrigin: "12px 19px" }}>
            <path d="M12 19 L8 30" stroke="#0a4a84" strokeWidth="2.3" />
          </g>
          {/* torso + head */}
          <g className="walker-body">
            <path d="M12 9.5 L12 19" stroke="#073665" strokeWidth="2.6" />
            <circle cx="12" cy="4.6" r="3.4" fill="#00afc3" />
          </g>
          {/* front leg */}
          <g className="walker-leg-f" style={{ transformOrigin: "12px 19px" }}>
            <path d="M12 19 L16 30" stroke="#073665" strokeWidth="2.3" />
          </g>
          {/* front arm */}
          <g className="walker-arm-f" style={{ transformOrigin: "12px 11px" }}>
            <path d="M12 11 L15.5 17.5" stroke="#073665" strokeWidth="2.1" />
          </g>
        </svg>
      </div>
    </div>
  );
}
