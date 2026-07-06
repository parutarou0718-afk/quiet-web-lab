export const siteConfig = {
  siteName: "Smart Prompt App",
  siteUrl: "https://smartpromptapp.com",
  description:
    "Practical AI workflows, reusable prompt systems, automation templates, and static web products for turning AI into production processes.",
  analyticsId: "",
  analyticsEnabled: false,
  adsenseClientId: "ca-pub-2485721016178543",
  adsenseSlotId: ""
} as const;

export type SiteConfig = typeof siteConfig;

export function canonicalUrl(pathname: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

