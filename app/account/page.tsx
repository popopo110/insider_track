"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  email: string | null;
  balance_cents: number;
  warnings: number;
};

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string>("");

  async function load() {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) {
      router.push("/login");
      return;
    }

    setEmail(user.email ?? "");

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile((data as Profile) ?? null);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  useEffect(() => {
    load();
  }, []);

  const dollars =
    profile ? (profile.balance_cents / 100).toFixed(2) : "0.00";

  return (
    <div style={{ maxWidth: 720 }}>
      <h1>Account</h1>
      <p style={{ color: "#aaa" }}>Signed in as: {email}</p>

      <div style={{ border: "1px solid #333", padding: 16, borderRadius: 8, marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Balance</h2>
        <p style={{ fontSize: 22 }}>${dollars}</p>

        <h3>Warnings</h3>
        <p>
          {profile?.warnings ?? 0} / 3
        </p>

        <button onClick={signOut} style={{ marginTop: 10 }}>
          Sign out
        </button>
      </div>
    </div>
  );
}


