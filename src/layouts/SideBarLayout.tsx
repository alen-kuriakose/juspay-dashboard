"use client";
import avatar from "@/assets/images/ByeWind.png";
import { AvatarComponent, Navbar, SidebarMenu } from "@/components";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import {
  dashboardSidemenuContent,
  favourites,
  pageSidemenuContent,
  recents,
} from "@/utils/helper";
import { FavSection } from "@/components/favSection";
type SideBarLayoutProps = {
  breadcrumbsArray: Array<{href:string,label:string}>;
};
export function SideBarLayout({ breadcrumbsArray }: SideBarLayoutProps) {
  return (
    <div>
      <div className="hidden border-r md:block pt-5 h-full ">
        <div className="flex h-full max-h-screen flex-col gap-4 px-4 lg:px-4">
          <AvatarComponent avatarImg={avatar} name={"ByeWind"} />
          <div className="flex-1">
            <nav className="grid items-start text-sm font-medium gap-4">
              <FavSection favList={favourites} recentList={recents} />
              <SidebarMenu
                header="Dashboard"
                content={dashboardSidemenuContent}
              />
              <SidebarMenu header="Pages" content={pageSidemenuContent} />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden bg-white ">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 bg-white dark:bg-black justify-start w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5 text-primary  " />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col bg-white dark:bg-black"
            >
              <nav className="grid gap-2 text-lg font-medium ">
                <div className="flex justify-start p-1">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <Image
                      src={avatar}
                      alt={"profile_avatar"}
                      width={24}
                      height={24}
                    />
                    <span className="text-sm text-dark dark:text-white font-normal">
                      ByeWind
                    </span>
                  </Link>
                </div>
                <FavSection favList={favourites} recentList={recents} />
                <SidebarMenu
                  header="Dashboard"
                  content={dashboardSidemenuContent}
                />
                <SidebarMenu header="Pages" content={pageSidemenuContent} />
              </nav>
            </SheetContent>
          </Sheet>
          <Navbar breadcrumbs={breadcrumbsArray}/>
        </header>
      </div>
    </div>
  );
}
