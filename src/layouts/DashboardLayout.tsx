"use client";
import { Navbar, NotificationPanel, OderList } from "@/components";
import { DashboardSection } from "@/components/sections";
import { Header4xlSemibold, TextLgRegular } from "@/components/typography";
import { useGlobalStore } from "@/states/GlobalState";
import { usePathname } from "next/navigation";
import { SideBarLayout } from "./SideBarLayout";
import { orderHistory } from "@/utils/helper";

export function DashboardLayout() {
  const { isNotificationPanelActive, activeIndexServicesCard } = useGlobalStore();
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    const breadcrumbs = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      console.log("pathsegment", segment);
      return { href, label: decodeURIComponent(segment) };
    });
    
    if (pathSegments.length > 1) {
      breadcrumbs.splice(1, 0, {
        href: `/${pathSegments[0]}`,
        label: activeIndexServicesCard,
      });
    } else if (pathSegments.length === 1 && activeIndexServicesCard !== "Default") {
      breadcrumbs[0].label = activeIndexServicesCard;
    }
    console.log("breadcrumbs", breadcrumbs);
    return breadcrumbs;
  };
  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className=" grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[212px_1fr] overflow-hidden">
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
