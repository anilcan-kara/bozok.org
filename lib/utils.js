// import { generateId } from "ai";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const fetcher = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error(
            "An error occurred while fetching the data.",
        );

        error.info = await res.json();
        error.status = res.status;

        throw error;
    }

    return res.json();
};

export function getLocalStorage(key) {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(key) || "[]");
    }
    return [];
}

export function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function addToolMessageToChat({ toolMessage, messages }) {
    return messages.map((message) => {
        if (message.toolInvocations) {
            return {
                ...message,
                toolInvocations: message.toolInvocations.map((toolInvocation) => {
                    const toolResult = toolMessage.content.find(
                        (tool) => tool.toolCallId === toolInvocation.toolCallId,
                    );

                    if (toolResult) {
                        return {
                            ...toolInvocation,
                            state: "result",
                            result: toolResult.result,
                        };
                    }

                    return toolInvocation;
                }),
            };
        }

        return message;
    });
}

export function convertToUIMessages(messages) {
    return messages.reduce((chatMessages, message) => {
        if (message.role === "tool") {
            return addToolMessageToChat({ toolMessage: message, messages: chatMessages });
        }

        let textContent = "";
        let toolInvocations = [];

        if (typeof message.content === "string") {
            textContent = message.content;
        } else if (Array.isArray(message.content)) {
            for (const content of message.content) {
                if (content.type === "text") {
                    textContent += content.text;
                } else if (content.type === "tool-call") {
                    toolInvocations.push({
                        state: "call",
                        toolCallId: content.toolCallId,
                        toolName: content.toolName,
                        args: content.args,
                    });
                }
            }
        }

        chatMessages.push({
            id: crypto.randomUUID(),
            role: message.role,
            content: textContent,
            toolInvocations,
        });

        return chatMessages;
    }, []);
}

export function getTitleFromChat(chat) {
    const messages = convertToUIMessages(chat.messages);
    const firstMessage = messages[0];

    if (!firstMessage) {
        return "Untitled";
    }

    return firstMessage.content;
}
