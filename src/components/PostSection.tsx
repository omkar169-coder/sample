"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PostComposer from "@/components/PostComposer";
import MergedPostCard from "@/components/MergedPostCard";
import FullCardView from "@/components/FullCardView";

interface Media {
  media_url: string;
  media_type: string;
}

interface Post {
  question_id: number;
  answer_id: number;
  asked_by_user_id: number;
  question_text: string;
  is_anonymous: number;
  timestamp: string;
  category: string | null;
  url: string;
  asked_to: string | null;
  channel_id: string | null;
  type: number;
  user_id: number;
  name: string;
  username: string;
  profession: string;
  profile_pic: string | null;
  reply_count: number;
  likes_count: number;
  replies_count: number;
  comments_count: number;
  is_liked: boolean;
  media: Media[];
  slug: string;
  userid: number;
}

interface PostSectionProps {
  userId: number;
}

const API_URL = "https://wooble.io/feed/discussion_api/fetch_personalised_questions.php";
const CREATE_POST_URL = "https://wooble.io/feed/discussion_api/create_question.php";
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";

const encodeFileName = (filename: string): string => {
  try {
    return btoa(filename);
  } catch {
    return filename;
  }
};

const sanitizeText = (input: string) => {
  const withoutTags = input.replace(/<\/?[^>]+(>|$)/g, "");
  const textArea = document.createElement("textarea");
  textArea.innerHTML = withoutTags;
  return textArea.value;
};

const truncateText = (text: string, limit: number = 300) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trim() + "…";
};

const PostSection = ({ userId }: PostSectionProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); 
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const loadedPostIds = useRef<Set<number>>(new Set());
  const [noMorePosts, setNoMorePosts] = useState(false);
  const noNewPostsCounter = useRef(0);


  

  useEffect(() => {
    fetchPosts();
  }, [page]); 

  // const fetchPosts = async () => {
  //   setLoading(true);
  //   setError(null);
  
  //   try {
  //     const params = {
  //       limit: 100,
  //       //offset: page * 20,
  //       user_id: userId,
  //       order: "random",
  //     };
  
  //     const response = await axios.get(API_URL, {
  //       params,
  //       headers: { "Content-Type": "application/json" },
  //     });
  
  //     if (response.data && response.data.success) {
  //       const formattedPosts = response.data.data.map((post: Post) => {
  //         const formattedProfilePic = post.profile_pic
  //           ? `https://wooble.org/dms/${encodeFileName(post.profile_pic)}`
  //           : DEFAULT_AVATAR;
  
  //         const formattedMedia = post.media.map((media) => ({
  //           ...media,
  //           media_url: `https://wooble.org/dms/${encodeFileName(media.media_url)}`,
  //         }));
  
  //         return {
  //           ...post,
  //           profile_pic: formattedProfilePic,
  //           media: formattedMedia,
  //           timestamp: new Date(post.timestamp).toLocaleString(),
  //         };
  //       });
  
  //       const uniquePosts = formattedPosts.filter((post: Post) => {
  //         if (loadedPostIds.current.has(post.question_id)) {
  //           return false;
  //         }
  //         loadedPostIds.current.add(post.question_id);
  //         return true;
  //       });
  
  //       setPosts((prev) => [...prev, ...uniquePosts]);
  //     } else {
  //       setError(response.data?.message || "Failed to fetch posts.");
  //     }
  //   } catch (err: any) {
  //     console.error("Axios Error:", err.response?.data || err.message);
  //     setError("Error fetching posts.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchPosts = async () => {
    if (noMorePosts) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const params = {
        limit: 150,
        user_id: userId,
        order: "random",
      };
  
      const response = await axios.get(API_URL, {
        params,
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.data && response.data.success) {
        const formattedPosts = response.data.data.map((post: Post) => {
          const formattedProfilePic = post.profile_pic
            ? `https://wooble.org/dms/${encodeFileName(post.profile_pic)}`
            : DEFAULT_AVATAR;
  
          const formattedMedia = post.media.map((media) => ({
            ...media,
            media_url: `https://wooble.org/dms/${encodeFileName(media.media_url)}`,
          }));
  
          return {
            ...post,
            profile_pic: formattedProfilePic,
            media: formattedMedia,
            timestamp: new Date(post.timestamp).toLocaleString(),
          };
        });
  
        const uniquePosts = formattedPosts.filter((post: Post) => {
          if (loadedPostIds.current.has(post.question_id)) return false;
          loadedPostIds.current.add(post.question_id);
          return true;
        });
  
        if (uniquePosts.length === 0) {
          noNewPostsCounter.current += 1;
          if (noNewPostsCounter.current >= 3) {
            setNoMorePosts(true);
          }
        } else {
          noNewPostsCounter.current = 0;
          setPosts((prev) => [...prev, ...uniquePosts]);
        }
      } else {
        setError(response.data?.message || "Failed to fetch posts.");
      }
    } catch (err: any) {
      console.error("Axios Error:", err.response?.data || err.message);
      setError("Error fetching posts.");
    } finally {
      setLoading(false);
    }
  };
    
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1); 
        }
      },
      { threshold: 1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [loading]);

  const handlePostCreation = async () => {
    if (!newPost.trim()) return;

    const formData = new URLSearchParams();
    formData.append("user_id", String(userId));
    formData.append("question_text", newPost);
    formData.append("is_anonymous", isAnonymous ? "1" : "0");

    if (imagePreview) {
      const fileName = imagePreview.split("/").pop() || imagePreview;
      const encodedImage = encodeFileName(fileName);
      formData.append("media_url", `https://wooble.org/dms/${encodedImage}`);
      formData.append("media_type", "image");
    }

    try {
      const response = await axios.post(
        CREATE_POST_URL,
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.data?.success) {
        loadedPostIds.current.clear();
        noNewPostsCounter.current = 0;
        setNoMorePosts(false);
        setPosts([]); // clear current posts
        fetchPosts(); // fresh fetch
        setNewPost("");
        setImagePreview(null);
      } else {
        setError(response.data?.message || "Failed to create post.");
      }
    } catch (err: any) {
      console.error("Error posting:", err.response?.data || err.message);
      setError("Error posting your question.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-xl">
      <PostComposer
        userId={userId}
        newPost={newPost}
        setNewPost={setNewPost}
        setImagePreview={setImagePreview}
        isAnonymous={isAnonymous}
        setIsAnonymous={setIsAnonymous}
        onPost={handlePostCreation}
      />

      {loading && <p className="text-center text-gray-500">Loading posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="mt-4 relative">
        {posts.map((post, index) => (
          <MergedPostCard
            key={`${post.question_id}-${index}`}
            post={post}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setPosts={setPosts}
            setSelectedPost={setSelectedPost}
            userId={post.user_id}
          />
        ))}

        {/* 👇 Intersection observer target */}
        <div ref={bottomRef} className="h-1" />

        {/* 👇 No more posts message */}
        {noMorePosts && (
          <div className="text-center text-gray-500 py-4">
            🎉 You’ve seen all available posts!
          </div>
        )}
      </div>

      {selectedPost && (
        <FullCardView
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default PostSection;