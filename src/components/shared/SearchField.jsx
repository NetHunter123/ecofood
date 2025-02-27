"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";

const SearchField = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = form.q.value.trim();
    if (!q) return;

    router.push(`/search?q=${encodeURIComponent(q)}`);
  };
  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input
          name="q"
          placeholder={"Пошук товару"}
          className={"rounded-2xl border-[3px] border-primary pe-10"}
        ></Input>
        <IoIosSearch className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
};

export default SearchField;
