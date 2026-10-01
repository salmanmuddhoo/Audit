import type { Route } from "next";

export type NavItem = {
  label: string;
  href: Route;
  description?: string;
};

/** The Stage 1 five-page structure defined in the FRD. */
export const primaryNav: NavItem[] = [
  { label: "Who We Are", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Tools", href: "/tools" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const routes = {
  home: "/" as Route,
  services: "/services" as Route,
  service: (slug: string) => `/services/${slug}` as Route,
  tools: "/tools" as Route,
  insights: "/insights" as Route,
  insight: (slug: string) => `/insights/${slug}` as Route,
  insightCategory: (slug: string) => `/insights/category/${slug}` as Route,
  insightTag: (slug: string) => `/insights/tag/${slug}` as Route,
  contact: "/contact" as Route,
  contactFor: (service: string) => `/contact?service=${encodeURIComponent(service)}` as Route,
  privacy: "/privacy" as Route,
};
