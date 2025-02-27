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
import { createCategory } from "@/app/(main)/categories/actions";

const CreateCategoryForm = () => {
  const [error, setError] = useState();

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      category_title: "",
      category_desc: "",
      category_key: "",
      category_filesImg: "", // Місце для зображення
      category_status: "DRAFT",
      // products: "", // Може бути select/dropdown
    },
  });

  async function onSubmit(values) {
    setError(undefined);

    console.log("Submit CreateCategoryForm values: ", values);
    startTransition(async () => {
      const { error } = await createCategory(values);
      if (error) setError(error);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && <p className={"text-center text-destructive"}>{error}</p>}
        <div className="flex flex-wrap gap-3 md:flex-nowrap">
          <div className={"flex w-full justify-center md:w-fit"}>
            <ImageUpload
              form={form}
              inputName={"category_filesImg"}
              label={"Картинка Категорії"}
              description={""}
            />
          </div>
          <div className="w-full">
            <BasicInput
              form={form}
              inputName={"category_title"}
              label={"Заголовок"}
              placeholder="заголовок"
            />
            <BasicInput
              form={form}
              inputName={"category_desc"}
              label={"Опис"}
              placeholder="опис"
            />
            <BasicInput
              form={form}
              inputName={"category_key"}
              label={"Унікальний код категорії"}
              placeholder="Код категорії"
              description={"(код писати аглійською)"}
            />
            {/*Поле для ключа (key) */}

            <div className="flex w-full flex-wrap justify-end gap-3">
              <StatusSwitcher form={form} inputName={"category_status"} />
              <Button
                type="submit"
                loading={isPending}
                className={"text-lg"}
                variant={"filled"}
              >
                Зберегти
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
