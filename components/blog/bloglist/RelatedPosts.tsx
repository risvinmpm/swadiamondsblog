/* components/blog/bloglist/RelatedPosts.tsx */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import BannerList from "@/components/main/BannerList";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  image: string;
}

export default function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/api/blog");  
        setPosts(res.data.blogs ?? []);
      } catch (e) {
        console.error("Cannot load blog list", e);
      }
    };
    load();
  }, []);


  const handleClick = (slug: string) => {
    if (slug === currentSlug) return;       
    router.push(`/blog/bloglist/${slug}`, {    
      scroll: false,                          
    });
  };


  const explore = posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 5);

  if (explore.length === 0) return null;      

  return (
    <aside>
      <h3 className="text-xl font-semibold mb-4">Explore More</h3>

      <div className="space-y-4">
        {explore.map((post) => (
          <div
            key={post._id}
            onClick={() => handleClick(post.slug)}
            className="cursor-pointer"
          >
            <BannerList post={post} />
          </div>
        ))}
      </div>
    </aside>
  );
}
