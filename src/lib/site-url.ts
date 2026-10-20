const fallbackSiteUrl = 'https://csnpt.tn';
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL = (() => {
  if (!configuredSiteUrl) return fallbackSiteUrl;
  try {
    const url = new URL(configuredSiteUrl);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.origin;
  } catch {
    // Use the production canonical URL when an optional override is malformed.
  }
  return fallbackSiteUrl;
})();
