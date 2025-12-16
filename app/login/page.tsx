"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function logIn() {
    setMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return setMsg(error.message);

    router.push("/account");
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <h1>Log in</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <button
        onClick={logIn}
        style={{ marginTop: 12, padding: "10px 14px" }}
      >
        Log in
      </button>

      <p style={{ marginTop: 10, color: "#aaa" }}>
        New here? <a href="/signup">Create an account</a>
      </p>

      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </div>
  );
}

