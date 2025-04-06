import React from "react";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";

// Функція для отримання першого речення
async function getFirstSentence(markdownText) {
  if (!markdownText) {
    return "Деталі на сторінці товару.";
  }

  const html = marked(markdownText);
  const plainText = html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const match = plainText.match(/[^.!?]+[.!?]+/);
  return match ? match[0].trim() : plainText;
}

const CategoryItem = async ({ category }) => {
  const { title, images, key, desc } = category;

  const firstSentence = await getFirstSentence(desc);

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
        {!!desc ? `${firstSentence}` : "Деталі на сторінці товару"}
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
