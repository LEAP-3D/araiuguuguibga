import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export type PetAnalysisResult = {
  petType: string;
  breed: string;
  estimatedAge: string;
  careGuide: string;
  recommendedFood: string;
  forbiddenFood: string;
  vaccineAdvice: string;
};

function jsonError(message: string, extra?: unknown, status = 500) {
  return NextResponse.json(
    { error: message, ...(extra ? { extra } : {}) },
    { status }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { imageBase64?: string };
    const imageBase64 = body.imageBase64;

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return jsonError("imageBase64 байхгүй байна", undefined, 400);
    }

    const apiKey = process.env.HF_TOKEN;
    if (!apiKey) return jsonError("HF_TOKEN тохируулаагүй байна (.env.local)");

    const hfRouter = new OpenAI({
      apiKey,
      baseURL: "https://router.huggingface.co/v1",
    });

    const imageUrl = imageBase64.startsWith("data:")
      ? imageBase64
      : `data:image/jpeg;base64,${imageBase64}`;

    const prompt = `
Энэ амьтны зураг дээр үндэслэн дараах мэдээллийг JSON хэлбэрээр буцаана уу.

{
  "petType": "ямар амьтан (жишээ: Нохой, Муур, Шувуу)",
  "breed": "Үүлдэр (тодорхойгүй бол 'Тодорхойгүй')",
  "estimatedAge": "Ойролцоогоор хэдэн настай",
  "careGuide": "Арчлах дэлгэрэнгүй зөвлөгөө",
  "recommendedFood": "Ямар хоол өгөх хэрэгтэй",
  "forbiddenFood": "Ямар хоол өгч болохгүй",
  "vaccineAdvice": "Вакцин хийлгэх шаардлагатай эсэх, зөвлөмж"
}

ЗӨВХӨН JSON буцаана. Өөр тайлбар бичихгүй.
`.trim();

    const response = await hfRouter.chat.completions.create({
      model: "CohereLabs/aya-vision-32b:cohere",
      max_tokens: 700,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content ?? "";
    if (!content) return jsonError("AI хариу өгөөгүй");

    // ✅ 1) ```json ... ``` арилгана
    const cleaned = content
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    // ✅ 2) JSON object хэсгийг олж сугална
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return jsonError("AI JSON буцаасангүй", { raw: content });
    }

    const jsonOnly = cleaned.slice(start, end + 1);

    let parsed: PetAnalysisResult;
    try {
      parsed = JSON.parse(jsonOnly) as PetAnalysisResult;
    } catch {
      return jsonError("JSON parse failed", { raw: content });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    return jsonError("analyze-pet error", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
