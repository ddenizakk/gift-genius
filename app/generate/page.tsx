"use client";

import { useState } from 'react';
import { Sparkles, Gift, User, Calendar, Heart, Wallet, Loader2, CheckCircle, ExternalLink } from 'lucide-react';

interface Suggestion {
  name: string;
  reason: string;
}

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [formData, setFormData] = useState({
    recipient: '',
    age: '',
    occasion: '',
    interests: '',
    budget: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.recipient || !formData.age || !formData.occasion || !formData.interests || !formData.budget) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    setLoading(true);
    setSuggestions([]); // Önceki önerileri temizle

    try {
      const response = await fetch('/api/generate-gift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Hediye önerileri alınamadı');
      }

      const data = await response.json();
      setSuggestions(data.suggestions);

    } catch (error) {
      console.error('Hata:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleAmazonSearch = (giftName: string) => {
    const searchQuery = encodeURIComponent(giftName);
    window.open(`https://www.amazon.com.tr/s?k=${searchQuery}&tag=giftgenius002-21`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">AI Destekli</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Hediye Sihirbazı
          </h1>
          <p className="text-slate-400">
            Formu doldur, yapay zeka senin için mükemmel hediye fikirlerini bulsun
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-xl mb-8">
          <div className="space-y-6">
            {/* Kimin için */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User className="w-4 h-4 text-emerald-400" />
                Kimin için?
              </label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="Örn: Annem, Sevgilim, Arkadaşım"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Yaş */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Gift className="w-4 h-4 text-purple-400" />
                Yaş
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Örn: 25"
                min="1"
                max="120"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Durum/Özel Gün */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Durum / Özel Gün
              </label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">Seçiniz</option>
                <option value="dogum-gunu">Doğum Günü</option>
                <option value="yildonumu">Yıldönümü</option>
                <option value="yilbasi">Yılbaşı</option>
                <option value="icimden-geldi">İçimden Geldi</option>
              </select>
            </div>

            {/* İlgi Alanları */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Heart className="w-4 h-4 text-pink-400" />
                İlgi Alanları & Hobiler
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Kişinin hobilerini, sevdiği şeyleri, ilgi alanlarını detaylıca anlat..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none placeholder:text-slate-500"
              />
            </div>

            {/* Bütçe Aralığı */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Wallet className="w-4 h-4 text-yellow-400" />
                Bütçe Aralığı
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">Seçiniz</option>
                <option value="0-500">0 - 500 TL</option>
                <option value="500-1500">500 - 1500 TL</option>
                <option value="1500-3000">1500 - 3000 TL</option>
                <option value="3000+">3000+ TL</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-slate-900 bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 disabled:hover:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sihir Yapılıyor...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Hediye Fikirlerini Üret
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mb-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <p className="text-sm text-slate-400 text-center">
            💡 Ne kadar detaylı bilgi verirsen, o kadar isabetli öneriler alırsın!
          </p>
        </div>

        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-medium">Hediye Önerileri Hazır!</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Senin İçin Seçtiklerimiz
              </h2>
              <p className="text-slate-400">
                İşte {formData.recipient} için en uygun hediye fikirleri
              </p>
            </div>

            <div className="grid gap-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="group bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {suggestion.name}
                      </h3>
                      <p className="text-slate-400 leading-relaxed mb-4">
                        {suggestion.reason}
                      </p>
                      <div className="flex justify-end">
                        <a
                          href={`https://www.amazon.com.tr/s?k=${encodeURIComponent(suggestion.name)}&tag=giftgenius002-21`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Amazon'da Gör
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}