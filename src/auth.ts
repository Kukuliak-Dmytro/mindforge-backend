import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./utils/prisma";

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [frontendUrl],
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
      role: {
        type: "string",
        required: true,
        input: false, // Don't allow direct input, set via database default
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
