"use server";
import * as logger from "next/dist/build/output/log";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signInSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { verify } from "@node-rs/argon2";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(credentials) {
  try {
    const { password, email } = signInSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Некоректний емейл або пароль",
      };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLength: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return {
        error: "Некоректний емейл або пароль",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookiesStore = await cookies();
    await cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("SignIn action Error:", error);

    return { error: "Щось пішло не так. Будьласка спробуйте знову." };
  }
}
