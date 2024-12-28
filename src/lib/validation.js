import { z } from "zod";

const requiredString = z.string().trim().min(1, "Обов'язково");

export const signUpSchema = z.object({
  email: requiredString.email("Помилка в адресі електронної пошти"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Дозволено тільки букви, цифри, знаки - та _",
  ),
  password: requiredString.min(8, "Мінімальна довжина паролю - 8 символів"),
});

export const loginSchema = z.object({
  email: requiredString.email("Помилка в адресі електронної пошти"),
  password: requiredString.min(8, "Мінімальна довжина паролю - 8 символів"),
});
