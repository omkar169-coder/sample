"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const UpgradeCard = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="z-10 sticky top-0 bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl p-6 shadow-lg w-full max-w-sm  text-center mb-6"
    //border border-6 
      style={{
        //transform: `translateY(${offsetY}px)`,
       // transition: "transform 0.1s ease-out",
      }}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/crown.png"
          alt="Crown Icon"
          width={80}
          height={80}
          priority
          className="mb-3"
        />

        <p className="text-lg font-semibold text-black">
          Boost your career growth with
        </p>

        <Image
          src="/wooble_black_logo.png"
          alt="Company Icon"
          width={140}
          height={50}
          priority
          className="my-2"
        />

        <button className="mt-4 bg-white px-5 py-2 rounded-lg text-blue-600 font-bold text-lg shadow-md hover:bg-gray-100 transition">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default UpgradeCard;
