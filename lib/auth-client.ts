import { createAuthClient } from "better-auth/react";

// Détection automatique de l'URL de base
const getBaseURL = () => {
    if (typeof window !== 'undefined') {
        // Côté client : utiliser l'URL actuelle
        return window.location.origin;
    }
    // Côté serveur : utiliser la variable d'environnement ou localhost
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
});

export const { signIn, signUp, signOut, useSession } = authClient;
