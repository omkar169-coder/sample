import { useState } from "react";
import { Heart } from "lucide-react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)} className="focus:outline-none">
      <Heart
        className="transition-all duration-300"
        size={22}
        color={liked ? "#e63946" : "#000"}
        fill={liked ? "#e63946" : "none"}
      />
    </button>
  );
};

export default LikeButton;
