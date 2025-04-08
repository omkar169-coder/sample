"use client";

import React from "react";

const FooterLinks = () => {
    return (
        <div className="text-center text-gray-400 text-sm mt-2 space-y-2 px-4">
          
          <div className="flex justify-center flex-wrap gap-3">
            <a href="#" className="hover:text-gray-600 transition">About</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600 transition">Contact</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600 transition">Privacy Policy</a>
          </div>

          <div className="flex justify-center flex-wrap gap-3">
            <a href="#" className="hover:text-gray-600 transition">Terms & Conditions</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600 transition">Refund & Cancellation</a>
          </div>

          <div className="pt-1">© 2025 Wooble Software (P) (L)</div>
        </div>
      );
    };

export default FooterLinks;
