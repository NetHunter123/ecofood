"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import BasicInput from "@/components/shared/formElements/BasicInput";
import PasswordInput from "@/components/shared/formElements/PasswordInput";
import Button from "@/components/shared/buttons/Button";
import ImageUpload from "@/components/shared/formElements/ImageUpload";
import StatusSwitcher from "@/components/shared/formElements/StatusSwither";
import {
  createCategory,
  updateCategory,
} from "@/app/(main)/categories/actions";
import { Slide, toast } from "react-toastify";
import RTEditor from "@/components/shared/formElements/RTEditor";
import prisma from "@/lib/prisma";

const CategoryForm = ({ category }) => {
  const [error, setError] = useState();
  const [MDEditor, setMDEditor] = useState();
  const [isPending, startTransition] = useTransition();

  const { id } = category;
  console.log("CategoryForm props category:", category);

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      category_title: category?.title || "",
      category_desc: category?.desc || "",
      category_key: category?.key || "",
      category_filesImg: { ...category?.images },
      category_status: category?.status || "DRAFT",
      // products: "", // Може бути select/dropdown
    },
  });

  /* const hasChanges = (initialValues, newValues) => {
    const fieldsToCompare = [
      "category_title",
      "category_desc",
      "category_key",
      "category_status",
    ];

    // Порівняння текстових полів і статусу
    for (const field of fieldsToCompare) {
      if (initialValues[field] !== newValues[field]) {
        return true;
      }
    }

    // Порівняння зображень
    if (newValues.category_filesImg instanceof File) {
      return true; // Якщо завантажено новий файл, є зміни
    }

    return (
      JSON.stringify(initialValues.category_filesImg) !==
      JSON.stringify(newValues.category_filesImg)
    );

    // Змін немає
  };*/

  async function onSubmit(values) {
    setError(undefined);

    console.log("Submit CategoryForm values: ", values);

    // Початкові значення категорії

    /* const initialValues = {
      category_title: category?.title,
      category_desc: category?.desc,
      category_key: category?.key,
      category_filesImg: category?.images,
      category_status: category?.status,
    };

    // Перевірка наявності змін
    if (!hasChanges(initialValues, values)) {
      toast.info("Змін у категорії не виявлено.");
      return; // Виходимо, якщо змін немає
    }*/

    startTransition(async () => {
      const result = !!category
        ? await updateCategory(category.id, values)
        : await createCategory(values);

      if (result?.error) {
        setError(result?.error);
        toast.error("Виникла помилка!");
      } else if (result?.message === "Змін не виявлено") {
        toast.info("Змін не виявлено");
      } else {
        toast.success(
          !!category
            ? "Категорія успішно оновлена!"
            : "Категорія успішно створена!",
        );
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-3 md:flex-nowrap">
          <div className={"flex w-full justify-center md:w-fit"}>
            <ImageUpload
              form={form}
              inputName={"category_filesImg"}
              label={"Картинка Категорії"}
              description={""}
              defaultImage={category?.images || null}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <BasicInput
              form={form}
              inputName={"category_title"}
              label={"Заголовок"}
              placeholder="заголовок"
            />
            {/*Поле для ключа (key) */}
            <BasicInput
              form={form}
              inputName={"category_key"}
              label={"Унікальний код категорії"}
              placeholder="Код категорії"
              description={"(код писати аглійською)"}
            />
            {/*<BasicInput*/}
            {/*  form={form}*/}
            {/*  inputName={"category_desc"}*/}
            {/*  label={"Опис"}*/}
            {/*  placeholder="опис"*/}
            {/*/>*/}

            <RTEditor
              form={form}
              inputName={"category_desc"}
              label={"Опис"}
              // getMDContent={setMDEditor}
              // MDContent={MDEditor}
              initContent={category?.desc || ""}
            />

            {error && (
              <p
                className={
                  "relative mx-auto my-3 w-full max-w-[600px] px-1 py-3 text-center text-destructive"
                }
              >
                <div className="absolute right-0 top-0 h-[2px] w-[15%] bg-destructive"></div>
                <div className="absolute bottom-0 left-0 h-[2px] w-[15%] bg-destructive"></div>
                <div className="absolute right-0 top-0 h-[25%] w-[2.5px] bg-destructive"></div>
                <div className="absolute bottom-0 left-0 h-[25%] w-[2.5px] bg-destructive"></div>
                {error}
              </p>
            )}
            <div className="flex w-full flex-wrap justify-end gap-3">
              <StatusSwitcher form={form} inputName={"category_status"} />
              <Button
                onClick={() => {
                  toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                  });
                }}
                type="submit"
                loading={isPending}
                className={"text-lg"}
                variant={"filled"}
              >
                {!!category ? "Оновити" : "Зберегти"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
