import Link from 'next/link';

import { auth } from '@/app/(auth)/auth';

import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { History } from './history';
import SignOutButton from './sign-out-button';
import { ThemeToggle } from './theme-toggle';

export const Navbar = async () => {
    let session = await auth();

    return (
        <div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
            <div className="flex flex-row gap-3 items-center">
                <History user={session?.user} />
                <div className="flex flex-row gap-2 items-center">
                    <div className="sm:hidden text-sm dark:text-zinc-300">Bozok AI</div>
                    <div className="hidden sm:block text-sm dark:text-zinc-300">Bozok Üniversitesi Yapay Zekâ Destekli Kurumsal İş Asistanı</div>
                </div>
            </div>

            {session ? (
                <div className='flex gap-2 justify-center items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="py-1.5 px-2 h-fit font-normal" variant="secondary">
                                {session.user?.email}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <ThemeToggle />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <SignOutButton />
                </div>
            ) : (
                <Button className="py-1.5 px-2 h-fit font-normal" asChild>
                    <Link href="/login">Giriş Yap</Link>
                </Button>
            )}
        </div>
    );
};
