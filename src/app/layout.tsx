import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper"; // Yeni kontrolcümüzü çağırdık

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ersah Kurumsal | İş Elbiseleri ve Kurumsal Çözümler",
  description: "Kaliteli ve dayanıklı iş elbiseleri, polar, mont ve kurumsal kıyafet çözümleri. Ersah Kurumsal ile firmanıza özel teklif alın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* Tüm sayfaları kontrolcümüzün içine sardık */}
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}