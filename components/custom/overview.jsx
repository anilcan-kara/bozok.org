import { motion } from "framer-motion";

import { MessageIcon } from "./icons";

export const Overview = () => {
    return (
        <motion.div
            key="overview"
            className="max-w-[500px] mt-20 mx-4 md:mx-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ delay: 0.5 }}
        >
            <div className="border rounded-lg p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700">
                <p className="flex flex-row justify-center gap-4 items-center text-zinc-900 dark:text-zinc-50">
                    <MessageIcon />
                </p>

                <p>
                    This is Bozok University Chatbot built from Anilcan Kara. It uses the{" "}
                    <code className="rounded-md bg-muted px-1 py-0.5">streamText</code>{" "}
                    function in the server and the{" "}
                    <code className="rounded-md bg-muted px-1 py-0.5">useChat</code> hook
                    on the client to create a seamless chat experience.
                </p>
            </div>
        </motion.div>
    );
};
