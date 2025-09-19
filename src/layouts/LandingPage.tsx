import React from "react";
import Image from "next/image";
import overlay from "@/assets/images/Rectangle.png";
import grid from "@/assets/images/grid.svg";
import { CircularAsset, Header } from "@/components";
export const LandingPage = () => {
  return (
    <>
      {/* Background Grid */}
      <div className="absolute inset-0 w-[44.625rem] h-[44.625rem]">
        <Image
          src={grid}
          alt="background grid pattern"
          className="w-full h-full"
        />
      </div>

      {/* Header Section */}
      <Header
        title="UI DEVELOPER ASSIGNMENT"
        subtitle="COMPANY"
        company="Juspay Technologies Private Limited"
      />

      {/* Circular Gradient Backgrounds */}
      <CircularAsset classname=" top-[-10rem] tablet:top-[-13.5375rem] laptop:top-[-19.5375rem] desktop:top-[-28.5375rem] tv:top[-36rem] left-[14.375rem] tablet:left-[18.375rem] laptop:left-[22.375rem] desktop:left-[28.375rem] rotate-[-22.69deg] w-[48.5631rem] tv:w-[80rem] h-[31.7369rem] tv:h-[54rem] bg-[#12E6C8] opacity-80 blur-[128px] rounded-full" />
      <CircularAsset classname=" -bottom-24 -right-20 tablet:bottom-[-15.5375rem] laptop:bottom-[-20.5375rem]  desktop:bottom-[-28.5375rem] tablet:left-[26.0625rem] laptop:left-[41.0625rem] desktop:left-[61.0625rem] tv:right-10 rotate-[-33.8deg]  w-[19.545rem] md:w-[24.0544rem] lg:w-[32.0087rem] xl:w-[40rem]   2xl:w-[44.1331rem] tv:w-[80rem] h-[282.00px] md:h-[339.17px] lg:[h-425.67px] xl:h-[32rem] 2xl:h-[39.8081rem] tv:h-[54rem] bg-[#A287F4] opacity-80 blur-[128px] rounded-full" />

      {/* Full-screen Overlay Image */}
      <div className="absolute h-full w-full">
        <Image src={overlay} alt="overlay effect" className="h-full w-full" />
      </div>
    </>
  );
};
