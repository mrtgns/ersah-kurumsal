import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
export default function Home() {
  const categories = [
    { name: 'İş Polarları', slug: 'is-polarlari', icon: '❄️' },
    { name: 'İş Montları', slug: 'is-montlari', icon: '🧥' },
    { name: 'T-Shirt & Sweat', slug: 'tshirt-sweat', icon: '👕' },
    { name: 'İş Pantolonları', slug: 'is-pantolonlari', icon: '👖' },
  ];

  return (
    <div>
      <HeroSlider />
      {/* Hero Section */}
      <section className="relative bg-primary py-20 lg:py-32 overflow-hidden">
        {/* Arka plan süslemesi */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Kurumsal Kimliğinizi <br />
              <span className="text-secondary">Kaliteyle Giydirin</span>
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-2xl">
              Erşah Kurumsal olarak; dayanıklı, modern ve firmanıza özel logolu iş elbiseleri üretiyoruz. Toptan siparişleriniz için en uygun fiyat ve yüksek kalite garantisi.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link 
                href="/urunler" 
                className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all text-center min-w-[180px]"
              >
                Kataloğu İncele
              </Link>
              <Link 
                href="https://wa.me/905XXXXXXXXX" 
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-bold hover:bg-secondary hover:text-white transition-all text-center min-w-[180px]"
              >
                Hızlı Teklif Al
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kategoriler Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Ürün Gruplarımız</h2>
            <p className="text-gray-600 mt-2">İhtiyacınıza uygun iş elbiselerini keşfedin</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/urunler/${cat.slug}`}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-2">Modelleri Gör &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}