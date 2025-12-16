"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Post = {
  id: number;
  title:string;
  body: string;
  status: string;
  created_at: string;
};



export default function CommunityFeed() {
  const [posts, setPosts] = useState<any[]>([]);

async function loadPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

if (error) {
  return;
}

  setPosts(data || []);
}

useEffect(() => {
  loadPosts();

  const channel = supabase
    .channel("posts-feed")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "posts",
      },
      () => {
        loadPosts();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Community Feed</h1>
      <p>Vote to verify local news</p>

      {posts.map(post => (
        <PostCard key={post.id} post={post} reload={loadPosts} />
      ))}

      {posts.length === 0 && <p>No posts yet.</p>}
    </main>
  );
}

/* ---------- Post Card ---------- */

function PostCard({ post, reload }: any) {
  async function vote(vote: "true" | "false") {
    const DEMO_USER = "demo-user";

    await supabase.from("votes").upsert({
      post_id: post.id,
      voter: DEMO_USER,
      vote
    });

    await recomputePost(post.id);
    reload();
  }

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        background: "#111"
      }}
    >
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <p>
        Status:{" "}
        <b
          style={{
            color:
              post.status === "true"
                ? "#22c55e"
                : post.status === "false"
                ? "#ef4444"
                : "#eab308"
          }}
        >
          {post.status}
        </b>
      </p>

      {post.status === "pending" && (
        <div style={{ marginTop: 8 }}>
          <button onClick={() => vote("true")}>True</button>
          <button onClick={() => vote("false")} style={{ marginLeft: 8 }}>
            False
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Vote Recompute ---------- */

async function recomputePost(postId: string) {
  const { data } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId);

  const votes = data || [];

  const trueVotes = votes.filter(v => v.vote === "true").length;
  const falseVotes = votes.filter(v => v.vote === "false").length;

  if (trueVotes >= 3) {
    await supabase.from("posts").update({ status: "true" }).eq("id", postId);
  }

  if (falseVotes >= 3) {
    await supabase.from("posts").update({ status: "false" }).eq("id", postId);
  }
}

