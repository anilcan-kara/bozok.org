import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";

const FileSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Dosya boyutu 5MB'den küçük olmalı",
        })
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
            {
                message: "Dosya türü JPEG, PNG veya PDF olmalı",
            },
        ),
});

export async function POST(request) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }

    if (request.body === null) {
        return new Response("İstek gövdesi boş", { status: 400 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "Dosya yüklenmedi" }, { status: 400 });
        }

        const validatedFile = FileSchema.safeParse({ file });

        if (!validatedFile.success) {
            const errorMessage = validatedFile.error.errors
                .map((error) => error.message)
                .join(", ");

            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }

        const filename = file.name;
        const fileBuffer = await file.arrayBuffer();

        try {
            const data = await put(`${filename}`, fileBuffer, {
                access: "public",
            });

            return NextResponse.json(data);
        } catch (error) {
            return NextResponse.json({ error: "Yükleme başarısız" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json(
            { error: "İstek işlenemedi" },
            { status: 500 },
        );
    }
}
