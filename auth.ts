import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                input: false,
            },
        },
    },
    secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-change-in-production",
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});