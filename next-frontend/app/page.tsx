"use client";

import MainMenu from "./components/MainMenu";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [pageData, setPageData] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [soldierImageUrl, setSoldierImageUrl] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const pageRes = await fetch(
          "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/pages?slug=homepage"
        );
        const data = await pageRes.json();

        if (data.length && data[0]) {
          setPageData(data[0]);

          if (data[0].acf?.profile_photo) {
            const profileRes = await fetch(
              `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${data[0].acf.profile_photo}`
            );
            const profileData = await profileRes.json();
            setProfilePhotoUrl(profileData?.source_url);
          }

          if (data[0].acf?.soldier_image) {
            const soldierRes = await fetch(
              `http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/media/${data[0].acf.soldier_image}`
            );
            const soldierData = await soldierRes.json();
            setSoldierImageUrl(soldierData?.source_url);
          }
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    }

    fetchPageData();
  }, []);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 2000);

    return () => clearInterval(flipInterval);
  }, []);

  if (!pageData) {
    return (
      <div>
        <MainMenu />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div
      className="homepage"
      style={{ backgroundColor: "black", color: "pink" }}
    >
      <MainMenu />
      <div className="center-container">
        <h1 className="animated-title">Welcome to My Site</h1>

        {/* Flip Effect for Profile and Soldier Image */}
        <div className="flip-container">
          <div
            className="flip-inner"
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front Side: Profile Photo */}
            <div className="flip-front">
              {profilePhotoUrl && (
                <img
                  src={profilePhotoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Back Side: Soldier Image */}
            <div className="flip-back">
              {soldierImageUrl && (
                <img
                  src={soldierImageUrl}
                  alt="Squid Game Soldier"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Presentation Text */}
        <p className="korean-text text-2xl mt-4">
          ⭕️ㅣ유리의 포트폴리트 🔺ㅏ이트에 오신것을 환영 하🟥니다.{" "}
        </p>
      </div>
      <footer>
        <div className="footer-image">
          <a href="/contact" aria-label="Go to Contact Page">
            <img
              src="/images/footer/squid-game-symbols.png"
              alt="Squid Game Symbols"
              className="w-auto h-16 mx-auto"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
