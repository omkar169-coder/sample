import { useState, useEffect } from "react";
import axios from "axios";
import PostComposer from "@/components/PostComposer";
import MergedPostCard from "@/components/MergedPostCard";

interface Media {
  media_url: string;
  media_type: string;
}

interface Post {
  question_id: number;
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
}

interface PostSectionProps {
  userId: number;
}

const API_URL = "https://wooble.io/feed/discussion_api/fetch_personalised_questions.php";
const CREATE_POST_URL = "https://wooble.io/feed/discussion_api/create_question.php";
const IMAGE_BASE_URL = "https://wooble.io/uploads/profile_pictures/";
const DEFAULT_AVATAR = "/default-avatar.png";

const PostSection = ({ userId }: PostSectionProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          limit: 10,
          offset: 10,
          user_id: userId,
          order: "random",
        },
        headers: { "Content-Type": "application/json" },
      });

      if (response.data && response.data.success) {
        const formattedPosts = response.data.data.map((post: Post) => ({
          ...post,
          profile_pic: post.profile_pic
            ? (post.profile_pic.includes("http") ? post.profile_pic : `${IMAGE_BASE_URL}${post.profile_pic}`)
            : DEFAULT_AVATAR,
          media: post.media.map((media) => ({
            ...media,
            media_url: media.media_url.includes("http") ? media.media_url : `https://wooble.io/uploads/media/${media.media_url}`,
          })),
          timestamp: new Date(post.timestamp).toLocaleString(),
        }));

        setPosts(formattedPosts);
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

  
  const handlePostCreation = async () => {
    if (!newPost.trim()) return;
  
    const formData = new URLSearchParams();
    formData.append("user_id", String(userId));
    formData.append("question_text", newPost);
    formData.append("is_anonymous", isAnonymous ? "1" : "0");
  
    if (imagePreview) {
      // Add single image only (Wooble seems to expect `media_url` + `media_type`)
      formData.append("media_url", imagePreview);
      formData.append("media_type", "image");
    }
  
    try {
      const response = await axios.post(
        "https://wooble.io/feed/discussion_api/create_question.php",
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      console.log("Post Creation Response:", response.data);
  
      if (response.data?.success) {
        fetchPosts();
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
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
     <PostComposer 
        userId={userId} // <-- Pass the dynamic or static userId here
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
        {posts.map((post) => (
          <MergedPostCard
            key={post.question_id}
            post={post}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setPosts={setPosts}
            setSelectedPost={setSelectedPost}
          />
        ))}
      </div>
    </div>
  );
};

export default PostSection;
