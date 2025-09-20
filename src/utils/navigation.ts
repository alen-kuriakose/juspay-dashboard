/**
 * Navigation utilities for sidebar components
 */

export interface NavigationItem {
  title: string;
  icon: string;
  url: string;
  contents?: Array<{ title: string }>;
}

/**
 * Generate route path for navigation items
 */
export const generateRoutePath = (baseUrl: string, title: string, childTitle?: string): string => {
  const basePath = `/${baseUrl.toLowerCase()}/${title.toLowerCase()}`;
  return childTitle ? `${basePath}/${childTitle.toLowerCase()}` : basePath;
};

/**
 * Check if a route matches the current pathname
 */
export const isRouteActive = (pathname: string, routePath: string, exact = false): boolean => {
  if (exact) {
    return pathname === routePath;
  }
  return pathname.startsWith(routePath);
};

/**
 * Normalize string for URL usage
 */
export const normalizeForUrl = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

/**
 * Extract breadcrumbs from current path
 */
export const extractBreadcrumbs = (pathname: string): Array<{ href: string; label: string }> => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];
  
  for (let i = 0; i < segments.length; i++) {
    const href = '/' + segments.slice(0, i + 1).join('/');
    const label = segments[i].charAt(0).toUpperCase() + segments[i].slice(1);
    breadcrumbs.push({ href, label });
  }
  
  return breadcrumbs;
};
