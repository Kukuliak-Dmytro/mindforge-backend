import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./utils/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  user: {
    modelName: "User",
    fields: {
      email: "email",
      image: "avatarUrl",
      emailVerified: "emailVerified",
    },
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
        input: true,
      },
      lastName: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  session: {
    modelName: "AuthSession",
    fields: {
      userId: "userId",
      expiresAt: "expiresAt",
      token: "token",
    },
  },
});
