import React from "react";
import Link from "next/link";
import {cva} from "class-variance-authority";
import {cn} from "@/lib/utils";

const variants = ["underlined", "rtIcon", "ltIcon", "onlyIcon", "dropdown"];
const UnderlinedLink = React.forwardRef(
	(
		{
			className,
			children,
			variant = "underlined",
			size,
			href = "#",
			rtIcon,
			ltIcon,
			icon,
			...props
		},
		ref
	) => {
		const UnderlinedLinkVariants = cva(
			"group inline-flex items-center justify-center whitespace-nowrap rounded-md active:translate-y-[1px] gap-2 text-sm font-medium ring-offset-background transition-colors "
			//+ "disabled:pointer-events-none disabled:opacity-50"
			,
			{
				variants: {
					variant: {
						// default: "bg-primary text-primary-foreground hover:bg-primary/90",
						
						underlined: `relative duration-300 font-[500] text-md ease-in-out
	        hover:text-primary before:content-[''] before:absolute
	        before:top-full before:left-0 before:w-full before:h-[3px]
	        before:bg-primary before:transform before:scale-x-0
	        before:transition-transform before:duration-300 before:ease-in-out
	        hover:before:scale-x-100 rounded-[none] h-10 px-4 py-2 pb-2`,
						// outline:
						// 	"border border-primary text-primary bg-transparent hover:bg-secondary",
						// secondary: "bg-secondary text-primary hover:bg-secondary/50",
						// ghost: "hover:bg-secondary hover:text-secondary-foreground",
						// link: "text-primary underline-offset-4 hover:underline",
					},
					size: {
						default: "h-10 px-4 py-2",
						sm: "h-9 rounded-md px-3",
						lg: "h-11 rounded-md px-8",
						icon: "h-10 w-10",
					},
				},
				defaultVariants: {
					variant: "default",
					size: "default",
				},
			}
		);
		
		return (
				
				
				<Link
					href={href}
					className={cn(UnderlinedLinkVariants({variant}), className)}
					ref={ref}
					{...props}
				>
					{rtIcon ?? rtIcon}
					{children}
					{ltIcon ?? ltIcon}
				</Link>
			// </div>
		);
	}
);

export default UnderlinedLink;
