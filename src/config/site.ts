export const siteConfig = {
  siteName: "Quiet Web Lab",
  siteUrl: "https://smartpromptapp.com",
  description:
    "A static AI image prompt library with reusable prompt fragments, model comparisons, practical guides, and local creative tools.",
  analyticsId: "",
  analyticsEnabled: false,
  adsenseClientId: "",
  adsenseSlotId: ""
} as const;

export type SiteConfig = typeof siteConfig;

export function canonicalUrl(pathname: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
