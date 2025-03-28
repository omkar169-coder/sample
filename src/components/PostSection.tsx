import { useState } from "react";
import { useRouter } from "next/navigation";
import TextAreaWithDialog from "@/components/TextAreaWithDialog";
import PostButton from "@/components/PostButton";
import PostCard from "@/components/PostCard";
import FullPostView from "@/components/fullcardview";

const PostSection = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([
    {
      question_id: 2097,
      asked_by_user_id: 30,
      question_text: "The Biggest Career Mistake You Might Be Making (Without Realizing It)...",
      is_anonymous: 0,
      timestamp: "2025-03-25 07:34:56",
      category: null,
      url: "https://jpeg.org/images/jpeg-home.jpg",
      asked_to: null,
      channel_id: null,
      type: 1,
      user_id: 30,
      name: "Arpita Gupta",
      username: "Arpita",
      profession: "Marketing & Business Manager At Wooble",
      profile_pic: "profile-pic_67cea69407ad47.09949931.webp",
      reply_count: 0,
      likes_count: 2,
      replies_count: 0,
      comments_count: 0,
      is_liked: false,
      media: [
        {
          media_url: "https://cdn.prod.website-files.com/5f7ece8a7da656e8a25402bc/6410842bd4f442a63b6d25a9_How%20to%20turn%20a%20LinkedIn%20comment%20into%20a%20post%20(1).webp",
          media_type: "image"
        }
      ]
    }
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const handlePostCreation = () => {
    if (!newPost.trim()) return;

    const newPostData = {
      question_id: posts.length + 2097,
      asked_by_user_id: 0,
      question_text: newPost,
      is_anonymous: isAnonymous ? 1 : 0,
      timestamp: new Date().toISOString(),
      category: null,
      url: "",
      asked_to: null,
      channel_id: null,
      type: 1,
      user_id: 0,
      name: isAnonymous ? "Anonymous" : "User",
      username: isAnonymous ? "Anonymous" : "user",
      profession: isAnonymous ? "" : "Your Profession",
      profile_pic: isAnonymous ? "" : "your-profile-pic.webp",
      reply_count: 0,
      likes_count: 0,
      replies_count: 0,
      comments_count: 0,
      is_liked: false,
      media: imagePreview ? [{ media_url: imagePreview, media_type: "image" }] : []
    };

    setPosts([...posts, newPostData]);
    setNewPost("");
    setImagePreview(null);
    setShowDialog(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
      <PostButton onClick={() => setShowDialog(true)} />
      {showDialog && (
        <TextAreaWithDialog
          newPost={newPost}
          setNewPost={setNewPost}
          setImagePreview={setImagePreview}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          onPost={handlePostCreation}
          onClose={() => setShowDialog(false)}
        />
      )}

      {selectedPost && (
        <FullPostView post={selectedPost} setSelectedPost={setSelectedPost} />
      )}

      <div className="mt-4 relative">
        {posts.map((post) => (
          <PostCard
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
