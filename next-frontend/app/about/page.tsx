"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

interface AboutData {
  description?: string;
  institution_name_1?: string;
  degree_1?: string;
  completion_year_1?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/pages?slug=about`);
        if (!res.ok) {
          throw new Error(`Failed to fetch About page: ${res.statusText}`);
        }
        const data = await res.json();
        setAboutData(data[0]?.acf || null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching About page:", error.message);
          setError(error.message);
        } else {
          console.error("Error fetching About page:", error);
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  if (isLoading) {
    return (
      <div>
        <MainMenu />
        <div className="spinner">
          <p role="status" aria-live="polite">
            Loading...
          </p>
        </div>
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

  if (!aboutData) {
    return (
      <div>
        <MainMenu />
        <p>No about information available.</p>
      </div>
    );
  }

  return (
    <div>
      <MainMenu />
      <h1>About Me</h1>
      <p>{aboutData.description ?? "Description not available."}</p>

      {aboutData.institution_name_1 && (
        <div>
          <h2>Education</h2>
          <ul>
            <li>
              <strong>{aboutData.institution_name_1}</strong>:{" "}
              {aboutData.degree_1} ({aboutData.completion_year_1})
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
