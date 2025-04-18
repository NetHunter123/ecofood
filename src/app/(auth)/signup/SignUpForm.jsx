"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import Button from "@/components/shared/buttons/Button";
import BasicInput from "@/components/shared/formElements/BasicInput";
import { useState, useTransition } from "react";
import { signUp } from "@/app/(auth)/signup/actions";
import PasswordInput from "@/components/shared/formElements/PasswordInput";

export default function SignUpForm(props) {
  const [error, setError] = useState();

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      phone: "",
      email: "",
      password: "",
      name: "",
      surname: "",
    },
  });

  async function onSubmit(values) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) setError(error);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
        {error && <p className={"text-center text-destructive"}>{error}</p>}
        <BasicInput
          form={form}
          inputName={"name"}
          label={"Ім'я"}
          placeholder="ім'я"
        />
        <BasicInput
          form={form}
          inputName={"surname"}
          label={"Прізвище"}
          placeholder="прізвище"
        />
        <BasicInput
          form={form}
          inputName={"phone"}
          label={"Телефон"}
          placeholder="телефон"
        />
        <BasicInput
          form={form}
          type={"email"}
          inputName={"email"}
          label={"Ел.пошта"}
          placeholder="пошта"
        />
        <PasswordInput
          form={form}
          inputName={"password"}
          label={"Пароль"}
          placeholder="пароль"
        />
        {/*Поле для ключа (key) */}
        <Button
          type="submit"
          loading={isPending}
          className={"w-full text-lg"}
          variant={"filled"}
        >
          Зберегти
        </Button>{" "}
      </form>
    </Form>
  );
}
