import React from "react";
import Button from "@/components/shared/buttons/Button";
import prisma from "@/lib/prisma";
import CategoryItem from "@/components/shared/categories/CategoryItem";
import { FaPlus } from "react-icons/fa";

const Page = async () => {
  const categories = await prisma.category.findMany({
    // where: {
    //   status: "PUBLISH", // Фільтруємо тільки опубліковані категорії
    // },
    orderBy: {
      createdAt: "desc", // Сортуємо за датою створення (спадання)
    },
  });

  return (
    <>
      <div className="w-full">
        <h2 className={"pb-5 text-center text-4xl font-bold text-primary"}>
          Категорії
        </h2>
        <Button
          className={"mb-5 text-lg max-lg:p-2 [&_span_svg]:text-[18px]"}
          childrenClassName={"max-md:hidden"}
          variant={"outline"}
          href={"/categories/create"}
          asComp={"link"}
          ltI={<FaPlus />}
          loading={false}
        >
          Додати нову категорію
        </Button>

        <ul className="flex flex-wrap justify-start gap-3">
          {categories?.map((category) => (
            <li key={category.id}>
              <CategoryItem category={category} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
