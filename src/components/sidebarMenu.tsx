"use client";
import { useGlobalStore } from "@/states/GlobalState";
import { useState, useRef } from "react";
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

  const { activeIndexServicesCard, setActiveIndexServicesCard, setActiveChildIndexServicesCard } = useGlobalStore();

  const handleActiveIndex = (index: string) => {
    allowStateChange.current = true; // Allow this state change
    
    // Clear child selection when switching to a different parent menu item
    // This ensures previous child selections don't remain highlighted
    setActiveChildIndexServicesCard("Default");
    
    if (index != activeIndexServicesCard) {
      setclicked(true);
      setAccordionValue(index); // Open the accordion
    } else {
      setclicked(!clicked);
      setAccordionValue(clicked ? "" : index); // Toggle accordion
    }
    console.log(index)
    setActiveIndexServicesCard(index);
    console.log("activeIndexServicesCard",activeIndexServicesCard);
  };

  const handleAccordionValueChange = (value: string) => {
    // Only allow state changes that are explicitly permitted
    if (allowStateChange.current) {
      setAccordionValue(value);
      allowStateChange.current = false; // Reset flag
    }
    // Ignore all other state changes (like those from child clicks)
  };

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
          value={accordionValue}
          onValueChange={handleAccordionValueChange}
        >
          {(content as MenuItem[]).map((item: MenuItem, index: number) => {
            return (
              // <div key={index} className="flex">
              // <ServiceCard image={item.image} title={item.title} />
              <SidebarMenuItem
                contents={item.contents}
                title={item.title}
                index={index}
                isActive={item.title === activeIndexServicesCard}
                onClick={() => handleActiveIndex(item.title)}
                clicked={accordionValue === item.title}
                key={index + 1}
                url={header}
                icon={item.icon}
              />
              // </div>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
