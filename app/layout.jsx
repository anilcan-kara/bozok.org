import { Toaster } from 'sonner';

import { Navbar } from '@/components/custom/navbar';
import { ThemeProvider } from '@/components/custom/theme-provider';

import './globals.css';

export const metadata = {
    metadataBase: new URL('https://bozok.org'),
    title: 'YZ İş Asistanı - Bozok Üniversitesi',
    description: 'YZ İş Asistanı - Bozok Üniversitesi',
};

export default async function RootLayout({ children }) {
    return (
        <html lang="tr" className="light" style={{ colorScheme: 'light' }}>
            <body className="antialiased">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Toaster position="top-center" />
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
