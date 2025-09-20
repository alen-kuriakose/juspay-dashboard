"use client";
import arrowRight from "@/assets/icons/ArrowLineRight.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useNavigation } from "@/hooks/useNavigation";
import { useGlobalStore } from "@/states/GlobalState";

import { TextSmallRegular } from "./typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

interface ContentItem {
  title: string;
}

interface SidebarMenuItemProps {
  title: string;
  icon: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
  contents?: Array<ContentItem>;
  clicked?: boolean;
  url: string;
  isCollapsed?: boolean;
}

export const SidebarMenuItem = ({
  title,
  icon,
  isActive,
  clicked,
  contents,
  url,
  onClick,
  isCollapsed = false,
}: SidebarMenuItemProps) => {
  const [containsTree, setContainsTree] = useState(false);
  const { activeSection, setSidebarCollapsed } = useGlobalStore();
  
  // Use the navigation hook
  const {
    isCurrentPath,
    handleChildClick,
    handleParentClick,
    isChildActive,
    getParentRoute,
  } = useNavigation({
    title,
    url,
    contents,
    onClick,
  });

  useEffect(() => {
    if (contents && contents.length > 0) {
      setContainsTree(true);
    }
  }, [contents]);

  // Only show active states if this is the current section
  const isCurrentSection = activeSection === url;
  const shouldShowActive = isCurrentSection && (isActive || isCurrentPath);
  const shouldShowClicked = isCurrentSection && clicked && isActive;

  // Collapsed sidebar - show only icon with tooltip
  if (isCollapsed) {
    const handleCollapsedClick = (e: React.MouseEvent) => {
      e.preventDefault();
      
      // If the item has accordion content, expand the sidebar first
      if (containsTree) {
        setSidebarCollapsed(false);
        // Small delay to ensure sidebar expands before triggering the original click
        setTimeout(() => {
          handleParentClick();
        }, 150);
      } else {
        // If no accordion, just navigate normally
        handleParentClick();
      }
    };

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "flex justify-center items-center py-2 px-2 relative group/feature cursor-pointer w-full rounded-lg transition-all duration-200",
                shouldShowActive 
                  ? "bg-primary/10 dark:bg-white/10" 
                  : "hover:bg-primary/5 dark:hover:bg-white/5"
              )}
              onClick={handleCollapsedClick}
            >
              <div
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-400",
                  shouldShowActive
                    ? "bg-primary h-6 opacity-100"
                    : "opacity-0 h-0"
                )}
              />
              <div className="flex align-middle w-5 h-5">
                <Image
                  src={icon}
                  alt={title}
                  className="m-auto dark:invert"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <p>{title}{containsTree ? " (Click to expand)" : ""}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Full sidebar - show complete menu items

  return (
    <div>
      <AccordionItem value={title}>
        {containsTree ? (
          <AccordionTrigger className="p-0 pb-2 hover:no-underline">
            <div
              className={cn(
                "flex flex-col py-1 relative group/feature col-span-3 cursor-pointer w-full"
              )}
              role="button"
              onClick={handleParentClick}
            >
              <div
                className={cn(
                  "opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-primary/5 dark:bg-white/10 pointer-events-none rounded-[8px]",
                  shouldShowActive && "opacity-100"
                )}
              />
              <div className="text-lg font-bold relative z-10 px-2 flex gap-1 align-middle">
                <div
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/feature:opacity-100 group-hover/feature:h-4 w-1 rounded-full rounded-br-full group-hover/feature:bg-primary transition-all duration-400 origin-center",
                    shouldShowActive
                      ? "bg-primary h-4 opacity-100 transition-all duration-400"
                      : "opacity-0 h-4 transition-all duration-400"
                  )}
                />
                <div className="flex align-middle w-4 h-4 my-auto">
                  <Image
                    src={arrowRight}
                    alt={"arrow_right"}
                    className={cn(
                      "m-auto dark:invert",
                      shouldShowClicked
                        ? "rotate-90 transition-all duration-300"
                        : "rotate-0 transition-all duration-300",
                      containsTree ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
                <div className="flex align-middle w-4 h-4 my-auto">
                  <Image
                    src={icon}
                    alt={title}
                    className={cn("m-auto dark:invert")}
                  />
                </div>
                <TextSmallRegular className="inline-block font-inter text-primary dark:text-white">
                  {title}
                </TextSmallRegular>
              </div>
            </div>
          </AccordionTrigger>
        ) : (
          <Link href={getParentRoute()}>
            <div className="p-0 pb-2">
              <div
                className={cn(
                  "flex flex-col py-1 relative group/feature col-span-3 cursor-pointer w-full"
                )}
                role="button"
                onClick={handleParentClick}
              >
                <div
                  className={cn(
                    "opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-primary/5 dark:bg-white/10 pointer-events-none rounded-[8px]",
                    shouldShowActive && "opacity-100"
                  )}
                />
                <div className="text-lg font-bold relative z-10 px-2 flex gap-1 align-middle">
                  <div
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/feature:opacity-100 group-hover/feature:h-4 w-1 rounded-full rounded-br-full group-hover/feature:bg-primary transition-all duration-400 origin-center",
                      shouldShowActive
                        ? "bg-primary h-4 opacity-100 transition-all duration-400"
                        : "opacity-0 h-4 transition-all duration-400"
                    )}
                  />
                  <div className="flex align-middle w-4 h-4 my-auto">
                    <Image
                      src={arrowRight}
                      alt={"arrow_right"}
                      className={cn(
                        "m-auto dark:invert",
                        shouldShowClicked
                          ? "rotate-90 transition-all duration-300"
                          : "rotate-0 transition-all duration-300",
                        containsTree ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                  <div className="flex align-middle w-4 h-4 my-auto">
                    <Image
                      src={icon}
                      alt={title}
                      className={cn("m-auto dark:invert")}
                    />
                  </div>
                  <TextSmallRegular className="inline-block font-inter text-primary dark:text-white">
                    {title}
                  </TextSmallRegular>
                </div>
              </div>
            </div>
          </Link>
        )}
        <AccordionContent 
          className="overflow-hidden" 
        >
          <div 
            className="flex flex-col gap-1 transition-all duration-300"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {contents?.map((item, index) => {
              const childActive = isCurrentSection && isChildActive(item.title);
              
              return (
                <div
                  key={index}
                  className={cn(
                    "font-bold relative z-10 ps-[3rem] flex gap-1 transition-all duration-300 py-1 hover:bg-primary/5 dark:hover:bg-white/5 rounded cursor-pointer",
                    childActive && "bg-primary/10 dark:bg-white/10"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    handleChildClick(item.title, e);
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <TextSmallRegular 
                    className={cn(
                      "inline-block font-inter transition-all duration-300",
                      childActive 
                        ? "text-primary dark:text-white font-medium" 
                        : "text-primary/70 dark:text-white/70"
                    )}
                  >
                    {item.title}
                  </TextSmallRegular>
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};
