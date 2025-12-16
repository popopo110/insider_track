"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

/* ---------- Types ---------- */

type Post = {
  id: string;          // UUID
  title: string;
  body: string;
  created_at: string;
  true_votes: number;
  false_votes: number;
};

/* ---------- Feed Page ---------- */

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function loadPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load posts failed:", error);
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
        { event: "*", schema: "public", table: "posts" },
        () => loadPosts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Community Feed</h1>
      <p>React with True or False to reflect community sentiment.</p>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} reload={loadPosts} />
      ))}

      {posts.length === 0 && <p>No posts yet.</p>}
    </main>
  );
}

/* ---------- Post Card ---------- */

function PostCard({
  post,
  reload,
}: {
  post: Post;
  reload: () => void;
}) {
  async function vote(type: "true" | "false") {
    const { error } = await supabase.rpc("vote_post", {
      post_id: post.id,
      vote_type: type,
    });

    if (error) {
      console.error("Vote failed:", error);
      return;
    }

    reload();
  }

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        background: "#111",
      }}
    >
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      {/* Reaction Bar */}
      <div className="reaction-bar">
        <button
          className="reaction true"
          onClick={() => vote("true")}
        >
          👍 True <span>{post.true_votes}</span>
        </button>

        <button
          className="reaction false"
          onClick={() => vote("false")}
        >
          👎 False <span>{post.false_votes}</span>
        </button>
      </div>

      <style jsx>{`
        .reaction-bar {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        .reaction {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid #334155;
          background: transparent;
          color: #e5e7eb;
          cursor: pointer;
          font-weight: 500;
        }

        .reaction:hover {
          background: #020617;
        }

        .reaction.true span {
          color: #22c55e;
          font-weight: 600;
        }

        .reaction.false span {
          color: #ef4444;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
