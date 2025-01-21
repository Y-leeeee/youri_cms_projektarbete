"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";
import client from "@/lib/contentful";
import { EntrySkeletonType, Entry } from "contentful";

interface EducationEntry {
  institutionName: string;
  degree: string;
  completionYear: string;
}

interface WorkExperienceEntry {
  jobTitle: string;
  company: string;
  yearOfService: string;
}

interface AboutFields extends EntrySkeletonType {
  fields: {
    education?: EducationEntry[];
    workExperience?: WorkExperienceEntry[];
  };
  contentTypeId: "aboutMe";
}

type AboutEntry = Entry<AboutFields>;

interface AboutData {
  education?: EducationEntry[];
  workExperience?: WorkExperienceEntry[];
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        if (
          !process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
          !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
        ) {
          throw new Error(
            "Contentful environment variables are not set. Please check your .env.local file."
          );
        }

        const res = await client.getEntries<AboutFields>({
          content_type: "aboutMe",
        });

        if (!res.items.length) {
          throw new Error("No about page content found.");
        }

        const data = res.items[0].fields;

        setAboutData({
          education: data.education || [],
          workExperience: data.workExperience || [],
        });
      } catch (err) {
        console.error("Error fetching About page:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
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

      {/* Education Section */}
      {aboutData.education && aboutData.education.length > 0 && (
        <div>
          <h2>Education</h2>
          <ul>
            {aboutData.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.institutionName}</strong>: {edu.degree} (
                {edu.completionYear})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Work Experience Section */}
      {aboutData.workExperience && aboutData.workExperience.length > 0 && (
        <div>
          <h2>Work Experience</h2>
          <ul>
            {aboutData.workExperience.map((work, index) => (
              <li key={index}>
                <strong>{work.jobTitle}</strong> at {work.company} (
                {work.yearOfService})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
