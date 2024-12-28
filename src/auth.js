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
      username: databaseUserAttributes.username,
      email: databaseUserAttributes.email,
      displayName: databaseUserAttributes.displayName,
      googleId: databaseUserAttributes.googleId,
    };
  },
});

export const validateRequest = cache(async (user, session) => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCokie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCokie.name,
        sessionCokie.value,
        sessionCokie.attributes,
      );
    }
    if (!result.session) {
      const sessionCokie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCokie.name,
        sessionCokie.value,
        sessionCokie.attributes,
      );
    }
  } catch (error) {}

  return result;
});
