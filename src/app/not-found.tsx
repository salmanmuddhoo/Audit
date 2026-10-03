import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { HeroEmblem } from "@/components/ui/hero-emblem";
import { Header } from "@/components/layout/header";
import { primaryNav } from "@/config/routes";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex flex-1 items-center overflow-hidden bg-navy-50">
        <HeroEmblem
          labelClassName="hidden xl:flex"
          className="pointer-events-none absolute -right-32 -bottom-32 size-[30rem] opacity-40 xl:right-8 xl:bottom-8 xl:size-[24rem] xl:opacity-100"
        />
        <Container className="relative py-24 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-teal-600 uppercase">404</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">We couldn’t find that page.</h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-slate-600">The page may have moved or no longer exists. Try one of these instead.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" arrow>
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact us
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-navy-900">
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-teal-600">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
    </>
  );
}
