import { motion } from 'framer-motion';
import Link from 'next/link';

import { MessageIcon } from './icons';

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

                {/* <p>
                    Sunucuda <code className="rounded-md bg-muted px-1 py-0.5">streamText</code> fonksiyonunu ve istemcide{' '}
                    <code className="rounded-md bg-muted px-1 py-0.5">useChat</code> hook kullanarak kesintisiz bir sohbet deneyimi yaratır.
                </p> */}

                <p>
                    Bozok.org{' '}
                    <code className="rounded-md bg-muted/50 px-1 py-0.5 text-rose-950/85 font-medium">
                        Bozok Üniversitesi Yapay Zekâ Destekli Kurumsal İş Asistanı
                    </code>{' '}
                    projesinde, üniversite öğrencilerinin bilgi taleplerini karşılamak ve ihtiyaç duydukları bilgilere hızlı erişim sağlamak amacıyla
                    mobil uyumlu ve yapay zekâ destekli bir sohbet asistanı geliştirmeyi hedeflemektedir. Proje kapsamında, üniversiteye ait
                    yönetmelikler, mevzuatlar ve resmî belgeler dijital ortama aktarılacak ve bu belgelerdeki bilgiler üzerinden öğrenci soruları
                    yanıtlanacaktır. Geliştirilecek sistem, öğrenci işleri biriminin görevlerini destekleyici nitelikte olacak ve sıkça sorulan
                    sorulara doğru ve etkili yanıtlar sağlayacaktır. Ayrıca, Yozgat iline dair genel bilgiler ve belediye hizmetleriyle ilgili güncel
                    bilgilere de erişim sunulacaktır. Bu dijital asistan sayesinde, öğrenci işlerine ilişkin süreçler daha verimli hale getirilerek
                    hem öğrencilerin bilgiye ulaşması kolaylaştırılacak hem de iş yükü hafifletilecektir.
                </p>

                <p>
                    Bu proje <strong>TÜBİTAK–2209-A ÜNİVERSİTE ÖĞRENCİLERİ ARAŞTIRMA PROJELERİ DESTEĞİ PROGRAMI</strong> kapsamında{' '}
                    <span className="italic whitespace-nowrap">Bozok Üniversitesi Bilgisayar Mühendisliği</span> öğrencisi{' '}
                    <Link className="text-blue-950/75 hover:underline font-semibold" href="https://www.linkedin.com/in/anilcan-kara/" target="_blank">
                        Anılcan Kara
                    </Link>{' '}
                    tarafından{' '}
                    <Link
                        className="text-blue-950/75 hover:underline font-semibold"
                        href="https://akademik.yok.gov.tr/AkademikArama/AkademisyenGorevOgrenimBilgileri?islem=direct&authorId=4F6E5444F0EB180F"
                        target="_blank"
                    >
                        Dr. Çağrı Arısoy
                    </Link>{' '}
                    danışmanlığında oluşturulmuştur.
                </p>
            </div>
        </motion.div>
    );
};
