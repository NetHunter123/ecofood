import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryItem = ({ category }) => {
  const { title, images, key, desc } = category;
  return (
    <Link
      href={`/categories/${key}`}
      className="group relative block w-fit overflow-hidden"
    >
      {images && (
        <div className="relative h-[300px] w-[300px] object-contain sm:h-[220px] sm:w-[220px] md:h-[250px] md:w-[250px]">
          <Image
            className="object-cover"
            src={`${category.images.sm[0]}`}
            alt={title}
            quality={100}
            fill
          />
        </div>
      )}
      <p
        className={
          "absolute left-0 right-0 top-0 flex h-[calc(100%-50px)] translate-y-[-130%] items-center justify-center border-b border-primary bg-black/45 p-5 text-center leading-[27px] text-white backdrop-blur-sm transition-transform duration-300 ease-in-out group-hover:translate-y-0"
        }
      >
        {desc}
      </p>
      <h3
        className={
          "absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black/45 p-[15px] text-xl leading-none text-white backdrop-blur-sm"
        }
      >
        {title}
      </h3>
    </Link>
  );
};

export default CategoryItem;
