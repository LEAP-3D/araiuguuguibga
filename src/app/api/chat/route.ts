import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Та амьтан сургагч, эмнэлгийн зөвлөх мэргэжилтэн. Хэрэглэгчид амьтдын хооллолт, эрүүл мэнд, зан байдал, асран хамгаалалт зэрэг талаар монгол болон англи хэлээр туслана. Товч, ойлгомжтой, практик зөвлөмж өг. Эмнэлгийн яаралтай асуудлын үед эмнэлэгт хандахыг зөвлө.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY тохируулаагүй байна. .env дээр GROQ_API_KEY нэмнэ үү." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { messages } = body as { messages?: { role: string; content: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages массив шаардлагатай" },
        { status: 400 }
      );
    }

    const apiMessages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant" | "system",
        content: typeof m.content === "string" ? m.content : String(m.content),
      })),
    ];

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        messages: apiMessages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Groq chat error:", res.status, errText);
      let errMessage = "Чат хариу ирэхэд алдаа гарлаа. Дахин оролдоно уу.";
      try {
        const errJson = JSON.parse(errText) as { error?: { message?: string }; message?: string };
        const msg = errJson?.error?.message ?? errJson?.message;
        if (msg && typeof msg === "string" && msg.length < 200) errMessage = msg;
      } catch {
        // keep default
      }
      return NextResponse.json(
        { error: errMessage },
        { status: 502 }
      );
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string | null } }> };
    const text = data.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) {
      return NextResponse.json(
        { error: "Хариу хоосон байна." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: { role: "assistant" as const, content: text } });
  } catch (err) {
    console.error("chat API error:", err);
    return NextResponse.json(
      { error: "Серверийн алдаа. Дахин оролдоно уу." },
      { status: 500 }
    );
  }
}
