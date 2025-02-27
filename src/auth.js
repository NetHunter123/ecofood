import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "@/lib/prisma";
import { Lucia } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      phone: databaseUserAttributes.phone,
      email: databaseUserAttributes.email,
      name: databaseUserAttributes.name,
      surname: databaseUserAttributes.surname,
      googleId: databaseUserAttributes.googleId,
    };
  },
});

export const validateRequest = cache(async (user, session) => {
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCokie = lucia.createSessionCookie(result.session.id);
      const cookiesStore = await cookies();
      cookiesStore.set(
        sessionCokie.name,
        sessionCokie.value,
        sessionCokie.attributes,
      );
    }
    if (!result.session) {
      const sessionCokie = lucia.createBlankSessionCookie();
      const cookiesStore = await cookies();
      cookiesStore.set(
        sessionCokie.name,
        sessionCokie.value,
        sessionCokie.attributes,
      );
    }
  } catch (error) {}

  return result;
});
