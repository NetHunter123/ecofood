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

const CategoryForm = ({ category }) => {
  const [error, setError] = useState();
  const [MDEditor, setMDEditor] = useState();
  const [isPending, startTransition] = useTransition();

  console.log("CategoryForm props category:", category);

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      category_title: category?.title || "",
      category_desc: category?.desc || "",
      category_key: category?.key || "",
      category_filesImg: category?.images || "",
      category_status: category?.status || "DRAFT",
      // products: "", // Може бути select/dropdown
    },
  });

  async function onSubmit(values) {
    setError(undefined);

    console.log("Submit CategoryForm values: ", values);

    startTransition(async () => {
      const result = !!category
        ? await updateCategory(category.id, values)
        : await createCategory(values);

      if (result?.error) {
        setError(result?.error);
        toast.error("Виникла помилка!");
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
              // getMDContent={setMDEditor}
              // MDContent={MDEditor}
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
