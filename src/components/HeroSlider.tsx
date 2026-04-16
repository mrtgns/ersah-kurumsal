'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

// Swiper stillerini import ediyoruz
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: '/img/slider/polar.jpg', // Bu resimleri public/img/slider içine atmalısın
      link: '/urunler/is-polarlari',
      title: 'Kaliteli İş Polarları'
    },
    {
      id: 2,
      image: '/img/slider/mont.jpg',
      link: '/urunler/is-montlari',
      title: 'Dayanıklı İş Montları'
    },
    {
      id: 3,
      image: '/img/slider/yelek.jpg',
      link: '/urunler/is-yelekleri',
      title: 'Fonksiyonel Yelekler'
    }
  ];

  return (
    <section className="w-full bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="rounded-xl overflow-hidden shadow-lg aspect-[10/4]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link href={slide.link}>
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSlider;