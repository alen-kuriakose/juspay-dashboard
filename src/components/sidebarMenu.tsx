"use client";
import { useGlobalStore } from "@/states/GlobalState";
import { useState, useRef, useEffect } from "react";
import { SidebarMenuItem } from "./sideBarMenuItem";
import { TextSmallRegular } from "./typography";
import { Accordion } from "./ui/accordion";

interface ContentItem {
    title: string;
  }
  
  interface MenuItem {
    title: string;
    icon: string;
    contents?: Array<ContentItem>;
    url: string;
    description?: string;
  }


type SidebarMenuProps = {
  content: Array<object>;
  header: string;
};

export const SidebarMenu = ({ content, header }: SidebarMenuProps) => {
  const [clicked, setclicked] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string>("");
  const allowStateChange = useRef(true);

  const { 
    activeIndexServicesCard, 
    setActiveIndexServicesCard,
    setActiveSection,
    activeSection
  } = useGlobalStore();

  // Don't auto-set section here - let navigation handle it

  // Update accordion when active item changes
  useEffect(() => {
    // Only update accordion if the current section is active
    if (activeSection === header) {
      const activeItem = (content as MenuItem[]).find(
        item => item.title === activeIndexServicesCard
      );
      
      if (activeItem && activeItem.contents && activeItem.contents.length > 0) {
        setAccordionValue(activeIndexServicesCard);
      } else {
        setAccordionValue("");
      }
    } else {
      // Clear accordion if this section is not active
      setAccordionValue("");
    }
  }, [activeIndexServicesCard, activeSection, header, content]);

  const handleActiveIndex = (index: string) => {
    allowStateChange.current = true; // Allow this state change
    
    // The navigation hook will handle section setting
    
    if (index != activeIndexServicesCard || activeSection !== header) {
      setclicked(true);
      setAccordionValue(index); // Open the accordion
    } else {
      setclicked(!clicked);
      setAccordionValue(clicked ? "" : index); // Toggle accordion
    }
    
    console.log(`Setting active item: ${index} for section: ${header}`);
    setActiveIndexServicesCard(index);
    console.log("activeIndexServicesCard", activeIndexServicesCard);
  };

  const handleAccordionValueChange = (value: string) => {
    // Only allow state changes that are explicitly permitted
    if (allowStateChange.current && activeSection === header) {
      setAccordionValue(value);
      allowStateChange.current = false; // Reset flag
    }
    // Ignore all other state changes (like those from child clicks)
  };

  // Only show active highlights if this is the current section
  const isCurrentSection = activeSection === header;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="px-3 py-1">
        <TextSmallRegular className="inline-block font-inter text-primary/40 dark:text-white">
          {header}
        </TextSmallRegular>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Accordion 
          type="single" 
          collapsible 
          value={isCurrentSection ? accordionValue : ""}
          onValueChange={handleAccordionValueChange}
        >
          {(content as MenuItem[]).map((item: MenuItem, index: number) => {
            return (
              <SidebarMenuItem
                contents={item.contents}
                title={item.title}
                index={index}
                isActive={isCurrentSection && item.title === activeIndexServicesCard}
                onClick={() => handleActiveIndex(item.title)}
                clicked={isCurrentSection && accordionValue === item.title}
                key={index + 1}
                url={header}
                icon={item.icon}
              />
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
