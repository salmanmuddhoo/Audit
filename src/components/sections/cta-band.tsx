import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { RingMark } from "@/components/ui/ring-mark";
import { routes } from "@/config/routes";

export function CtaBand({
  title = "Let’s talk about your business.",
  description = "Whether you are looking to strengthen operations, governance, risk management, internal controls or compliance, we would be pleased to understand your requirements.",
  primaryLabel = "Start a conversation",
  primaryHref = routes.contact,
  secondaryLabel,
  secondaryHref,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute -top-32 -left-24 size-[28rem] opacity-30" aria-hidden>
        <RingMark animate={false} />
      </div>
      <div className="pointer-events-none absolute -right-20 -bottom-40 size-[30rem] rounded-full bg-teal-500/20 blur-3xl" aria-hidden />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl text-lg text-white/75">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <ButtonLink href={primaryHref} variant="accent" size="lg" arrow>
            {primaryLabel}
          </ButtonLink>
          {secondaryLabel && secondaryHref ? (
            <ButtonLink href={secondaryHref} variant="white" size="lg">
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
