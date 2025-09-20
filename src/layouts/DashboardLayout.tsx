"use client";
import { Navbar, NotificationPanel, OderList } from "@/components";
import { DashboardSection } from "@/components/sections";
import { Header4xlSemibold, TextLgRegular } from "@/components/typography";
import { useGlobalStore } from "@/states/GlobalState";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SideBarLayout } from "./SideBarLayout";
import { orderHistory } from "@/utils/helper";

export function DashboardLayout() {
  const { 
    isNotificationPanelActive, 
    activeIndexServicesCard, 
    activeChildIndexServicesCard,
    setActiveSection,
    activeSection
  } = useGlobalStore();
  const pathname = usePathname();

  // Initialize the correct section based on the current URL
  useEffect(() => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    if (pathSegments.length > 0) {
      const currentSection = pathSegments[0];
      const capitalizedSection = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);
      
      // Only set if different to prevent infinite loops
      if (activeSection !== capitalizedSection) {
        console.log(`Initializing section based on URL: ${capitalizedSection}`);
        setActiveSection(capitalizedSection);
      }
    }
  }, [pathname]); // Only depend on pathname, not activeSection or setActiveSection

  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    
    if (pathSegments.length === 0) {
      return [];
    }
    
    const breadcrumbs = [];
    
    // First segment (dashboard or pages)
    const firstSegment = pathSegments[0];
    breadcrumbs.push({
      href: `/${firstSegment}`,
      label: firstSegment
    });
    
    // If we're on base dashboard (/dashboard), add the active menu item
    if (pathSegments.length === 1 && firstSegment === 'dashboard') {
      breadcrumbs.push({
        href: pathname,
        label: activeIndexServicesCard.toLowerCase()
      });
    }
    
    // If we have a slug (/dashboard/something), handle it properly
    if (pathSegments.length > 1) {
      const slug = decodeURIComponent(pathSegments[1]);
      
      // Check if we have an active child (indicating this is a child route)
      if (activeChildIndexServicesCard && activeChildIndexServicesCard !== "Default") {
        // This is a child route: dashboard -> parent -> child
        breadcrumbs.push({
          href: `/${firstSegment}`,
          label: activeIndexServicesCard.toLowerCase()
        });
        breadcrumbs.push({
          href: pathname,
          label: activeChildIndexServicesCard.toLowerCase()
        });
      } else {
        // This is a direct menu item route: dashboard -> item
        breadcrumbs.push({
          href: pathname,
          label: slug
        });
      }
    }
    
    console.log("breadcrumbs", breadcrumbs);
    return breadcrumbs;
  };
  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className=" sm:grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[212px_1fr] overflow-hidden">
      <SideBarLayout breadcrumbsArray={breadcrumbs} />
      <div className="w-full flex">
        <div className="flex w-full">
          <div className="w-full">
            <Navbar
              className="hidden md:flex flex-grow h-fit"
              breadcrumbs={breadcrumbs}
            />
            {(() => {
              switch (activeIndexServicesCard) {
                case "Default":
                  return <DashboardSection />;
                case "eCommerce​":
                  return (
                    <div className=" w-full">
                      <OderList data={orderHistory} itemsPerPage={10}/>
                    </div>
                  );
                default:
                  return (
                    <div className="w-full h-full flex items-center justify-center text-dark dark:text-white">
                      <div className="text-center">
                        <Header4xlSemibold className="animate-pulse">
                          Coming Soon
                        </Header4xlSemibold>
                        <div className="flex justify-center items-center mb-8">
                          <TextLgRegular>
                            We are working on something exiting
                          </TextLgRegular>
                        </div>
                      </div>
                    </div>
                  );
              }
            })()}
          </div>
          {isNotificationPanelActive && <NotificationPanel />}
        </div>
      </div>
    </div>
  );
}
