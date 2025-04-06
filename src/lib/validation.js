import { z } from "zod";
import { STATUS } from "@prisma/client";

const requiredString = z.string().trim().min(1, "Обов'язково");

const StatusEnum = z.enum(["DRAFT", "PUBLISH"]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

export const signUpSchema = z.object({
  email: requiredString.email("Помилка в адресі електронної пошти"),

  phone: requiredString
    .max(13, "Введіть номер у форматі +380XXXXXXXXX.")
    .regex(/^\+380\d*$/u, "Введіть номер у форматі +380XXXXXXXXX."),

  name: requiredString
    .max(50, "Максимальний розмір 50 символів")
    .regex(/^[\p{L}'-]+$/u, "(дозволені лише літери, апостроф та дефіс)"),
  surname: requiredString
    .max(50, "Максимальний розмір 50 символів")
    .regex(/^[\p{L}'-]+$/u, "(дозволені лише літери, апостроф та дефіс)"),
  password: requiredString.min(8, "Мінімальна довжина паролю - 8 символів"),
});

export const signInSchema = z.object({
  email: requiredString.email("Помилка в адресі електронної пошти"),
  password: requiredString.min(8, "Мінімальна довжина паролю - 8 символів"),
});

export const createCategorySchema = z.object({
  category_title: requiredString.max(50, "Максимальний розмір 50 символів"),
  category_key: requiredString.regex(/^(?![-_])[a-zA-Z0-9-_]+(?<![-_])$/, {
    message:
      "(Дозволено лише англійські букви, цифри, символи '-' та '_' без пробілів)",
  }),
  category_desc: requiredString.or(z.literal("")),

  category_filesImg: z.union([
    z
      .instanceof(File, { message: "Зображення є обов'язковим." })
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: "Вага картинки має бути меншою ніж 5MB",
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Допустимі формати тільки JPEG, PNG, JPG, WebP",
      }),
    z.object({
      md: z.array(z.union([z.string().url(), z.string().startsWith("/")])),
      sm: z.array(z.union([z.string().url(), z.string().startsWith("/")])),
      thumbnails: z.array(
        z.union([z.string().url(), z.string().startsWith("/")]),
      ),
    }),
  ]),
  category_status: StatusEnum.default("DRAFT"),
});
