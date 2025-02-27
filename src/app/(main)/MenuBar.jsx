import React from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/shared/buttons/Button";
import { IoHome } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { HiTemplate } from "react-icons/hi";

const menuList = [
  { title: "Головна", key: "nav_admin", link: "/", icon: <IoHome /> },
  {
    title: "Категорії",
    key: "nav_categories",
    link: "/categories",
    icon: <BiSolidCategoryAlt />,
  },
  {
    title: "Продукти",
    key: "nav_products",
    link: "/products",
    icon: <HiTemplate />,
  },
  { title: "Користувачі", key: "nav_users", link: "/users", icon: <FaUsers /> },
  {
    title: "Замовлення",
    key: "nav_orders",
    link: "/orders",
    icon: <GrNotes />,
  },
];

const MenuBar = ({ className }) => {
  const linksList = menuList.map((item) => {
    return (
      <li
        key={item.key}
        className={"w-full outline-none focus-visible:outline-none"}
      >
        <Button
          className={"text-lg max-lg:p-2 [&_span_svg]:text-[22px]"}
          childrenClassName={"max-md:hidden"}
          variant={"filled"}
          href={item.link}
          asComp={"link"}
          ltI={item.icon}
          loading={false}
        >
          {item.title}
        </Button>
      </li>
    );
  });

  return <ul className={cn("gap-2", className)}>{linksList}</ul>;
};

export default MenuBar;
