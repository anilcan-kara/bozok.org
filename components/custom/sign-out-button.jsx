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
            <button type="submit" className="w-full text-left px-2 py-1.75 active:text-red-500 text-xs bg-gray-200/60 rounded-md hover:bg-gray-200 active:bg-gray-100 cursor-pointer">
                Çıkış
            </button>
        </form>
    )
}

export default SignOutButton;