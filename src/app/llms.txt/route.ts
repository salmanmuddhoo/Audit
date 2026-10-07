import { buildLlmsText } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET() {
  return new Response(await buildLlmsText(false), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
