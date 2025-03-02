'use client';

import { useChat } from 'ai/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Message as PreviewMessage } from '@/components/custom/message';
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';

import { MultimodalInput } from './multimodal-input';
import { Overview } from './overview';

export function Chat({ id, initialMessages }) {
    const { messages, handleSubmit, input, setInput, append, isLoading, stop } = useChat({
        body: { id },
        initialMessages,
        onFinish: () => {
            window.history.replaceState({}, '', `/chat/${id}`);
        },
    });

    const [messagesContainerRef, messagesEndRef] = useScrollToBottom();

    const [attachments, setAttachments] = useState([]);

    return (
        <div className="flex flex-row justify-center pb-4 md:pb-8 h-dvh bg-background">
            <div className="flex flex-col justify-between items-center gap-4">
                <div ref={messagesContainerRef} className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll">
                    {messages.length === 0 && <Overview />}

                    {messages.map((message) => (
                        <PreviewMessage
                            key={message.id}
                            role={message.role}
                            content={message.content}
                            attachments={message.experimental_attachments}
                            toolInvocations={message.toolInvocations}
                        />
                    ))}

                    <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
                </div>

                <form className="flex flex-row gap-2 relative items-end w-full md:max-w-[500px] max-w-[calc(100dvw-32px) px-4 md:px-0">
                    <MultimodalInput
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        stop={stop}
                        attachments={attachments}
                        setAttachments={setAttachments}
                        messages={messages}
                        append={append}
                    />
                </form>
            </div>
        </div>
    );
}

Chat.propTypes = {
    id: PropTypes.string.isRequired,
    initialMessages: PropTypes.array,
};
