"use client";

import React from "react";
import { useSession } from "@/app/(main)/SessionProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/shared/UserAvatar";
import { logout } from "@/app/(auth)/actions";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { LuMonitor, LuMonitorCog } from "react-icons/lu";
import { CiBookmarkCheck, CiLight } from "react-icons/ci";
import { FiMoon } from "react-icons/fi";

const UserButton = ({ className }) => {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Здійснено вхід як {user.name} {user.surname}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <LuMonitorCog className={"mr-2 size-5"} />
            Тема сайту
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <LuMonitor className={"mr-2 size-5"} /> system
                {theme === "system" && (
                  <CiBookmarkCheck className={"ms-2 size-7 text-primary"} />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                {" "}
                <CiLight className={"mr-2 size-5"} />
                light
                {theme === "light" && (
                  <CiBookmarkCheck className={"ms-2 size-7 text-primary"} />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                {" "}
                <FiMoon className={"mr-2 size-5"} />
                dark
                {theme === "dark" && (
                  <CiBookmarkCheck className={"ms-2 size-7 text-primary"} />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
          <RiLogoutBoxRLine className={"mr-2 size-5"} />
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
