import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Request body'den form verilerini al
    const body = await request.json();
    const { age, recipient, occasion, interests, budget } = body;

    // Validasyon
    if (!age || !recipient || !occasion || !interests || !budget) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir.' },
        { status: 400 }
      );
    }

    // Console'a gelen verileri yazdır (debug için)
    console.log('API - Gelen Form Verileri:', {
      age,
      recipient,
      occasion,
      interests,
      budget
    });

    // Özel gün çevirisi
    const occasionMap: Record<string, string> = {
      'dogum-gunu': 'Doğum Günü',
      'yildonumu': 'Yıldönümü',
      'yilbasi': 'Yılbaşı',
      'icimden-geldi': 'İçimden Geldi'
    };

    const occasionText = occasionMap[occasion] || occasion;

    // OpenAI API çağrısı
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Sen dünyanın en iyi hediye danışmanısın. Türkiye'deki alışveriş kültürünü ve ürün çeşitliliğini iyi biliyorsun. Cevaplarını sadece geçerli bir JSON objesi olarak ver. Her hediye önerisi yaratıcı, düşünceli ve kişiye özel olmalı."
        },
        {
          role: "user",
          content: `Bana şu kişi için 5 tane yaratıcı ve kişiye özel hediye önerisi ver:

Kimin için: ${recipient}
Yaş: ${age}
Özel Gün: ${occasionText}
İlgi Alanları ve Hobiler: ${interests}
Bütçe Aralığı: ${budget} TL

Lütfen cevabını şu JSON formatında döndür:
{
  "suggestions": [
    {
      "name": "Hediye Adı",
      "reason": "Bu hediyenin neden bu kişi için mükemmel olduğunu açıklayan detaylı ve samimi bir açıklama"
    }
  ]
}

Her hediye önerisi:
- Kişinin ilgi alanlarına uygun olmalı
- Belirtilen bütçe aralığında olmalı
- Yaratıcı ve düşünceli olmalı
- Türkiye'de bulunabilir olmalı
- Her önerinin açıklaması en az 2 cümle olmalı`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    // OpenAI cevabını al ve parse et
    const responseContent = completion.choices[0].message.content;
    
    if (!responseContent) {
      throw new Error('OpenAI\'dan boş cevap geldi');
    }

    const parsedResponse = JSON.parse(responseContent);

    // Başarılı cevap döndür
    return NextResponse.json(parsedResponse, { status: 200 });

  } catch (error) {
    console.error('API Hatası (Demo Modu Devrede):', error);
    
    // FAIL-SAFE: OpenAI hatası olursa demo verileri döndür
    const demoSuggestions = {
      suggestions: [
        {
          name: "Kablosuz Kulaklık - Sony WH-1000XM5",
          reason: "Müzik dinlemeyi seven biri için gürültü önleyici teknolojiye sahip premium bir seçenek. Günlük kullanımda mükemmel ses kalitesi ve konfor sunacak. ⚠️ Not: OpenAI API kotası aşıldığı için bu demo verileridir."
        },
        {
          name: "Özel Tasarım Kupa ve Kahve Seti",
          reason: "Kahve severlerin favorisi! Kişiselleştirilebilir kupanın yanında dünya kahveleri koleksiyonu ile her sabah özel hissettirecek bir hediye."
        },
        {
          name: "E-Kitap Okuyucu - Kindle Paperwhite",
          reason: "Kitap tutkunları için ideal! Binlerce kitabı yanında taşıyabilecek, göz yormayan ekranıyla uzun saatler okuma keyfi sunacak."
        }
      ]
    };

    // Demo verilerini başarılı olarak döndür
    return NextResponse.json(demoSuggestions, { status: 200 });
  }
}