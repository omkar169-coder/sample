import { useState } from "react";
import { MessageCircle } from "lucide-react";

const ReplyButton = () => {
  const [replied, setReplied] = useState(false);

  return (
    <button onClick={() => setReplied(!replied)} className="focus:outline-none">
      <MessageCircle
        className="transition-all duration-300"
        size={22}
        color={replied ? "#1d4ed8" : "#000"}
        fill={replied ? "#1d4ed8" : "none"}
      />
    </button>
  );
};

export default ReplyButton;
