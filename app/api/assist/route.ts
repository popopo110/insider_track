import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: `Rewrite this into a clear community alert:\n\n${notes}`,
        stream: false
      }),
    });

    const data = await ollamaRes.json();

    return NextResponse.json({
      text: data.response
    });
  } catch (err) {
    console.error("Assist API error:", err);
    return NextResponse.json(
      { error: "Ollama failed" },
      { status: 500 }
    );
  }
}

