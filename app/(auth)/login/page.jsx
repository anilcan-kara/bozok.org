'use client';

import { useReCaptcha } from 'next-recaptcha-v3';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/custom/auth-form';
import { Overview } from '@/components/custom/overview';
import { SubmitButton } from '@/components/custom/submit-button';

import { login } from '../actions';

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [state, formAction] = useActionState(login, { status: 'idle' });
    const { executeRecaptcha } = useReCaptcha();

    const handleSubmit = useCallback(async (e) => {
        const form = e.target

        let input = form.querySelector('input[name="recaptcha"]');
        if (input?.value) return;

        e.preventDefault();

        input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'recaptcha';
        input.value = await executeRecaptcha("form_submit");

        form.appendChild(input);
        form.requestSubmit();
    }, [executeRecaptcha]);

    const handleAction = (formData) => {
        setEmail(formData.get('email'));
        formAction(formData);
    }

    useEffect(() => {
        if (state.status === 'failed') {
            toast.error('Geçersiz kimlik bilgileri!');
        } else if (state.status === 'invalid_data') {
            toast.error('Gönderiminizi doğrularken hata oluştu!');
        } else if (state.status === 'success') {
            router.refresh();
        }
    }, [state.status, router]);

    return (
        <div className="flex flex-col gap-8 md:flex-row md:gap-0 h-full md:h-screen w-screen items-center justify-center bg-background overflow-y-scroll md:overflow-hidden">
            <Overview />

            <div className="w-full min-w-96 max-w-md overflow-hidden rounded-2xl flex flex-col gap-12 min-h-min pb-16 md:pb-0">
                <div className="flex flex-col items-center justify-center gap-2 px-4 text-center md:px-16">
                    <h3 className="text-xl font-semibold dark:text-zinc-50">Giriş Yap</h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">Giriş yapmak için e-posta ve şifrenizi kullanın</p>
                </div>

                <AuthForm action={handleAction} onSubmit={handleSubmit} defaultEmail={email}>
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
