import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { MDXComponents } from "mdx/types";
import { ButtonLink } from "@/components/ui/button";

/** Components available inside insight MDX bodies. */
const components: MDXComponents = {
  a: ({ href = "", children, ...rest }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} {...rest} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
  Callout: ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <aside className="my-8 rounded-2xl border border-teal-100 bg-teal-50 p-6 not-italic">
      {title ? <p className="mb-2 font-display font-bold text-navy-900">{title}</p> : null}
      <div className="text-navy-900/90 [&>p:last-child]:mb-0">{children}</div>
    </aside>
  ),
  Cta: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <p className="my-8">
      <ButtonLink href={href} arrow>
        {children}
      </ButtonLink>
    </p>
  ),
};

export function InsightBody({ source }: { source: string }) {
  return (
    <div className="prose-insight">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
