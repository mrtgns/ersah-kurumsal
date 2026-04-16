import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        {/* Footer Buraya Gelecek */}
        <footer className="bg-primary text-white py-10 text-center">
          <p>© 2026 Ersah Kurumsal. Tüm Hakları Saklıdır.</p>
        </footer>
      </body>
    </html>
  );
}