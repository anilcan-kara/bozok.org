'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import cx from 'classnames';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

import { fetcher, getTitleFromChat } from '@/lib/utils';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { InfoIcon, MenuIcon, MoreHorizontalIcon, PencilEditIcon, TrashIcon } from './icons';

export const History = ({ user }) => {
    const { id } = useParams();
    const pathname = usePathname();

    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const {
        data: history,
        isLoading,
        mutate,
    } = useSWR(user ? '/api/history' : null, fetcher, {
        fallbackData: [],
    });

    useEffect(() => {
        mutate();
    }, [pathname, mutate]);

    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = async () => {
        const deletePromise = fetch(`/api/chat?id=${deleteId}`, {
            method: 'DELETE',
        });

        toast.promise(deletePromise, {
            loading: 'Sohbet siliniyor...',
            success: () => {
                mutate((history) => {
                    if (history) {
                        return history.filter((h) => h.id !== id);
                    }
                });
                return 'Sohbet başarıyla silindi';
            },
            error: 'Sohbet silinemedi',
        });

        setShowDeleteDialog(false);
    };

    return (
        <>
            <Button
                variant="outline"
                className="p-1.5 h-fit"
                onClick={() => {
                    setIsHistoryVisible(true);
                }}
            >
                <MenuIcon />
            </Button>

            <Sheet
                open={isHistoryVisible}
                onOpenChange={(state) => {
                    setIsHistoryVisible(state);
                }}
            >
                <SheetContent side="left" className="p-3 w-80 bg-muted">
                    <SheetHeader>
                        <VisuallyHidden.Root>
                            <SheetTitle className="text-left">Geçmiş</SheetTitle>
                            <SheetDescription className="text-left">{history === undefined ? 'yükleniyor' : history.length} konuşma</SheetDescription>
                        </VisuallyHidden.Root>
                    </SheetHeader>

                    <div className="text-sm flex flex-row items-center justify-between">
                        <div className="flex flex-row gap-2">
                            <div className="dark:text-zinc-300">Geçmiş</div>

                            <div className="dark:text-zinc-400 text-zinc-500">{history === undefined ? 'yükleniyor' : history.length} konuşma</div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col">
                        {user && (
                            <Button className="font-normal text-sm flex flex-row justify-between" asChild>
                                <Link href="/">
                                    <div>Yeni bir sohbet başlat</div>
                                    <PencilEditIcon size={14} />
                                </Link>
                            </Button>
                        )}

                        <div className="flex flex-col overflow-y-scroll p-1 h-[calc(100dvh-124px)]">
                            {!user ? (
                                <div className="text-zinc-500 h-dvh w-full flex flex-row justify-center items-center text-sm gap-2">
                                    <InfoIcon />
                                    <div>Önceki sohbetleri kaydetmek ve tekrar ziyaret etmek için giriş yapın!</div>
                                </div>
                            ) : null}

                            {!isLoading && history?.length === 0 && user ? (
                                <div className="text-zinc-500 h-dvh w-full flex flex-row justify-center items-center text-sm gap-2">
                                    <InfoIcon />
                                    <div>Sohbet bulunamadı</div>
                                </div>
                            ) : null}

                            {isLoading && user ? (
                                <div className="flex flex-col">
                                    {[44, 32, 28, 52].map((item) => (
                                        <div key={item} className="p-2 my-[2px]">
                                            <div className={`w-${item} h-[20px] rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse`} />
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            {history &&
                                history.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={cx('flex flex-row items-center gap-6 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md pr-2', {
                                            'bg-zinc-200 dark:bg-zinc-700': chat.id === id,
                                        })}
                                    >
                                        <Button
                                            variant="ghost"
                                            className={cx(
                                                'hover:bg-zinc-200 dark:hover:bg-zinc-700 justify-between p-0 text-sm font-normal flex flex-row items-center gap-2 pr-2 w-full transition-none'
                                            )}
                                            asChild
                                        >
                                            <Link
                                                href={`/chat/${chat.id}`}
                                                className="text-ellipsis overflow-hidden text-left py-2 pl-2 rounded-lg outline-zinc-900"
                                            >
                                                {getTitleFromChat(chat)}
                                            </Link>
                                        </Button>

                                        <DropdownMenu modal={true}>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    className="p-0 h-fit font-normal text-zinc-500 transition-none hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontalIcon />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="left" className="z-[60]">
                                                <DropdownMenuItem asChild>
                                                    <Button
                                                        className="flex flex-row gap-2 items-center justify-start w-full h-fit font-normal p-1.5 rounded-sm"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            setDeleteId(chat.id);
                                                            setShowDeleteDialog(true);
                                                        }}
                                                    >
                                                        <TrashIcon />
                                                        <div>Sil</div>
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Gerçekten emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu işlem geri alınamaz. Bu, sohbetinizi kalıcı olarak silecek ve sunucularımızdan kaldıracaktır.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Devam et</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

History.propTypes = {
    user: PropTypes.object,
};
