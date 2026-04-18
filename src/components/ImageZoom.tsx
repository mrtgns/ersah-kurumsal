"use client";

import Image from "next/image";
import { useState, useRef } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
}

export default function ImageZoom({ src, alt }: ImageZoomProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    // Resmin ekrandaki konumunu ve boyutlarını alıyoruz
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    
    // Farenin resim üzerindeki X ve Y koordinatlarını % (yüzde) olarak hesaplıyoruz
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div 
      className="relative w-full h-full cursor-zoom-in bg-white"
      ref={imageRef}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      {/* 1. Altta duran normal resmimiz */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-4"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      {/* 2. Fare üzerine gelince beliren büyütülmüş katman */}
      {showZoom && (
        <div 
          // md:block diyerek bunu sadece bilgisayarlarda çalıştırıyoruz. Telefondaki dokunmatik ekranda "üzerine gelme" mantığı olmadığı için sorun yaratmasını engelliyoruz.
          className="absolute inset-0 pointer-events-none hidden md:block bg-white z-10" 
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: '250%', // Yakınlaştırma oranı (Bunu 300% yaparak daha da büyütebilirsin)
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
}