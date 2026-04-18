"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton"; // Butonu içe aktardık

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Yönetim panelinde bunları gösterme
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      
      <main className="grow">
        {children}
      </main>

      {/* Sabit WhatsApp Butonu */}
      <WhatsAppButton />

      <Footer />
    </div>
  );
}