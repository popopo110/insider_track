"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function signUp() {
    setMsg("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return setMsg(error.message);

    const user = data.user;
    if (user) {
      // Create profile row for balance + warnings
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        balance_cents: 0,
        warnings: 0,
      });
    }

    setMsg("Account created. You can now go to your account page.");
    router.push("/account");
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <h1>Create account</h1>

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
        onClick={signUp}
        style={{ marginTop: 12, padding: "10px 14px" }}
      >
        Sign up
      </button>

      <p style={{ marginTop: 10, color: "#aaa" }}>
        Already have an account? <a href="/login">Log in</a>
      </p>

      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </div>
  );
}

