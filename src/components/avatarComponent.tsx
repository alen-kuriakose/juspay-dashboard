import Link from "next/link";
import React from "react";
import Image, { StaticImageData } from "next/image";
type AvatarComponentProps = {
  avatarImg: StaticImageData;
  name: string;
};

export function AvatarComponent({ avatarImg, name }: AvatarComponentProps) {
  return (
    <div className="flex justify-start p-1">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Image src={avatarImg} alt={"profile_avatar"} width={24} height={24} />
        <span className="text-sm text-dark dark:text-white font-normal">
          {name}
        </span>
      </Link>
    </div>
  );
}
