"use server";

import { z } from "zod";

import { createUser, getUser } from "@/db/queries";

import { signIn } from "./auth";

const authFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const validateToken = async (token) => {
    if (!token) throw new Error("Invalid recaptcha token");
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`, { method: "POST" })
        .then((res) => res.json());
    if (!response.success) throw new Error("Invalid recaptcha token");
    return true;
}

export const login = async (_, formData) => {
    try {
        const recaptchaToken = formData.get("recaptcha");
        await validateToken(recaptchaToken);

        const validatedData = authFormSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        await signIn("credentials", {
            email: validatedData.email,
            password: validatedData.password,
            redirect: false,
        });

        return { status: "success" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "invalid_data" };
        }

        return { status: "failed" };
    }
};

export const register = async (_, formData) => {
    try {
        const recaptchaToken = formData.get("recaptcha");
        await validateToken(recaptchaToken);

        const validatedData = authFormSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        let [user] = await getUser(validatedData.email);

        if (user) {
            return { status: "user_exists" };
        } else {
            await createUser(validatedData.email, validatedData.password);
            await signIn("credentials", {
                email: validatedData.email,
                password: validatedData.password,
                redirect: false,
            });

            return { status: "success" };
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: "invalid_data" };
        }

        return { status: "failed" };
    }
};
