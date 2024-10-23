'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/custom/auth-form';
import { SubmitButton } from '@/components/custom/submit-button';

import { register } from '../actions';

export default function Page() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [state, formAction] = useActionState(register, { status: 'idle' });

    useEffect(() => {
        if (state.status === 'user_exists') {
            toast.error('Hesap zaten mevcut');
        } else if (state.status === 'failed') {
            toast.error('Hesap oluşturulamadı');
        } else if (state.status === 'invalid_data') {
            toast.error('Gönderiminiz doğrulanamadı!');
        } else if (state.status === 'success') {
            toast.success('Hesap başarıyla oluşturuldu');
            router.refresh();
        }
    }, [state, router]);

    const handleSubmit = (formData) => {
        setEmail(formData.get('email'));
        formAction(formData);
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
                <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
                    <h3 className="text-xl font-semibold dark:text-zinc-50">Kayıt Ol</h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">E-posta ve şifrenizle bir hesap oluşturun</p>
                </div>

                <AuthForm action={handleSubmit} defaultEmail={email}>
                    <SubmitButton>Kayıt Ol</SubmitButton>

                    <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
                        {'Zaten bir hesabınız var mı? '}

                        {'O halde '}

                        <Link href="/login" className="font-semibold text-gray-800 hover:underline dark:text-zinc-200">
                            Giriş yapın
                        </Link>
                    </p>
                </AuthForm>
            </div>
        </div>
    );
}
