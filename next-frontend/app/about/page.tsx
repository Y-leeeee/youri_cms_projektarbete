"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

interface AboutData {
  institution_name_1?: string;
  degree_1?: string;
  completion_year_1?: string;
  institution_name_2?: string;
  degree_2?: string;
  completion_year_2?: string;
  institution_name_3?: string;
  degree_3?: string;
  completion_year_3?: string;
  job_title_1?: string;
  company_1?: string;
  years_of_service_1?: string;
  job_title_2?: string;
  company_2?: string;
  years_of_service_2?: string;
  job_title_3?: string;
  company_3?: string;
  years_of_service_3?: string;
  job_title_4?: string;
  company_4?: string;
  years_of_service_4?: string;
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutPage() {
      try {
        const res = await fetch(
          "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/pages?slug=about"
        );

        if (!res.ok) {
          console.error(
            "Failed to fetch About page:",
            res.status,
            res.statusText
          );
          return;
        }

        const pages = await res.json();
        const aboutPage = pages[0];

        if (aboutPage.acf) {
          setAboutData(aboutPage.acf);
        }
      } catch (error) {
        console.error("Unexpected error fetching About page:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAboutPage();
  }, []);

  if (isLoading) {
    return <div>Loading About page...</div>;
  }

  if (!aboutData) {
    return <div>No About data found.</div>;
  }

  return (
    <div>
      <MainMenu />
      <h1>About Me</h1>
      <p>Hi, I’m a frontend developer. This is my portfolio site!</p>

      {/* Education Section */}
      <h2>Education</h2>
      {aboutData.institution_name_1 && (
        <div>
          <h3>{aboutData.institution_name_1}</h3>
          <p>{aboutData.degree_1}</p>
          <p>{aboutData.completion_year_1}</p>
        </div>
      )}
      {aboutData.institution_name_2 && (
        <div>
          <h3>{aboutData.institution_name_2}</h3>
          <p>{aboutData.degree_2}</p>
          <p>{aboutData.completion_year_2}</p>
        </div>
      )}
      {aboutData.institution_name_3 && (
        <div>
          <h3>{aboutData.institution_name_3}</h3>
          <p>{aboutData.degree_3}</p>
          <p>{aboutData.completion_year_3}</p>
        </div>
      )}

      {/* Work Experience Section */}
      <h2>Work Experience</h2>
      {aboutData.job_title_1 && (
        <div>
          <h3>{aboutData.job_title_1}</h3>
          <p>{aboutData.company_1}</p>
          <p>{aboutData.years_of_service_1}</p>
        </div>
      )}
      {aboutData.job_title_2 && (
        <div>
          <h3>{aboutData.job_title_2}</h3>
          <p>{aboutData.company_2}</p>
          <p>{aboutData.years_of_service_2}</p>
        </div>
      )}
      {aboutData.job_title_3 && (
        <div>
          <h3>{aboutData.job_title_3}</h3>
          <p>{aboutData.company_3}</p>
          <p>{aboutData.years_of_service_3}</p>
        </div>
      )}
      {aboutData.job_title_4 && (
        <div>
          <h3>{aboutData.job_title_4}</h3>
          <p>{aboutData.company_4}</p>
          <p>{aboutData.years_of_service_4}</p>
        </div>
      )}
    </div>
  );
}
