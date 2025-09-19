import Link from "next/link";
import { Badge } from "./Badge";

type HeaderProps={
    title:string,
    subtitle:string,
    company:string
}

export const Header = ({ title, subtitle, company }:HeaderProps) => (
    <div className="relative z-10 p-10 sm:p-20 md:p-24 lg:p-[7.5rem] xl:p-[9.375rem] 2xl:p-[11.25rem]">
      <Link href={"/dashboard"}><Badge badgeText="ASSIGNMENT" /></Link>
      <h1 className="font-sora text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-[3.5rem] sm:leading-[4.75rem] md:leading-[5.75rem] lg:leading-[7.625rem] xl:leading-[9.0625rem] 2xl:leading-[10.75rem] mb-[9.375rem]">
        {title}
      </h1>
      <div className="font-spaceMono font-normal text-gray-400 sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-[1.0625rem]">{subtitle}</div>
      <div className="font-spaceMono font-normal text-white sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">{company}</div>
      
    </div>
  );
