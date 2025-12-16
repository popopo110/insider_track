"use client";
import { getZip } from "@/lib/zip";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function helpMeWrite() {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: text }),
      });

      const data = await res.json();
      if (data.text) {
        setText(data.text);
      }
    } catch (err) {
      console.error("Assist error", err);
    } finally {
      setLoading(false);
    }
  }

async function createPost() {
  if (!text.trim()) return;

  await supabase.from("posts").insert({
    title: "Community Report",
    body: text,
    zip_code: "48108",
    status: "pending"
  });

  alert("Post submitted for community verification!");
  setText("");
  router.push("/feed");
  router.refresh();

}

  return (
    <main style={{ padding: 24, maxWidth: 700 }}>
      <h1>Create a Post</h1>
      <p>Report an event happening in your area.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What happened?"
        rows={6}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 12,
          background: "#111",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: 6,
        }}
      />

      <div style={{ marginTop: 12 }}>
        <button
          onClick={createPost}
          style={{
            padding: "8px 14px",
            background: "#2563eb",
            color: "white",
            borderRadius: 6,
            border: "none",
            marginRight: 8,
            cursor: "pointer",
          }}
        >
          Post
        </button>

        <button
          onClick={helpMeWrite}
          disabled={loading}
          style={{
            padding: "8px 14px",
            background: "#16a34a",
            color: "white",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Writing…" : "Help me write"}
        </button>
      </div>
    </main>
  );
}

