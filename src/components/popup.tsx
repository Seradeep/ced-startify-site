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
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
          <h2 className="text-lg font-bold text-gray-800">
            Site Under Maintenance ⚠️
          </h2>
          <p className="text-gray-600 mt-2">
            The site is currently under maintenance. We will notify you once it's back online.
          </p>
          <p className="text-gray-600 mt-2">
            We have collected your response. If you did not receive an email
          </p>
          <p className="text-gray-600 mt-2">
            We will send the confirmation mail on <strong>February 3rd</strong>.
          </p>
        </div>
      </div>
    )
  );
};

export default Popup;

