"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

interface AcfData {
  profile_image: number;
  email: string;
  github_url: string;
  linkedin_url: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2";

export default function ContactPage() {
  const [acfData, setAcfData] = useState<AcfData | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContactData() {
      try {
        const response = await fetch(`${API_BASE_URL}/pages?slug=contact`);

        if (!response.ok) {
          throw new Error(
            `Error fetching contact data: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.length > 0 && data[0].acf) {
          setAcfData(data[0].acf);

          if (data[0].acf.profile_image) {
            const imageResponse = await fetch(
              `${API_BASE_URL}/media/${data[0].acf.profile_image}`
            );

            if (!imageResponse.ok) {
              throw new Error(
                `Error fetching profile image: ${imageResponse.statusText}`
              );
            }

            const imageData = await imageResponse.json();
            setProfileImageUrl(imageData.source_url);
          }
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchContactData();
  }, []);

  if (loading) {
    return (
      <div>
        <MainMenu />
        <p>Loading contact information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <MainMenu />
        <p>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!acfData) {
    return (
      <div>
        <MainMenu />
        <p>Contact information is not available.</p>
      </div>
    );
  }

  return (
    <div>
      <MainMenu />
      <div className="contact-container">
        {/* Profile Image */}
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="profile-picture"
          />
        )}

        {/* Contact Icons */}
        <div className="contact-icons">
          <a
            href={`mailto:${acfData.email}`}
            aria-label="Send an Email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-envelope"></i>
          </a>

          <a
            href={acfData.github_url}
            aria-label="Visit GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>

          <a
            href={acfData.linkedin_url}
            aria-label="Visit LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
