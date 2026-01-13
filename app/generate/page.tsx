"use client";

import { useState } from 'react';
import { Sparkles, Gift, User, Calendar, Heart, Wallet, Loader2, CheckCircle, ExternalLink, Flame, Laugh, CloudSun, Globe } from 'lucide-react';

// Backend'den artık bu formatta veri gelecek
interface Suggestion {
  message: string;     // Hikaye/Tavsiye metni
  searchTerm: string;  // Amazon için gizli arama terimi
}

type Mode = 'angel' | 'roast' | 'savage';
type Language = 'tr' | 'en';

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [mode, setMode] = useState<Mode>('angel');
  const [language, setLanguage] = useState<Language>('tr');
  
  // Form state'leri
  const [formData, setFormData] = useState({
    recipientName: '',
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
    // Basit validasyon
    if (!formData.recipientName || !formData.age || !formData.interests) {
      alert(language === 'tr' ? 'Lütfen en azından İsim, Yaş ve İlgi Alanlarını doldurun' : 'Please fill at least Name, Age and Interests');
      return;
    }
    
    setLoading(true);
    setSuggestions([]);
    
    try {
      const response = await fetch('/api/generate-gift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language,
          mode
        })
      });

      if (!response.ok) {
        throw new Error('Hediye önerileri alınamadı');
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
      
    } catch (error) {
      console.error('Hata:', error);
      alert(language === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Senin Tasarım Teman (Aynen Korundu)
  const themes = {
    angel: {
      bg: 'bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50',
      cardBg: 'bg-white',
      cardBorder: 'border-orange-200',
      cardHover: 'hover:border-orange-400',
      primaryColor: 'text-orange-600',
      buttonBg: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600',
      buttonText: 'text-white',
      shadow: 'shadow-orange-200',
      accentBg: 'bg-orange-100',
      accentBorder: 'border-orange-300',
      accentText: 'text-orange-700',
      resultBg: 'bg-white',
      resultBorder: 'border-orange-200',
      icon: CloudSun,
      emoji: '🥰'
    },
    roast: {
      bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
      cardBg: 'bg-slate-800',
      cardBorder: 'border-purple-500',
      cardHover: 'hover:border-green-400',
      primaryColor: 'text-green-400',
      buttonBg: 'bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700',
      buttonText: 'text-white',
      shadow: 'shadow-purple-900',
      accentBg: 'bg-purple-900/50',
      accentBorder: 'border-purple-500',
      accentText: 'text-green-400',
      resultBg: 'bg-slate-800',
      resultBorder: 'border-purple-500',
      icon: Laugh,
      emoji: '😏'
    },
    savage: {
      bg: 'bg-black',
      cardBg: 'bg-zinc-900',
      cardBorder: 'border-red-600',
      cardHover: 'hover:border-red-500',
      primaryColor: 'text-red-600',
      buttonBg: 'bg-gradient-to-r from-red-600 to-zinc-800 hover:from-red-700 hover:to-zinc-900',
      buttonText: 'text-white',
      shadow: 'shadow-red-900',
      accentBg: 'bg-red-950',
      accentBorder: 'border-red-600',
      accentText: 'text-red-500',
      resultBg: 'bg-zinc-900',
      resultBorder: 'border-red-600',
      icon: Flame,
      emoji: '🔥'
    }
  };

  const theme = themes[mode];
  const IconComponent = theme.icon;

  const translations = {
    tr: {
      title: 'Hediye Sihirbazı',
      subtitle: 'Kişiliğini seç, hediyeni bul',
      angelTitle: 'Melek Modu',
      angelDesc: 'Sevgi dolu ve düşünceli',
      roastTitle: 'Gaddar Modu',
      roastDesc: 'Esprili ve iğneleyici',
      savageTitle: 'Vahşet Modu',
      savageDesc: 'Acımasız ve filtresiz',
      recipientNameLabel: 'Hediye Alacak Kişinin Adı',
      recipientNamePlaceholder: 'Örn: Mehmet, Ayşe, Can',
      recipientLabel: 'Kimin için?',
      recipientPlaceholder: 'Örn: Annem, Sevgilim, Arkadaşım',
      ageLabel: 'Yaş',
      agePlaceholder: 'Örn: 25',
      occasionLabel: 'Özel Gün',
      occasionSelect: 'Seçiniz',
      occasionBirthday: 'Doğum Günü',
      occasionAnniversary: 'Yıldönümü',
      occasionNewYear: 'Yılbaşı',
      occasionJustBecause: 'İçimden Geldi',
      interestsLabel: 'İlgi Alanları & Hobiler',
      interestsPlaceholder: 'Kişinin hobilerini, sevdiği şeyleri detaylıca anlat...',
      budgetLabel: 'Bütçe Aralığı',
      budgetSelect: 'Seçiniz',
      buttonAngel: 'Hediye Bul',
      buttonRoast: 'Esprili Öner',
      buttonSavage: 'Yargıla ve Öner',
      loadingAngel: 'Sihir Yapılıyor...',
      loadingRoast: 'Espri Hazırlanıyor...',
      loadingSavage: 'Yargı Veriliyor...',
      infoText: 'Ne kadar detaylı bilgi verirsen, o kadar isabetli öneriler alırsın!',
      resultsReady: 'Hediye Önerileri Hazır!',
      resultsFor: 'için önerilerimiz:',
      amazonButton: "Amazon'da Gör"
    },
    en: {
      title: 'Gift Wizard',
      subtitle: 'Choose your personality, find your gift',
      angelTitle: 'Angel Mode',
      angelDesc: 'Loving and thoughtful',
      roastTitle: 'Roast Mode',
      roastDesc: 'Witty and sarcastic',
      savageTitle: 'Savage Mode',
      savageDesc: 'Ruthless and unfiltered',
      recipientNameLabel: "Recipient's Name",
      recipientNamePlaceholder: 'e.g: John, Jane, Alex',
      recipientLabel: 'For whom?',
      recipientPlaceholder: 'e.g: Mom, Partner, Friend',
      ageLabel: 'Age',
      agePlaceholder: 'e.g: 25',
      occasionLabel: 'Occasion',
      occasionSelect: 'Select',
      occasionBirthday: 'Birthday',
      occasionAnniversary: 'Anniversary',
      occasionNewYear: 'New Year',
      occasionJustBecause: 'Just Because',
      interestsLabel: 'Interests & Hobbies',
      interestsPlaceholder: "Describe their hobbies, things they love, interests in detail...",
      budgetLabel: 'Budget Range',
      budgetSelect: 'Select',
      buttonAngel: 'Find Gift',
      buttonRoast: 'Roast & Suggest',
      buttonSavage: 'Judge & Suggest',
      loadingAngel: 'Crafting Magic...',
      loadingRoast: 'Preparing Roast...',
      loadingSavage: 'Judging...',
      infoText: 'The more details you provide, the better suggestions you get!',
      resultsReady: 'Gift Suggestions Ready!',
      resultsFor: 'suggestions for',
      amazonButton: 'View on Amazon'
    }
  };

  const t = translations[language];

  return ( 
    <div className={`min-h-screen ${theme.bg} transition-all duration-700 py-12 px-4 font-sans`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Dil Seçimi */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            className={`flex items-center gap-2 px-4 py-2 ${theme.cardBg} ${theme.cardBorder} border rounded-lg ${mode === 'angel' ? 'text-slate-700' : 'text-white'} hover:scale-105 transition-all shadow-lg`}
          >
            <Globe className="w-4 h-4" />
            {language === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>

        {/* Başlık Alanı */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-3 transition-colors duration-500 ${mode === 'angel' ? 'bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent' : mode === 'roast' ? 'bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent' : 'text-red-600'}`}>
            {t.title}
          </h1>
          <p className={`${mode === 'angel' ? 'text-slate-600' : 'text-slate-300'} text-lg`}>
            {t.subtitle}
          </p>
        </div>

        {/* Mod Seçimi Kartları */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {(['angel', 'roast', 'savage'] as const).map((m) => (
             <button
             key={m}
             onClick={() => setMode(m)}
             className={`p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
               mode === m 
                 ? m === 'angel' ? 'bg-gradient-to-br from-orange-100 to-pink-100 border-orange-400 shadow-xl scale-105'
                 : m === 'roast' ? 'bg-gradient-to-br from-purple-900 to-slate-900 border-green-400 shadow-xl shadow-purple-500/50 scale-105'
                 : 'bg-gradient-to-br from-red-950 to-black border-red-600 shadow-xl shadow-red-900/50 scale-105'
                 : m === 'angel' ? 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-lg' 
                 : 'bg-zinc-900 border-zinc-700 hover:border-slate-500'
             }`}
           >
             <div className="text-4xl mb-3">
                {m === 'angel' ? '🥰' : m === 'roast' ? '😏' : '🔥'}
             </div>
             <h3 className={`font-bold text-lg mb-1 ${
                m === 'angel' ? 'text-orange-600' : 
                m === 'roast' ? (mode === 'roast' ? 'text-green-400' : 'text-purple-400') : 
                (mode === 'savage' ? 'text-red-500' : 'text-red-700')
             }`}>
               {m === 'angel' ? t.angelTitle : m === 'roast' ? t.roastTitle : t.savageTitle}
             </h3>
             <p className={`text-sm ${mode === 'angel' ? 'text-slate-600' : 'text-slate-400'}`}>
                {m === 'angel' ? t.angelDesc : m === 'roast' ? t.roastDesc : t.savageDesc}
             </p>
           </button>
          ))}
        </div>

        {/* Form Alanı */}
        <div className={`${theme.cardBg} rounded-2xl border-2 ${theme.cardBorder} p-8 shadow-2xl ${theme.shadow} transition-all duration-500 mb-8 backdrop-blur-sm`}>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${theme.primaryColor}`}>
                    <User className="w-4 h-4" />
                    {t.recipientNameLabel}
                </label>
                <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    placeholder={t.recipientNamePlaceholder}
                    className={`w-full px-4 py-3 ${mode === 'angel' ? 'bg-orange-50 border-orange-200 text-slate-900' : 'bg-black border-zinc-700 text-white'} border rounded-lg focus:outline-none focus:ring-2 ${mode === 'angel' ? 'focus:ring-orange-500' : mode === 'roast' ? 'focus:ring-green-500' : 'focus:ring-red-500'} transition-all placeholder:text-slate-500`}
                />
                </div>

                <div>
                <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${theme.primaryColor}`}>
                    <Heart className="w-4 h-4" />
                    {t.recipientLabel}
                </label>
                <input
                    type="text"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    placeholder={t.recipientPlaceholder}
                    className={`w-full px-4 py-3 ${mode === 'angel' ? 'bg-orange-50 border-orange-200 text-slate-900' : 'bg-black border-zinc-700 text-white'} border rounded-lg focus:outline-none focus:ring-2 ${mode === 'angel' ? 'focus:ring-orange-500' : mode === 'roast' ? 'focus:ring-green-500' : 'focus:ring-red-500'} transition-all placeholder:text-slate-500`}
                />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                 <div>
                    <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${theme.primaryColor}`}>
                        <Gift className="w-4 h-4" />
                        {t.ageLabel}
                    </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder={t.agePlaceholder}
                        className={`w-full px-4 py-3 ${mode === 'angel' ? 'bg-orange-50 border-orange-200 text-slate-900' : 'bg-black border-zinc-700 text-white'} border rounded-lg focus:outline-none focus:ring-2 ${mode === 'angel' ? 'focus:ring-orange-500' : mode === 'roast' ? 'focus:ring-green-500' : 'focus:ring-red-500'} transition-all placeholder:text-slate-500`}
                    />
                 </div>
                 
                 <div>
                    <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${theme.primaryColor}`}>
                        <Calendar className="w-4 h-4" />
                        {t.occasionLabel}
                    </label>
                    <select
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 ${mode === 'angel' ? 'bg-orange-50 border-orange-200 text-slate-900' : 'bg-black border-zinc-700 text-white'} border rounded-lg focus:outline-none focus:ring-2 ${mode === 'angel' ? 'focus:ring-orange-500' : mode === 'roast' ? 'focus:ring-green-500' : 'focus:ring-red-500'} transition-all appearance-none cursor-pointer`}
                    >
                        <option value="">{t.occasionSelect}</option>
                        <option value="dogum-gunu">{t.occasionBirthday}</option>
                        <option value="yildonumu">{t.occasionAnniversary}</option>
                        <option value="yilbasi">{t.occasionNewYear}</option>
                        <option value="icimden-geldi">{t.occasionJustBecause}</option>
                    </select>
                 </div>

                 <div>
                    <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${theme.primaryColor}`}>
                        <Wallet className="w-4 h-4" />
                        {t.budgetLabel}
                    </label>
                    <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 ${mode === 'angel' ? 'bg-orange-50 border-orange-200 text-slate-900' : 'bg-black border-zinc-700 text-white'} border rounded-lg focus:outline-none focus:ring-2 ${mode === 'angel' ? 'focus:ring-orange-500' : mode === 'roast' ? 'focus:ring-green-500' : 'focus:ring-red-500'} transition-all appearance-none cursor-pointer`}
                    >
                        <option value="">{t.budgetSelect}</option>
                        <option value="0-500">0 - 500 TL</option>
                        <option value="500-1500">500 - 1500 TL</option>
                        <option value="1500-3000">1500 - 3000 TL</option>
                        <option value="3000+">3000+ TL</option>
                    </select>
                 </div>
            </div>

            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${theme.primaryColor}`}>
                <Sparkles className="w-4 h-4" />
                {t.interestsLabel}
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder={t.interestsPlaceholder}
                rows={4}
                className={`w-full px-4 py-3 ${mode === 'angel' ? 'bg-orange-50 border-orange-200 text-slate-900' : 'bg-black border-zinc-700 text-white'} border rounded-lg focus:outline-none focus:ring-2 ${mode === 'angel' ? 'focus:ring-orange-500' : mode === 'roast' ? 'focus:ring-green-500' : 'focus:ring-red-500'} transition-all resize-none placeholder:text-slate-500`}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-bold ${theme.buttonBg} ${theme.buttonText} rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {mode === 'angel' ? t.loadingAngel : mode === 'roast' ? t.loadingRoast : t.loadingSavage}
                </>
              ) : (
                <>
                  <IconComponent className="w-5 h-5" />
                  {mode === 'angel' ? t.buttonAngel : mode === 'roast' ? t.buttonRoast : t.buttonSavage}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bilgi Kutusu */}
        <div className={`mb-8 p-4 ${theme.accentBg} border ${theme.accentBorder} rounded-lg transition-all duration-500`}>
          <p className={`text-sm ${theme.accentText} text-center font-medium`}>
            {theme.emoji} {t.infoText}
          </p>
         </div>

        {/* SONUÇLAR (Yeni Sohbet Formatı) */}
        {suggestions.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.accentBg} border ${theme.accentBorder} mb-4`}>
                <CheckCircle className={`w-4 h-4 ${theme.accentText}`} />
                <span className={`text-sm ${theme.accentText} font-medium`}>{t.resultsReady}</span>
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${mode === 'angel' ? 'text-slate-800' : 'text-white'}`}>
                {formData.recipientName} {t.resultsFor}
              </h2>
             </div>

            <div className="grid gap-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`${theme.resultBg} rounded-xl border-2 ${theme.resultBorder} p-6 ${theme.cardHover} transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-start gap-4">
                    {/* Profil Resmi / İkon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${mode === 'angel' ? 'bg-orange-500' : mode === 'roast' ? 'bg-purple-600' : 'bg-red-700'} flex items-center justify-center text-white text-2xl shadow-md border-2 border-white/20`}>
                       {mode === 'angel' ? '🤖' : mode === 'roast' ? '😈' : '💀'}
                    </div>
                    
                    <div className="flex-1">
                      {/* Sohbet Metni */}
                      <p className={`text-lg leading-relaxed mb-4 ${mode === 'angel' ? 'text-slate-700' : 'text-slate-200'}`}>
                        {suggestion.message}
                      </p>
                      
                      {/* Ürün Link Butonu */}
                      <div className="flex justify-end">
                        <a
                           href={`https://www.amazon.com.tr/s?k=${encodeURIComponent(suggestion.searchTerm)}&tag=giftgenius002-21`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 no-underline ${
                             mode === 'savage' 
                               ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-red-900/30' 
                               : mode === 'roast'
                               ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-900/30'
                               : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/30'
                           }`}
                         >
                           <ExternalLink className="w-4 h-4" />
                           {t.amazonButton}
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