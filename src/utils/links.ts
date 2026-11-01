/**
 * URL validation and link visibility helper.
 *
 * Used throughout the portfolio to determine whether a project link
 * (demo or GitHub) should be rendered as a clickable button.
 *
 * Rules:
 * - "#", empty strings, and whitespace-only strings are treated as unavailable.
 * - Only http:// and https:// protocols are allowed.
 * - JavaScript URLs and other unsafe protocols are rejected.
 * - GitHub URLs should be on github.com (or a subdomain).
 */

/**
 * Returns true if the URL is a valid, usable link (not "#", not empty,
 * not whitespace, and uses http or https protocol).
 */
export function isValidUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === '#') return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Returns true if the URL is a valid GitHub repository URL.
 * Checks for github.com hostname (or subdomain).
 */
export function isValidGithubUrl(url: string | undefined | null): boolean {
  if (!isValidUrl(url)) return false;
  try {
    const parsed = new URL(url!.trim());
    const host = parsed.hostname;
    return host === 'github.com' || host.endsWith('.github.com');
  } catch {
    return false;
  }
}

/**
 * Returns true if a mailto link is valid (non-empty, starts with mailto:).
 */
export function isValidMailto(url: string | undefined | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === '#') return false;
  return trimmed.startsWith('mailto:') && trimmed.length > 7;
}

/**
 * Returns the safe href for a link, or null if the link should not be rendered.
 * Use this to get the href for an anchor tag, or null to skip rendering.
 */
export function getSafeHref(url: string | undefined | null): string | null {
  if (!isValidUrl(url)) return null;
  return url!.trim();
}
