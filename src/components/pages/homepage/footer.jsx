import React from "react";
import "../../../App.css";

export const footer = () => {
  return (
    <>
      <div className="flex justify-center p-4 mt-auto mb-auto">
        <p className="text-sm text-gray-500 text-center">
          📖 Powered by Equran API & MyQuran API.
          <br />
          🕌 Helping you explore and understand the Qur'an anytime, anywhere.
          learning and reflection.
          <br />
          Feel free to share feedback or suggestions!
          <br />
          <reserved className="">&copy; 2025 Islamic Corner.</reserved>
        </p>
      </div>
    </>
  );
};

export default footer;
