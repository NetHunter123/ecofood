"use server";

import { createCategorySchema } from "@/lib/validation";
import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { fileUpload } from "@/app/actions";
import { error } from "next/dist/build/output/log";

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

    const existingKey = await prisma.category.findFirst({
      where: {
        key: {
          equals: category_key,
          mode: "insensitive",
        },
      },
    });

    console.log("Category existingKey: ", existingKey);

    if (existingKey) {
      return { error: "Такий ключ уже існує" };
    }

    const { paths } = await fileUpload(category_filesImg);

    if (!paths) {
      return { error: "Помилка завантаження зображення" };
    }

    await prisma.category.create({
      data: {
        title: category_title,
        desc: category_desc,
        images: paths,
        key: category_key,
        status: category_status,
      },
    });

    // return redirect("/");

    return { error: false };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createCategoryForm action Error: ", error);
    return { error: "Щось пішло не так. Будьласка спробуйте знову." };
  }
}

export async function updateCategory(values) {}
