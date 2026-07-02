import { canonicalUrl } from "@/config/site";

export function GET(): Response {
  return new Response(`User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${canonicalUrl("/sitemap.xml")}
`, {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
