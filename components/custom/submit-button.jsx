"use client";

import { useFormStatus } from "react-dom";

import { LoaderIcon } from "@/components/custom/icons";

import { Button } from "../ui/button";

export function SubmitButton({ children }) {
    const { pending } = useFormStatus();

    return (
        <Button
            type={pending ? "button" : "submit"}
            aria-disabled={pending}
            className="relative cursor-pointer"
        >

            {children}

            {pending && (
                <span className="animate-spin absolute right-4">
                    <LoaderIcon />
                </span>
            )}

            <span aria-live="polite" className="sr-only" role="status">
                {pending ? "Loading" : "Submit form"}
            </span>
        </Button>
    );
}
