import React from "react";
import Link from "next/link";
import UserButton from "@/components/shared/buttons/UserButton";
import SearchField from "@/components/shared/SearchField";

const Navbar = () => {
  return (
    <header className={"sticky top-0 z-10 bg-card shadow-sm"}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link
          href={"/"}
          className={"cursor-pointer text-2xl font-bold text-primary"}
        >
          Ferment <span className={"text-chart-5y"}>Craft</span>{" "}
        </Link>
        <SearchField />
        <UserButton className={"sm:ms-auto"} />
      </div>
    </header>
  );
};

export default Navbar;
