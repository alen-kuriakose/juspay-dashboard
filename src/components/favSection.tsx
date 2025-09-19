import React, { useState } from "react";
import { TextSmallRegular } from "./typography";
import { cn } from "@/lib/utils";
type FavSectionProps = {
  favList: Array<string>;
  recentList: Array<string>;
};
export function FavSection({ favList, recentList }: FavSectionProps) {
  const [activeList, setActiveList] = useState("favorites");
  const handleSwitch = (value: string) => {
    setActiveList(value);
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <span
          className={cn(
            "px-2 py-1 text-dark/40 dark:text-white/40",
            activeList == "favorites"
              ? "text-dark/40 dark:text-white/40 transition-all duration-200"
              : "text-dark/20 dark:text-white/20 transition-all duration-200"
          )}
          onClick={() => handleSwitch("favorites")}
        >
          <TextSmallRegular className="cursor-pointer">Favorites</TextSmallRegular>
        </span>
        <span
          className={cn(
            "px-2 py-1 text-dark/40 dark:text-white/40",
            activeList == "recents"
              ? "text-dark/40 dark:text-white/40 transition-all duration-200"
              : "text-dark/20 dark:text-white/20 transition-all duration-200"
          )}
          onClick={() => handleSwitch("recents")}
        >
          <TextSmallRegular className="cursor-pointer">Recently</TextSmallRegular>
        </span>
      </div>
      <div className="flex flex-col  w-full">
        <ul className="list-disc list-inside ">
          {activeList == "favorites" &&
            favList.map((item: string, index: number) => {
              return (
                <li key={index} className={cn("px-2 py-1 w-full text-dark dark:text-white marker:text-dark/20 marker:dark:text-white/20 marker:size-6 font-inter font-normal text-sm ms-1",activeList == "favorites"?"opacity-100 transition-all duration-200":"opacity-0 transition-all duration-200")}>{item}
                  {/* <TextSmallRegular className="text-dark dark:text-white">{item}</TextSmallRegular> */}
                </li>
              );
            })}
            {activeList == "recents" &&
            recentList.map((item: string, index: number) => {
              return (
                <li key={index} className={cn("px-2 py-1 w-full text-dark dark:text-white marker:text-dark/20 marker:dark:text-white/20 marker:size-6 font-inter font-normal text-sm ms-1",activeList == "recents"?"opacity-100 transition-all duration-200":"opacity-0 transition-all duration-200")}>{item}
                  {/* <TextSmallRegular className="text-dark dark:text-white">{item}</TextSmallRegular> */}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
