import React from "react";
import prisma from "@/lib/prisma";
import CategoryForm from "@/app/(main)/categories/CategoryForm";

const Page = async ({ params }) => {
  const { key } = await params;

  const category = await prisma.category.findUnique({
    where: { key: key },
  });

  if (!category) {
    return (
      <div
        className={
          "text-danger flex h-full w-full items-center justify-center text-2xl"
        }
      >
        Категорія не знайдена!
      </div>
    );
  }

  // Передаємо дані у форму
  return <CategoryForm category={category} />;
};

export default Page;
