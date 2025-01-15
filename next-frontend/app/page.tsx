"use client";

import MainMenu from "./components/MainMenu";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 2000);

    return () => clearInterval(flipInterval);
  }, []);

  return (
    <div className="homepage">
      <MainMenu />
      <div className="center-container">
        <h1 className="animated-title">Welcome to My Site</h1>
        <div
          className="flip-container mx-auto my-6"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Add Flip Content */}
        </div>
        <p className="korean-text">
          ⭕️ㅣ유리의 포트폴리트 🔺ㅏ이트에 오신것을 환영 하니🟥다.
        </p>
      </div>
    </div>
  );
}
