"use client";

import { useState } from "react";
import { Send, Heart, Share2, MessageSquare, MoreHorizontal, Copy, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import TextAreaWithDialog from "@/components/TextAreaWithDialog";
import { BsReply } from "react-icons/bs";

interface PostSectionProps {
  threadId?: string;
}

const PostSection = ({ threadId }: PostSectionProps) => {
  const router = useRouter();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "A",
      content: "Had a great day at the park!",
      likes: 0,
      shares: 0,
      Reply: ["Looks fun!", "Wish I was there!", "Such a lovely day!", "I wish I could join you!", "This is amazing!"],
      showComments: false,
      visibleComments: 6,
      image: "", // Add an empty image initially
      imageCaption: "", // Add a caption for the image
    },
    {
      id: 2,
      author: "B",
      content: "Learning React today! It’s amazing!",
      likes: 0,
      shares: 0,
      Reply: ["React is great!", "I love it!", "So much to learn!"],
      showComments: false,
      visibleComments: 6,
      image: "", // Add an empty image initially
      imageCaption: "", // Add a caption for the image
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);  // New state for image
  const [imageCaption, setImageCaption] = useState<string>("");  // New state for image caption

  const handlePostCreation = () => {
    const newPostData = {
      id: posts.length + 1,
      author: "A",
      content: newPost,
      likes: 0,
      shares: 0,
      Reply: [],
      showComments: false,
      visibleComments: 6,
      image: imagePreview || "",  // Use the image preview if available
      imageCaption: imageCaption, // Use the image caption if available
    };

    setPosts([...posts, newPostData]);
    setNewPost("");  // Reset new post content
    setImagePreview(null);  // Reset the image preview
    setImageCaption("");  // Reset the image caption
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
  };

  const handleShare = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, shares: post.shares + 1 } : post)));
  };

  const handleViewReply = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, showComments: !post.showComments } : post)));
  };

  const menuStyle = "absolute right-0 top-0 mt-15 bg-white text-black shadow-lg rounded-lg p-2 w-36";
  const buttonStyle = "flex items-center gap-1 w-full p-1 rounded-lg hover:bg-gray-200";
  const copyLinkButtonStyle = "text-black bg-white";  // White text for Copy Link
  const deleteButtonStyle = "text-red-500"; // Red text for Delete button

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleCopyLink = (postId: number) => {
    const postLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postLink)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying link: ", err);
      });
  };

  const loadMoreComments = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, visibleComments: post.visibleComments + 4 } : post)));
  };

  const formatContent = (content: string) => {
    const regex = /(#\w+|@\w+)/g;
    return content.split(" ").map((word, index) => {
      if (word.match(regex)) {
        return (
          <span key={index} className="text-blue-500 font-medium">
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm sm:text-base font-medium">
          A
        </div>

        <TextAreaWithDialog 
          setNewPost={setNewPost} 
          setImagePreview={setImagePreview} 
          setImageCaption={setImageCaption} 
        />

        <button
          onClick={handlePostCreation}
          className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition text-sm sm:text-base"
        >
          <Send size={16} />
          <span>Post</span>
        </button>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-3 sm:p-4 mb-4 rounded-lg shadow-sm relative">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 text-white flex items-center justify-center rounded-full text-xs sm:text-base font-medium">
                {post.author}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold">{post.author}</p>
              </div>

              <button
                onClick={() => setShowMenu(showMenu === post.id ? null : post.id)}
                className="text-gray-600 hover:text-gray-800 ml-130"
              >
                <MoreHorizontal size={18} />
              </button>
              {showMenu === post.id && (
                <div className="absolute right-0 top-0 mt-15 bg-white text-black shadow-lg rounded-lg p-2 w-36 mb-5">
                  <button
                    onClick={() => handleCopyLink(post.id)}
                    className="flex items-center gap-1 w-full text-black p-1 rounded-lg hover:bg-gray-200"
                  >
                    <Copy size={16} />
                    <span>Copy Link</span>
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className={`${buttonStyle} ${deleteButtonStyle}`}
                  >
                    <Trash size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-sm md:text-base text-gray-800">{post.content}</p>

            {/* Render Image if it exists */}
            {post.image && (
              <div className="mt-2">
                <img src={post.image} alt="Post image" className="w-full max-h-60 object-cover" />
                {post.imageCaption && <p className="text-gray-500 text-sm mt-2">{post.imageCaption}</p>}
              </div>
            )}

            <div className="mt-2">{formatContent(post.content)}</div>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => handleLike(post.id)}
                className="text-gray-600 hover:text-red-600 transition flex items-center gap-1"
              >
                <Heart size={16} />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={() => handleViewReply(post.id)}
                className="text-gray-600 hover:text-green-600 transition flex items-center gap-1"
              >
                <BsReply size={16} />
                <span>{post.Reply.length}</span>
              </button>

              <button
                onClick={() => handleShare(post.id)}
                className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1"
              >
                <Share2 size={16} />
                <span>{post.shares}</span>
              </button>
            </div>

            {/* Reply Section */}
            {post.showComments && (
              <div className="mt-4 ml-4">
                {post.Reply.slice(0, post.visibleComments).map((comment, index) => (
                  <div key={index} className="bg-gray-200 p-2 mb-2 rounded-lg">
                    <p className="text-sm text-gray-700">{comment}</p>
                  </div>
                ))}
                {post.visibleComments < post.Reply.length && (
                  <button
                    onClick={() => loadMoreComments(post.id)}
                    className="text-blue-600 mt-2 hover:underline"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostSection;
