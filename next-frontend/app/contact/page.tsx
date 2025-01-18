"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

interface AcfData {
  email?: string;
  github_url?: string;
  linkedin_url?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ContactPage() {
  const [acfData, setAcfData] = useState<AcfData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactPage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/pages?slug=contact`);
        if (!res.ok) {
          throw new Error(`Failed to fetch Contact page: ${res.statusText}`);
        }
        const data = await res.json();
        setAcfData(data[0]?.acf || null);
      } catch (error: any) {
        console.error("Error fetching Contact page:", error);
        setError(error.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactPage();
  }, []);

  if (isLoading) {
    return (
      <div>
        <MainMenu />
        <p>Loading...</p>
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
        <p>No contact information available.</p>
      </div>
    );
  }

  return (
    <div>
      <MainMenu />
      <h1>Contact</h1>
      <p>Email: {acfData.email || "Not available"}</p>
      {acfData.github_url && (
        <p>
          GitHub: <a href={acfData.github_url}>{acfData.github_url}</a>
        </p>
      )}
      {acfData.linkedin_url && (
        <p>
          LinkedIn: <a href={acfData.linkedin_url}>{acfData.linkedin_url}</a>
        </p>
      )}
    </div>
  );
}
