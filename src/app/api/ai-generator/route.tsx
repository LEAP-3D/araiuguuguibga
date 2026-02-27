import { NextResponse } from 'next/server';
// Төрлүүдийг тусад нь импортлох
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key тохируулаагүй байна' }, { status: 500 });
    }

    if (!imageBase64) {
      return NextResponse.json({ error: 'Зураг олдсонгүй' }, { status: 400 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Pet Analysis App',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-001',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Та бол амьтны эрүүл мэнд, хооллолтын мэргэжлийн зөвлөх юм. 
Зургийг шинжлээд дараах JSON бүтцээр хариу өгнө үү. 

АНХААР: 
1. "breed" талбарт нохойн үүлдрийн нэрийг заавал АНГЛИ хэлээр бичнэ.
2. Хэрэв цэвэр үүлдэр биш байсан ч хамгийн ойр төстэй үүлдэрийг нь заавал тодорхойл (Жишээ нь: German Shepherd Mix). Зүгээр л "Mixed Breed" гэж бичихээс аль болох татгалз.
3. Бусад бүх тайлбарыг МӨРӨӨР нь биш, хоорондоо уялдаатай, зөв монгол найруулгаар бич.
4. Тоо болон граммыг бодитоор тооцоол.

{
  "general": {
    "breed": "үүлдэр",
    "age": "нас",
    "weight": "жин",
   "foodGramsPerDay": "тоо (өдөрт идэх нийт грамм)",
    "feedingTimesPerDay": "тоо (өдөрт хэдэн удаа хооллох)",
    "foodType": "ямар төрлийн хоол (нойтон/хуурай) болон яагаад энэ хоолыг өгөх нь зөв бэ гэдгийг тайлбарла",
    "forbiddenFoods": "хориглох зүйлс"
  },
  "care": {
    "neutering": "хэдэн сартайд заслага хийх",
    "bathing": "усанд орох давтамж, хэрэглэх бүтээгдэхүүн",
    "nails": "хумс авах заавар, давтамж"
  },
  "recommendations": {
    "vaccines": "заавал хийлгэх вакцинууд",
    "deworming": "туулга өгөх давтамж, заавар",
    "extraTips": "ерөнхий зөвлөмж"
  }
All text must be Mongolian.`,
              },
              {
                type: 'image_url',
                image_url: { url: imageBase64 },
              },
            ],
          },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    // content-ийг const болгов
    const content = data.choices[0].message.content as string;
    const jsonStr = content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      let parsedData = JSON.parse(jsonStr);
      if (Array.isArray(parsedData)) {
        parsedData = parsedData[0];
      }
      return NextResponse.json(parsedData);
    } catch {
      // parseError-ийг ашиглаагүй тул устгав
      return NextResponse.json({ error: 'AI-ийн хариуг боловсруулахад алдаа гарлаа' }, { status: 500 });
    }
  } catch (err) {
    // any-г арилгаж, алдааг handle хийх
    const errorMessage = err instanceof Error ? err.message : 'Тодорхойгүй алдаа гарлаа';
    console.error('Server Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
