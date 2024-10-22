import { notFound } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { Chat as PreviewChat } from "@/components/custom/chat";
import { getChatById } from "@/db/queries";
import { convertToUIMessages } from "@/lib/utils";

export default async function Page({ params }) {
    const { id } = params;
    const chatFromDb = await getChatById({ id });

    if (!chatFromDb) {
        notFound();
    }

    // type casting
    const chat = {
        ...chatFromDb,
        messages: convertToUIMessages(chatFromDb.messages),
    };

    const session = await auth();

    if (!session || !session.user) {
        return notFound();
    }

    if (session.user.id !== chat.userId) {
        return notFound();
    }

    return <PreviewChat id={chat.id} initialMessages={chat.messages} />;
}
