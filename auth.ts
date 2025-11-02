import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

// Détection automatique de l'URL de base pour la production
const getBaseURL = () => {
    // En production, utiliser VERCEL_URL ou BETTER_AUTH_URL
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.BETTER_AUTH_URL) {
        return process.env.BETTER_AUTH_URL;
    }
    // En développement local
    return "http://localhost:3000";
};

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    // Ajoutez cette configuration
    trustedOrigins: [
        'http://localhost:3000',
        'https://jigifuel.vercel.app',
        // Vous pouvez ajouter d'autres domaines si nécessaire
    ],
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
    baseURL: getBaseURL(),
});