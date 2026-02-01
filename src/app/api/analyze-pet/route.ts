import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export type PetAnalysisResult = {
  ageMonths?: number;
  ageDays?: number;
  weightKg?: number;
  foodGramsPerDay?: number;
  feedingTimesPerDay?: number;
  petType?: string;
  breed?: string;
  recommendations?: string;
};

function getMockAnalysis(): PetAnalysisResult {
  return {
    ageMonths: 12,
    ageDays: 15,
    weightKg: 8.5,
    foodGramsPerDay: 170,
    feedingTimesPerDay: 2,
    petType: "Нохой",
    breed: "Үлдэр тодорхойгүй",
    recommendations:
      "OPENAI_API_KEY тохируулаагүй бол demo үр дүн харуулна. .env.local дээр OPENAI_API_KEY нэмээд дахин оролдоно уу.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64 } = body as { imageBase64?: string };

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Зураг байхгүй байна" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(getMockAnalysis());
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Энэ амьтны зураг дээр үндэслэн дараах мэдээллийг JSON хэлбэрээр буцаана уу. Хэрэв зургаас тодорхой харагдахгүй бол тооцоолсон утга өгнө үү.

{
  "ageMonths": тоо (нас сараар),
  "ageDays": тоо (нэмэлт өдрөөр, 0-30),
  "weightKg": тоо (жинг кг-аар),
  "foodGramsPerDay": тоо (өдөрт хэрэгтэй хоол граммаар),
  "feedingTimesPerDay": тоо (өдөрт хэдэн удаа хооллох),
  "petType": "Нохой" | "Муур" | "Бусад",
  "breed": үүлдрийн нэр эсвэл "Тодорхойгүй",
  "recommendations": богино зөвлөмж монгол хэлээр
}

Зөвхөн JSON буцаана, ямар ч өөр текст бичихгүй.`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64.startsWith("data:")
                  ? imageBase64
                  : `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(getMockAnalysis());
    }

    const jsonStr = content.replace(/^```json?\s*|\s*```$/g, "").trim();
    const parsed = JSON.parse(jsonStr) as PetAnalysisResult;
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("analyze-pet error:", err);
    return NextResponse.json(getMockAnalysis());
  }
}
