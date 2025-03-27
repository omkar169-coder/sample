import { useState } from "react";
import { Share } from "lucide-react";

const ShareButton = () => {
  const [shared, setShared] = useState(false);

  return (
    <button onClick={() => setShared(!shared)} className="focus:outline-none">
      <Share
        className="transition-all duration-300"
        size={22}
        color={shared ? "#34D399" : "#000"}
        fill={shared ? "#34D399" : "none"}
      />
    </button>
  );
};

export default ShareButton;