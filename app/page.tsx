import Link from 'next/link';
import { Sparkles, Search, Gift, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-emerald-500" />
              <span className="text-xl font-bold">GiftGenius</span>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Giriş Yap
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Yapay Zeka Destekli</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Yapay Zeka ile
              <span className="block bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                En Doğru Hediyeyi Bul
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Kimi mutlu etmek istiyorsun? Bize anlat, nokta atışı öneriler sunalım.
            </p>
            
            <Link href="/generate">
              <button className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-slate-900 bg-emerald-500 rounded-full hover:bg-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105">
                Hediye Bulmaya Başla
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kişiyi Tarif Et</h3>
              <p className="text-slate-400 leading-relaxed">
                Hediye alacağın kişinin ilgi alanlarını, hobilerini ve özelliklerini bize anlat.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analiz Etsin</h3>
              <p className="text-slate-400 leading-relaxed">
                Yapay zeka teknolojimiz kişiye özel hediye seçeneklerini analiz eder.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">En İyi Hediyeyi Seç</h3>
              <p className="text-slate-400 leading-relaxed">
                Önerilen hediyeler arasından en uygun olanı seç ve sevdiklerini mutlu et.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm">
            © 2024 GiftGenius. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}