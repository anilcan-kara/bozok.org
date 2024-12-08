import { signOut } from "@/app/(auth)/auth";

function SignOutButton() {
    return (
        <form
            className="w-full"
            action={async () => {
                'use server';
                await signOut();
            }}
        >
            <button type="submit" className="w-full text-left px-1 py-0.5 text-red-500 text-xs">
                Çıkış
            </button>
        </form>
    )
}

export default SignOutButton;