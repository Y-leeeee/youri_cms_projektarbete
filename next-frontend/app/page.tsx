"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "./components/MainMenu";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function HomePage() {
  const [pageData, setPageData] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [soldierImageUrl, setSoldierImageUrl] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Fetch page data and media URLs
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pages?slug=homepage`);
        if (!response.ok) {
          throw new Error(`Failed to fetch homepage: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.length > 0) {
          const page = data[0];
          setPageData(page);

          if (page.acf?.profile_photo) {
            const profileRes = await fetch(
              `${API_BASE_URL}/media/${page.acf.profile_photo}`
            );
            const profileData = await profileRes.json();
            setProfilePhotoUrl(profileData?.source_url || null);
          }

          if (page.acf?.soldier_image) {
            const soldierRes = await fetch(
              `${API_BASE_URL}/media/${page.acf.soldier_image}`
            );
            const soldierData = await soldierRes.json();
            setSoldierImageUrl(soldierData?.source_url || null);
          }
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchPageData();
  }, []);

  // Image flip effect
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
    <div className="homepage">
      <MainMenu />
      <h1 className="text-4xl font-bold my-6">Welcome to My Site</h1>
      <div className="flip-container w-64 h-64 mx-auto relative">
        <div
          className={`flip-inner absolute inset-0 transition-transform duration-500`}
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Image */}
          {profilePhotoUrl && (
            <div
              className="absolute inset-0 backface-hidden"
              style={{ transform: "rotateY(0deg)" }}
            >
              <Image
                src={profilePhotoUrl}
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}

          {/* Back Image */}
          {soldierImageUrl && (
            <div
              className="absolute inset-0 backface-hidden"
              style={{ transform: "rotateY(180deg)" }}
            >
              <Image
                src={soldierImageUrl}
                alt="Soldier"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
