import { convertToCoreMessages, streamText } from "ai";
import { z } from "zod";

import { customModel } from "@/ai";
import { auth } from "@/app/(auth)/auth";
import { deleteChatById, getChatById, saveChat } from "@/db/queries";

export async function POST(request) {
    const { id, messages } = await request.json();

    const session = await auth();

    if (!session) {
        return new Response("Yetkisiz", { status: 401 });
    }

    const coreMessages = convertToCoreMessages(messages);

    const result = await streamText({
        model: customModel,
        system:
            "Sen dost canlısı bir asistansın! Yanıtlarını faydalı tut. Bozok Üniversitesi öğrencilerinin öğrenci işlerine sorabilecekleri tarzda sorulara mevzuat ve yönetmelikler dahilinde sen cevap vereceksin. Yozgat iline dair genel bilgilere ve belediyecilik hizmetlerine daire güncel bilgiler ve gerekirse linkler vermelisin. Çok zorda kalmadıkça bir yere başvurması konusunda yönlendirme ve bütün konuyu sen halletmeye çalış. Tam olarak anlamazsan sana sorabileceği sıradaki soru için yönlendirmede bulun. Matematik işlemler için plain text kullan. Matematik işlemler için LaTeX kullanma! Seni kimin yaptığı sorusunun cevabı Bozok Üniversitesi Bilgisayar Mühendisliği öğrencisi Anılcan Kara'dır. Senin ne olduğuna ve modelinin ne olduğuna dair soruların cevabı ise geliştirilmeye devam eden bir büyük dil modeli olduğundur. OpenAI veya ChatGPT gibi bilgilerle herhangi bir ilişki ve bağlantı kurma. Bu modelin adı ise BozokAI'dır. Bu modelin versiyonu v1.0.0'dır.",
        messages: coreMessages,
        maxSteps: 5,
        tools: {
            getWeather: {
                description: "Bir konumdaki mevcut hava durumunu al",
                parameters: z.object({
                    latitude: z.number(),
                    longitude: z.number(),
                }),
                execute: async ({ latitude, longitude }) => {
                    // Yozgat: 39.822060 34.808132
                    const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
                    );

                    const weatherData = await response.json();
                    return weatherData;
                },
            },
        },
        onFinish: async ({ responseMessages }) => {
            if (session.user && session.user.id) {
                try {
                    await saveChat({
                        id,
                        messages: [...coreMessages, ...responseMessages],
                        userId: session.user.id,
                    });
                } catch (error) {
                    console.error("Sohbet kaydedilemedi");
                }
            }
        },
        experimental_telemetry: {
            isEnabled: true,
            functionId: "stream-text",
        },
    });

    return result.toDataStreamResponse({});
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return new Response("Bulunamadı", { status: 404 });
    }

    const session = await auth();

    if (!session || !session.user) {
        return new Response("Yetkisiz işlem", { status: 401 });
    }

    try {
        const chat = await getChatById({ id });

        if (chat.userId !== session.user.id) {
            return new Response("Yetkisiz işlem", { status: 401 });
        }

        await deleteChatById({ id });

        return new Response("Sohbet silindi", { status: 200 });
    } catch (error) {
        return new Response("İsteğinizi işlerken bir hata oluştu", {
            status: 500,
        });
    }
}
