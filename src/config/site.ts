export const siteConfig = {
  siteName: "Quiet Web Lab",
  siteUrl: "https://example.com",
  description:
    "A static web hub for browser mini games, AI image prompt tools, practical guides, and lightweight creative utilities.",
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
