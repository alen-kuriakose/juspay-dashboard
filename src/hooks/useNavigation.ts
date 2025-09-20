import { useRouter, usePathname } from "next/navigation";
import { useGlobalStore } from "@/states/GlobalState";
import { useCallback, useMemo } from "react";

export interface ContentItem {
  title: string;
}

export interface UseNavigationProps {
  title: string;
  url: string;
  contents?: Array<ContentItem>;
  onClick?: () => void;
}

export interface UseNavigationReturn {
  // State
  childactive: string;
  isCurrentPath: boolean;
  
  // Handlers
  handleChildClick: (data: string, e: React.MouseEvent) => void;
  handleParentClick: () => void;
  
  // Utilities
  getChildRoute: (childTitle: string) => string;
  getParentRoute: () => string;
  isChildActive: (childTitle: string) => boolean;
}

export const useNavigation = ({
  title,
  url,
  contents,
  onClick,
}: UseNavigationProps): UseNavigationReturn => {
  const { 
    activeChildIndexServicesCard, 
    setActiveChildIndexServicesCard,
    setActiveSection,
    activeSection
  } = useGlobalStore();
  const router = useRouter();
  const pathname = usePathname();

  // Memoized route calculations
  const getParentRoute = useCallback(() => {
    // Special case for "Default" - route to base dashboard
    if (title.toLowerCase() === 'default') {
      return '/dashboard';
    }
    
    // Route based on the section type (Dashboard or Pages)
    if (url.toLowerCase() === 'dashboard') {
      return `/dashboard/${title.toLowerCase()}`;
    } else if (url.toLowerCase() === 'pages') {
      return `/pages/${title.toLowerCase()}`;
    }
    // Fallback for other sections
    return `/${url.toLowerCase()}/${title.toLowerCase()}`;
  }, [url, title]);

  const getChildRoute = useCallback((childTitle: string) => {
    // For children, we'll use the same slug structure but with child title
    // Special handling: if parent is "Default", treat children as direct dashboard routes
    if (title.toLowerCase() === 'default') {
      return `/dashboard/${childTitle.toLowerCase()}`;
    }
    
    if (url.toLowerCase() === 'dashboard') {
      return `/dashboard/${childTitle.toLowerCase()}`;
    } else if (url.toLowerCase() === 'pages') {
      return `/pages/${childTitle.toLowerCase()}`;
    }
    // Fallback for other sections
    return `/${url.toLowerCase()}/${childTitle.toLowerCase()}`;
  }, [url, title]);

  // Check if current path matches this menu item or its children
  const isCurrentPath = useMemo(() => {
    const parentRoute = getParentRoute();
    
    // Special case for "Default" - only match exact /dashboard path
    if (title.toLowerCase() === 'default') {
      return pathname === '/dashboard';
    }
    
    // Only consider this path active if we're in the correct section
    const isCorrectSection = activeSection === url;
    if (!isCorrectSection) {
      return false;
    }
    
    return pathname.startsWith(parentRoute);
  }, [pathname, getParentRoute, title, activeSection, url]);

  // Check if a specific child is active
  const isChildActive = useCallback((childTitle: string) => {
    const childRoute = getChildRoute(childTitle);
    const pathMatches = pathname === childRoute;
    const stateMatches = activeChildIndexServicesCard === childTitle;
    const isCorrectSection = activeSection === url;
    
    return isCorrectSection && (pathMatches || stateMatches);
  }, [pathname, activeChildIndexServicesCard, getChildRoute, activeSection, url]);

  // Handle child navigation
  const handleChildClick = useCallback((data: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set section if it's different to prevent infinite loops
    if (activeSection !== url) {
      setActiveSection(url);
    }
    
    // Update child active state
    setActiveChildIndexServicesCard(data);
    
    // Navigate to the child route
    const childRoute = getChildRoute(data);
    router.push(childRoute);
    
    console.log(`Navigating to child: ${data} in section: ${url}`);
    
    // Don't call the parent onClick when clicking children
    // This prevents interference with accordion state
  }, [setActiveChildIndexServicesCard, router, getChildRoute, setActiveSection, url, activeSection]);

  // Handle parent navigation
  const handleParentClick = useCallback(() => {
    // Only set section if it's different to prevent infinite loops
    if (activeSection !== url) {
      setActiveSection(url);
    }
    
    // Call the external onClick handler if provided
    onClick?.();
    
    // If no children, navigate directly to parent route
    if (!contents || contents.length === 0) {
      const parentRoute = getParentRoute();
      router.push(parentRoute);
      
      console.log(`Navigating to parent: ${title} in section: ${url}`);
    }
  }, [onClick, contents, router, getParentRoute, setActiveSection, url, title, activeSection]);

  return {
    // State
    childactive: activeChildIndexServicesCard,
    isCurrentPath,
    
    // Handlers
    handleChildClick,
    handleParentClick,
    
    // Utilities
    getChildRoute,
    getParentRoute,
    isChildActive,
  };
};
