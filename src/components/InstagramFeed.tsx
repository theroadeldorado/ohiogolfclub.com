"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO";
  thumbnailUrl?: string;
  permalink: string;
}

interface BeholdPost {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO";
  thumbnailUrl?: string;
  permalink: string;
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        const response = await fetch(
          "https://feeds.behold.so/eO2DDGxcnmoR3DskK1KD"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Instagram feed");
        }
        const data = await response.json();

        // Transform the data to match our needs
        const transformedPosts = data.posts.map((post: BeholdPost) => ({
          id: post.id,
          mediaUrl: post.mediaUrl,
          caption: post.caption,
          timestamp: new Date(post.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          mediaType: post.mediaType,
          thumbnailUrl: post.thumbnailUrl,
          permalink: post.permalink,
        }));

        setPosts(transformedPosts.slice(0, 6)); // Get only the 3 most recent posts
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeed();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group overflow-hidden rounded-2xl shadow-xl aspect-square block"
        >
          {post.mediaType === "VIDEO" ? (
            <>
              <video
                src={post.mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <Image
              src={post.mediaUrl}
              alt="Instagram post"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-sm mb-2">{post.timestamp}</p>
            <p className="text-sm line-clamp-3">{post.caption}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
