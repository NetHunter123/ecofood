import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuLoaderPinwheel } from "react-icons/lu";
import { TbLoader3 } from "react-icons/tb";

const buttonVariants = cva(
  "group flex items-center justify-center gap-1 text-center text-md font-medium w-fit" +
    "transition-all duration-300 select-none ease-in-out cursor-pointer ",
  {
    variants: {
      asComp: {
        button:
          "active:translate-y-[1px] whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
        link: "active:translate-y-[1px] whitespace-nowrap ring-offset-background transition-colors ",
      },
      variant: {
        none: "",
        filled:
          "bg-primary rounded-[8px] " +
          "shadow-[rgba(142,175,70,0.2)_0_-25px_18px_-14px_inset,rgba(142,175,70,0.15)_0_1px_2px,rgba(142,175,70,0.15)_0_2px_4px,rgba(142,175,70,0.15)_0_4px_8px,rgba(142,175,70,0.15)_0_8px_16px,rgba(142,175,70,0.15)_0_16px_32px] " +
          "border-0 " +
          "hover:shadow-[rgba(142,175,70,0.35)_0_-25px_18px_-14px_inset,rgba(142,175,70,0.25)_0_1px_2px,rgba(142,175,70,0.25)_0_2px_4px,rgba(142,175,70,0.25)_0_4px_8px,rgba(142,175,70,0.25)_0_8px_16px,rgba(142,175,70,0.25)_0_16px_32px] " +
          "hover:scale-[103%] select-none " +
          "text-primary-foreground ",
        outline:
          "bg-transparent border-2 border-primary  rounded-[8px] " +
          "shadow-none " +
          "hover:bg-primary hover:shadow-[rgba(142,175,70,0.35)_0_-25px_18px_-14px_inset,rgba(142,175,70,0.25)_0_1px_2px,rgba(142,175,70,0.25)_0_2px_4px,rgba(142,175,70,0.25)_0_4px_8px,rgba(142,175,70,0.25)_0_8px_16px,rgba(142,175,70,0.25)_0_16px_32px] " +
          "hover:scale-[103%] select-none " +
          "text-primary hover:text-primary-foreground ",
        outlineDanger:
          "bg-transparent border-2 border-red-500 text-red-500 text-xl rounded-[8px] " +
          "shadow-none " +
          "  hover:text-white hover:bg-red-500 hover:shadow-[rgba(239,68,68,0.35)_0_-25px_18px_-14px_inset,rgba(239,68,68,0.25)_0_1px_2px,rgba(239,68,68,0.25)_0_2px_4px,rgba(239,68,68,0.25)_0_4px_8px,rgba(239,68,68,0.25)_0_8px_16px,rgba(239,68,68,0.25)_0_16px_32px]\n" +
          "hover:scale-[103%] select-none " +
          "hover:text-primary-foreground ",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // destructive:
        //   "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // secondary: "bg-secondary text-primary hover:bg-secondary/50",
        // ghost: "hover:bg-secondary hover:text-secondary-foreground",
        // link: "text-primary underline-offset-4 hover:underline",
        underlined: `relative duration-300 font-[500] text-md ease-in-out
	        hover:text-primary before:content-[''] before:absolute
	        before:top-full before:left-0 before:w-full before:h-[3px]
	        before:bg-primary before:transform before:scale-x-0
	        before:transition-transform before:duration-300 before:ease-in-out
	        hover:before:scale-x-100 rounded-[none] h-10 px-4 py-2 pb-2`,
      },
      ltI: {
        true: "pl-2.5 ", // Стиль, якщо є лівий елемент
        false: "",
      },
      rtI: {
        true: "pr-2.5", // Стиль, якщо є правий елемент
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      asComp: "button",
      // size: "md",
    },
  },
);

const Button = React.forwardRef(
  (
    {
      asComp = "button",
      loading = false,
      variant,
      className,
      ltI,
      rtI,
      size = "md",
      children,
      childrenClassName,
      ...props
    },
    ref,
  ) => {
    let Comp;
    switch (asComp) {
      case "button":
        Comp = "button";
        break;
      case "link":
        Comp = Link;
        break;
      case "child":
        Comp = Slot;
        break;
      default:
        Comp = "button";
    }

    const sizes = {
      button: {
        xs: "px-3 py-2 text-xl",
        sm: "px-3 py-2 text-sm",
        md: "px-3 min-h-[35px] text-md ",
        lg: "px-4 py-3 text-base",
        xl: "px-5 py-3.5 text-base",
      },
      link: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 min-h-[35px] text-md",
        lg: "px-5 py-2.5 text-lg",
        xl: "px-6 py-3 text-xl",
      },
    };

    const sizeClass = sizes[asComp][size]; // Отримуємо клас для розміру відповідного компонента

    const classes = buttonVariants({
      asComp,
      variant,
      ltI: !!ltI,
      rtI: !!rtI,
      size,
      className,
    });

    return (
      <Comp className={cn(sizeClass, classes)} ref={ref} {...props}>
        {loading && <TbLoader3 className={"size-6 animate-spin"} />}
        {!loading && !!ltI && <span>{ltI}</span>}
        {!loading && children && (
          <span
            className={cn(
              "children-b mt-[1.1px] leading-[16px]",
              childrenClassName,
            )}
          >
            {children}
          </span>
        )}
        {/*<div className="bg-primary filter brightness-[95%] absolute top-0 bottom-0 left-0 right-0 z-10"></div>*/}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export default Button;
