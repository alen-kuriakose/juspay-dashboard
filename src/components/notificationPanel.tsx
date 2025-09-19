import React from "react";
import { NotificationGroup } from "./notificationGroup";
import { notificationGroupContent1, notificationGroupContent2, notificationGroupContent3 } from "@/utils/helper";

export function NotificationPanel() {
  return (
    <div className="lg:min-w-[17.5rem] border-l h-full p-5 transition-all duration-300 ease-in-out overflow-y-scroll">
      <NotificationGroup
        content={notificationGroupContent1}
        lineReq={false}
        timeStampReq={true}
        title={"Notifications"}
        iconStylingReq={true}
      />
      <NotificationGroup
        content={notificationGroupContent2}
        lineReq={true}
        timeStampReq={true}
        title={"Activities"}
        classNameForLine="left-[20px]"
        iconStylingReq={false}
      />
      <NotificationGroup
        content={notificationGroupContent3}
        lineReq={false}
        timeStampReq={false}
        title={"Notifications"}
        className="items-center"
        iconStylingReq={false}
      />
    </div>
  );
}
