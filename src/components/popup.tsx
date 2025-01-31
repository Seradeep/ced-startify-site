"use client";

import { useState, useEffect } from "react";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the popup when the page loads
    setIsOpen(true);
  }, []);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity duration-300 ease-in-out">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-11/12 max-w-md text-center transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-popup">
          <h2 className="text-2xl font-semibold text-gray-800">
            ⚠️ Site Under Maintenance ⚠️
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            The site is currently under maintenance. We will notify you once it's back online.
          </p>
          <p className="text-gray-600 mt-2 text-lg">
            We have collected your response. If you did not receive an email,
          </p>
          <p className="text-gray-600 mt-2 text-lg">
            We will send the confirmation mail on <strong className="text-blue-500">February 3rd</strong>.
          <p className="text-gray-600 mt-4 text-lg font-medium">
            For any doubts, WhatsApp on this number: <strong className="text-blue-500">9363300704</strong>
          </p>
          </p>
        </div>
      </div>
    )
  );
};

export default Popup;
