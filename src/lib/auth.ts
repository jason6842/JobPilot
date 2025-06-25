import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { loginSchema } from "@/features/schemas"

import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

const adapter = PrismaAdapter(prisma)

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter,
    session: {
        strategy: "database",
    },
    providers: [GitHub, Google, Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) => {
            const validatedCredentials = loginSchema.parse(credentials);

            const { email, password } = validatedCredentials
            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                    password: password
                }
            })

            if (!user) {
                return null;
            }
            return {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    })],

    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        },
    },
    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = uuid();

                if (!params.token.sub) {
                    throw new Error("No user ID found in token");
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                });

                if (!createdSession) {
                    throw new Error("Failed to create session");
                }

                return sessionToken;
            }
            return defaultEncode(params);
        },
    },
});