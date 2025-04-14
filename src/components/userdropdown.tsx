// components/UserDropdown.tsx

import { useState, useRef, useEffect, ReactNode } from "react";
import {
  User,
  Lightbulb,
  Sun,
  Puzzle,
  Info,
  LogOut,
} from "lucide-react";

export default function UserDropdown({
  trigger,
}: {
  trigger: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
    
        <div style={{ right: '-12px' }} className="absolute mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-gray-300 text-black z-50">

          <div className="py-1">
            <MenuItem icon={<User size={18} />} label="Profile" />
          </div>
          <div className="border-t rounded border-gray-200" />
          <div className="py-1">
            <MenuItem icon={<Lightbulb size={18} />} label="Tools" />
            <MenuItem icon={<Sun size={18} />} label="Change Theme" />
            <MenuItem icon={<Puzzle size={18} />} label="Challenges" />
            <MenuItem icon={<Info size={18} />} label="About" />
          </div>
          <div className="border-t border-gray-200" />
          <div className="py-1">
            <MenuItem icon={<LogOut size={18} />} label="Log in / Logout" />
          </div>
        </div>
      )}
    </div>
  );
}

const MenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors">
    {icon}
    <span>{label}</span>
  </button>
);
