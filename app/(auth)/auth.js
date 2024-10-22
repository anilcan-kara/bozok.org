import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUser } from "@/db/queries";

import { authConfig } from "./auth.config";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {},
            async authorize({ email, password }) {
                let users = await getUser(email);
                if (users.length === 0) return null;
                if (!users[0].password) return null;
                let passwordsMatch = await compare(password, users[0].password);
                if (passwordsMatch) return users[0];
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }

            return session;
        },
    },
});
