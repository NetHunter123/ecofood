"use server";

import { signUpSchema } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signUp(credentials) {
  try {
    // username буде поле для телефону
    const { name, surname, phone, email, password } =
      signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingPhone = await prisma.user.findFirst({
      where: {
        phone: {
          equals: phone,
          mode: "insensitive",
        },
      },
    });

    if (existingPhone) {
      return { error: "Такий номер уже зареєстрований" };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return { error: "Такий користувач уже зареєстрований" };
    }

    await prisma.user.create({
      data: {
        id: userId,
        phone,
        email,
        name,
        surname,
        passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookiesStore = await cookies();
    cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("SignUp action Error:", error);
    return { error: "Щось пішло не так. Будьласка спробуйте знову." };
  }
}
