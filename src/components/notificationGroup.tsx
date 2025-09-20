import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import {
  TextSmallRegular,
  TextSmallSemibold,
  TextXSmallRegular,
} from "./typography";
interface ContentItem {
  title: string;
  timeStamp?: string;
  icon: StaticImageData;
}
type NotificationGroupProps = {
  content: Array<ContentItem>;
  lineReq: boolean;
  timeStampReq: boolean;
  title: string;
  classNameForLine?: string;
  className?: string;
  iconStylingReq: boolean;
};
export function NotificationGroup({
  title,
  content,
  lineReq,
  classNameForLine,
  timeStampReq,
  className,
  iconStylingReq,
}: NotificationGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="px-1 py-2">
        <TextSmallSemibold className="text-dark dark:text-white">
          {title}
        </TextSmallSemibold>
      </div>
      <div className="flex flex-col relative h-full z-30">
        {content.map((item, index) => {
          type TruncatedTextProps = {
            text: string;
            maxLength: number;
          };
          const TruncatedText = ({ text, maxLength }: TruncatedTextProps) => {
            if (text.length <= maxLength) {
              return (
                <TextSmallRegular className="leading-[1.125rem]  overflow-hidden text-ellipsis text-dark dark:text-white">
                  {text}
                </TextSmallRegular>
              );
            }

            const truncatedText = text.slice(0, maxLength - 3) + "...";

            return (
              <TextSmallRegular className="leading-[1.125rem] overflow-hidden text-ellipsis whitespace-nowrap text-dark dark:text-white">
                {truncatedText}
              </TextSmallRegular>
            );
          };
          return (
            <div key={index} className={cn("p-1 flex gap-2", className)}>
              {iconStylingReq ? (
                <div
                  className={cn(
                    "p-1  rounded-[.5rem] flex-shrink-0 h-fit relative ",
                    index % 2 == 0
                      ? "bg-accent  dark:bg-[#E3F5FF]"
                      : "bg-accent-foreground  dark:bg-[#E5ECF6] "
                  )}
                >
                                    <Image
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className={cn(
                      " ",
                      index % 2 == 0 ? "" : "bg-accent-foreground "
                    )}
                  />
                </div>
              ) : (
                <div className={cn("flex-shrink-0 h-fit relative border-4 border-solid rounded-full border-white md:dark:border-black dark:border-dark" )}>
                  <Image src={item.icon} alt={`${item.title} avatar`} className={cn("")} />
                </div>
              )}
              <div className="">
                <TruncatedText text={item.title} maxLength={29} />
                {timeStampReq && (
                  <TextXSmallRegular className="leading-[1.125rem] text-nowrap text-dark/40 dark:text-white">
                    {item.timeStamp}
                  </TextXSmallRegular>
                )}
              </div>
            </div>
          );
        })}
        {lineReq && (
          <div
            className={cn(
              "absolute w-[0.0625rem] top-2  h-[85%] bg-dark/10 dark:bg-white/10 -z-10",
              classNameForLine
            )}
          ></div>
        )}
      </div>
    </div>
  );
}
