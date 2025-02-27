import React from "react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { VscAccount } from "react-icons/vsc";

const UserAvatar = ({ avatarUrl, size, className }) => {
  return (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl || avatarPlaceholder}
          alt={`User avatar`}
          width={size ?? 48}
          height={size ?? 48}
          className={cn(
            "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
            className,
          )}
        />
      ) : (
        <div
          className={`height-[${size || 48}px] width-[${size || 48}px] rounded-full`}
        >
          <VscAccount size={34} className={"text-primary"} />
        </div>
      )}
    </>
  );
};

export default UserAvatar;
