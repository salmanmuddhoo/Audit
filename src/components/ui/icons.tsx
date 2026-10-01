import {
  Activity,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Download,
  FileText,
  Gauge,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  Mail,
  MapPin,
  PlayCircle,
  Scale,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons are referenced by name from content files so editors can pick an
 * icon without touching code. Add new entries here as needed.
 */
export const iconMap = {
  activity: Activity,
  "bar-chart": BarChart3,
  "book-open": BookOpen,
  briefcase: Briefcase,
  "check-circle": CheckCircle2,
  "clipboard-check": ClipboardCheck,
  compass: Compass,
  download: Download,
  "file-text": FileText,
  gauge: Gauge,
  landmark: Landmark,
  dashboard: LayoutDashboard,
  lightbulb: Lightbulb,
  "list-checks": ListChecks,
  mail: Mail,
  "map-pin": MapPin,
  "play-circle": PlayCircle,
  scale: Scale,
  search: Search,
  shield: Shield,
  "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck,
  target: Target,
  "trending-up": TrendingUp,
  users: Users,
  workflow: Workflow,
  wrench: Wrench,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function Icon({ name, className }: { name: IconName | string; className?: string }) {
  const Cmp = (iconMap as Record<string, LucideIcon>)[name] ?? Compass;
  return <Cmp className={className} aria-hidden />;
}
