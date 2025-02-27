"use server";

import { createCategorySchema } from "@/lib/validation";
import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function createCategory(values) {
  try {
    // username буде поле для телефону

    const {
      category_title,
      category_desc,
      category_key,
      category_filesImg,
      category_status,
    } = createCategorySchema.parse(values);

    console.log(
      "Action get values:",
      category_title,
      category_desc,
      category_key,
      category_filesImg,
      category_status,
    );

    // const existingKey = await prisma.category.findFirst({
    //   where: {
    //     key: {
    //       equals: category_key,
    //       mode: "insensitive",
    //     },
    //   },
    // });
    //
    // if (existingKey) {
    //   return { error: "Такий ключ уже існує" };
    // }

    // await prisma.category.create({
    //   data: {
    //     title: category_title,
    //     desc: category_desc,
    //     images: category_filesImg,
    //     key: category_key,
    //     status: category_status,
    //   },
    // });

    // return redirect("/");
    return { success: "Категорію успішно створено" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createCategoryForm action Error: ", error);
    return { error: "Щось пішло не так. Будьласка спробуйте знову." };
  }
}
