import { useState } from "react";
import { useRouter } from "next/navigation";
import TextAreaWithDialog from "@/components/TextAreaWithDialog";
import PostButton from "@/components/PostButton";
import PostCard from "@/components/PostCard";

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
          media_url: "https://jpeg.org/images/jpeg-home.jpg",
          media_type: "image"
        }
      ]
    }
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);  
  const [showMenu, setShowMenu] = useState<number | null>(null);  

  const handlePostCreation = () => {
    if (!newPost.trim()) return;

    const newPostData = {
      question_id: posts.length + 2097,
      asked_by_user_id: 0,
      question_text: newPost,
      is_anonymous: 0,
      timestamp: new Date().toISOString(),
      category: null,
      url: "",
      asked_to: null,
      channel_id: null,
      type: 1,
      user_id: 0,
      name: "User",
      username: "user",
      profession: "",
      profile_pic: "",
      reply_count: 0,
      likes_count: 0,
      replies_count: 0,
      comments_count: 0,
      is_liked: false,
      media: []
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
          newPost={newPost} // Pass newPost as a prop
          setNewPost={setNewPost}
          setImagePreview={setImagePreview}
          onPost={handlePostCreation}
          onClose={() => setShowDialog(false)}
        />
      )}
      
      <div className="mt-4">
        {posts.map((post) => (
          <PostCard 
            key={post.question_id} 
            post={post} 
            showMenu={showMenu} 
            setShowMenu={setShowMenu} 
          />
        ))}
      </div>
    </div>
  );
};

export default PostSection;
