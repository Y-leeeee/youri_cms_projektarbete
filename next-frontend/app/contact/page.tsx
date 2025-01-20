"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";
import client from "@/lib/contentful";
import { EntrySkeletonType, Entry } from "contentful";

interface ContactFields extends EntrySkeletonType {
  fields: {
    email: string;
    linkedin: string;
    github: string;
  };
  contentTypeId: "contact";
}

type ContactEntry = Entry<ContactFields>;

interface ContactData {
  email: string;
  linkedin: string;
  github: string;
}

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        if (
          !process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
          !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
        ) {
          throw new Error(
            "Contentful environment variables are not set. Please check your .env.local file."
          );
        }

        const res = await client.getEntries<ContactFields>({
          content_type: "contact",
        });

        if (res.items.length === 0) {
          throw new Error("No contact content found.");
        }

        const data = res.items[0].fields;

        setContactData({
          email: data.email,
          linkedin: data.linkedin,
          github: data.github,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching contact data:", error.message);
          setError(error.message);
        } else {
          console.error("Error fetching contact data:", error);
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
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

  if (!contactData) {
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
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{" "}
          <a
            href={contactData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contactData.linkedin}
          </a>
        </li>
        <li>
          <strong>GitHub:</strong>{" "}
          <a
            href={contactData.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contactData.github}
          </a>
        </li>
      </ul>
    </div>
  );
}
