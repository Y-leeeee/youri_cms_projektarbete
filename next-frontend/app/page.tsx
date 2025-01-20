"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "./components/MainMenu";
import Image from "next/image";
import client from "@/lib/contentful";

import { EntrySkeletonType } from "contentful";

interface HomePageFields extends EntrySkeletonType {
  profilePhoto?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  welcomeTitle?: string;
  description?: string;
}

export default function HomePage() {
  const [pageData, setPageData] = useState<HomePageFields | null>(null);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await client.getEntries<HomePageFields>({
          content_type: "homepage",
        });

        if (res.items.length > 0) {
          const page: HomePageFields = res.items[0]
            .fields as unknown as HomePageFields;
          setPageData(page);
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchHomePage();
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
    <div className="homepage bg-black text-white">
      <MainMenu />
      <h1 className="text-4xl font-bold my-6">
        {pageData.welcomeTitle || "Welcome to My Site"}
      </h1>
      {pageData.description && (
        <p className="text-lg mb-6">{pageData.description}</p>
      )}
      {pageData.profilePhoto?.fields.file.url && (
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src={`https:${pageData.profilePhoto.fields.file.url}`}
            alt="Profile"
            width={256}
            height={256}
            priority
          />
        </div>
      )}
    </div>
  );
}
