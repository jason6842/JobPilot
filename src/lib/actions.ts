"use server"

import { registerSchema } from "@/features/schemas";
import { signIn, signOut } from "./auth";
import { prisma } from "./prisma";

export async function githubLogin() {
    await signIn("github");
}

export async function googleLogin() {
    await signIn("google");
}

export async function signOutAction() {
    await signOut();
}

type RegisterInput = {
    name: string;
    email: string;
    password: string;
};

export async function signUp(values: RegisterInput) {


    const validatedData = registerSchema.parse(values);

    const existing = await prisma.user.findUnique({
        where: { email: validatedData.email }
    })

    if (existing) {
        return { success: false, message: "User already exists" }
    }
    console.log('VALUES: ', validatedData)
    await prisma.user.create({
        data: {
            name: validatedData.name,
            email: validatedData.email,
            password: validatedData.password
        }
    })

    return { success: true }
}