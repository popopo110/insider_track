"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostCard({ post, reload }) {
  const [isVoting, setIsVoting] = useState(false);
  const [localTrue, setLocalTrue] = useState(post.true_votes);
  const [localFalse, setLocalFalse] = useState(post.false_votes);

  async function voteTrue() {
    if (isVoting) return;

    setIsVoting(true);
    setLocalTrue(v => v + 1);

    const { error } = await supabase.rpc("vote_post", {
      post_id: post.id,
      vote_type: "true",
    });

    if (error) {
      console.error(error);
      setLocalTrue(v => v - 1);
    }

    setIsVoting(false);
    reload();
  }

  async function voteFalse() {
    if (isVoting) return;

    setIsVoting(true);
    setLocalFalse(v => v + 1);

    const { error } = await supabase.rpc("vote_post", {
      post_id: post.id,
      vote_type: "false",
    });

    if (error) {
      console.error(error);
      setLocalFalse(v => v - 1);
    }

    setIsVoting(false);
    reload();
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={voteTrue} disabled={isVoting}>
          ✅ True ({localTrue})
        </button>

        <button onClick={voteFalse} disabled={isVoting}>
          ❌ False ({localFalse})
        </button>
      </div>
    </div>
  );
}

