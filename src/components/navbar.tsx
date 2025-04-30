'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Bell, UserCircle } from 'lucide-react';
import Image from 'next/image';
import UserDropdown from "@/components/userdropdown";
import SearchBar from "@/components/SearchBar";

const Navbar = () => {
  const { data: session } = useSession(); // Access session data

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
          {/* Bell Icon - Only visible when logged in */}
          {session && (
            <div className="relative">
              <Bell className="w-6 h-6 mb-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          )}

          {/* Google Login or User Profile Dropdown */}
          {session ? (
            <div className="flex items-center gap-4">
              {/* Profile Picture and Name */}
              <div className="flex items-center gap-2">
                <Image
                  src={session.user?.image || '/default-profile.png'}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-sm font-semibold">{session.user?.name}</span>
              </div>

              {/* Dropdown for User */}
              <UserDropdown
                trigger={
                  <UserCircle className="w-8 h-12 mb-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                }
              />
              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="border border-light-blue-500 text-black px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="border border-light-blue-500 text-black px-4 py-2 rounded"
            >
              Login/Signup
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
