'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/custom/auth-form';
import { Overview } from '@/components/custom/overview';
import { SubmitButton } from '@/components/custom/submit-button';

import { login } from '../actions';

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [state, formAction] = useActionState(login, { status: 'idle' });

    useEffect(() => {
        if (state.status === 'failed') {
            toast.error('Geçersiz kimlik bilgileri!');
        } else if (state.status === 'invalid_data') {
            toast.error('Gönderiminizi doğrularken hata oluştu!');
        } else if (state.status === 'success') {
            router.refresh();
        }
    }, [state.status, router]);

    const handleSubmit = (formData) => {
        setEmail(formData.get('email'));
        formAction(formData);
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <Overview />

            <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
                <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
                    <h3 className="text-xl font-semibold dark:text-zinc-50">Giriş Yap</h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">Giriş yapmak için e-posta ve şifrenizi kullanın</p>
                </div>

                <AuthForm action={handleSubmit} defaultEmail={email}>
                    <SubmitButton>Giriş yap</SubmitButton>
                    <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
                        {'Hesabınız yok mu? '}

                        {'Ücretsiz '}

                        <Link href="/register" className="font-semibold text-gray-800 hover:underline dark:text-zinc-200">
                            Kaydolun
                        </Link>
                    </p>
                </AuthForm>
            </div>
        </div>
    );
}
