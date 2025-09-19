import downtrend from "@/assets/icons/ArrowFall.svg";
import uptrend from "@/assets/icons/ArrowRise.svg";
import {
  Subheading2xlSemibold,
  TextSmallSemibold,
  TextXSmallRegular,
} from "../typography";

import { cn } from "@/lib/utils";
import Image from "next/image";

type WidgetChartProps = {
  widgetName: string;
  mainValue: string;
  growth: string;
  isRevRelated: boolean;
  className: string;
  fontClass: string;
  iconClr:string
};

/* This code snippet is defining a React functional component named `WidgetChart` that takes in several
props: `widgetName`, `mainValue`, `growth`, `isRevRelated`, `className`, `fontClass`, and `iconClr`. */
export function WidgetChart({
  widgetName,
  mainValue,
  growth,
  isRevRelated,
  className,
  fontClass,
  iconClr
}: WidgetChartProps) {
  return (
    <div className={cn("p-7 rounded-2xl flex flex-col gap-2", className)}>
      <div>
        <TextSmallSemibold className={cn("", fontClass)}>
          {widgetName}
        </TextSmallSemibold>
      </div>
      <div className="flex justify-between items-center">
        <Subheading2xlSemibold className={cn(" leading-9", fontClass)}>
          {isRevRelated && "$"}
          {mainValue}
        </Subheading2xlSemibold>
        <div className="flex gap-1">
          <TextXSmallRegular className={cn("", fontClass)}>
            {parseInt(growth) > 0 ? "+" : "-"}
            {growth + "%"}
          </TextXSmallRegular>
          <span>
            {parseInt(growth) > 0 ? (
              <Image src={uptrend} alt="Trend up" className={cn("",iconClr)} />
            ) : (
              <Image src={downtrend} alt="Trend down"  className={cn("",iconClr)}/>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
