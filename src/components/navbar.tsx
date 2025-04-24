// "use client";

// import Link from "next/link";
// import { Bell, UserCircle } from "lucide-react";
// import Image from "next/image";
// import UserDropdown from "@/components/userdropdown";
// import SearchBar from "@/components/SearchBar"; 
// import { useSession, signIn, signOut } from "next-auth/react";

// const Navbar: React.FC = () => {
//   const { data: session } = useSession();

//   return (
//     <nav className="bg-white shadow-md h-20">
//       <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 w-full">

//         <Link href="/">
//           <Image 
//             src="/wooble_logo_mini.png" 
//             alt="Company Logo" 
//             width={60} 
//             height={30} 
//             className="cursor-pointer mb-5"
//           />
//         </Link>

//         {/* Search Bar */}
//         <div className="hidden lg:flex justify-center flex-grow mx-8 mt-2">
//           <SearchBar />
//         </div>

//         <div className="flex items-center gap-4">
//           {session ? (
//             <>
//               {/* Bell Icon */}
//               <div className="relative">
//                 <Bell className="w-6 h-6 mb-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
//                     {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//                       3
//                     </span> */}
//               </div>

//               {/* User Dropdown with User Circle */}
//               <UserDropdown
//                 trigger={
//                   <UserCircle className="w-8 h-12 mb-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
//                 }
//               />
//             </>
//           ) : (
//             <button
//               className="border border-blue-400 mb-6 text-black px-4 py-2 rounded-full hover:bg-blue-50 transition-all"
//               onClick={() => signIn("google")}
//             >
//               Login / Signup
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import Link from "next/link";
import { Bell, UserCircle } from "lucide-react";
import Image from "next/image";
import UserDropdown from "@/components/userdropdown";
import SearchBar from "@/components/SearchBar"; 

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md h-20">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 w-full">

        <Link href="/">
          <Image 
            src="/wooble_logo_mini.png" 
            alt="Company Logo" 
            width={60} 
            height={30} 
            className="cursor-pointer mb-5"
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex justify-center flex-grow mx-8 mt-2">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          {/* Bell Icon */}
          <div className="relative">
            <Bell className="w-6 h-6 mb-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              {/* Optional Notification Badge */}
              {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span> */}
          </div>

          {/* User Dropdown with User Circle */}
          <UserDropdown
            trigger={
              <UserCircle className="w-8 h-12 mb-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            }
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
