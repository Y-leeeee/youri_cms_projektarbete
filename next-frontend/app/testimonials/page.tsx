"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";
import Image from "next/image";

interface Testimonial {
  id: number;
  title: { rendered: string };
  acf: {
    feedback: string;
    associated_project?: { post_title: string };
    client_image?: { url: string };
  };
}

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials`);
        if (!res.ok) {
          throw new Error(`Failed to fetch testimonials: ${res.statusText}`);
        }
        const data = await res.json();
        setTestimonials(data);
      } catch (error: unknown) {
        console.error("Error fetching testimonials:", error);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTestimonials();
  }, [API_BASE_URL]);

  if (isLoading) {
    return (
      <div>
        <MainMenu />
        <p className="text-center mt-6">Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <MainMenu />
        <p className="text-center text-red-500 mt-6">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <MainMenu />
      <div className="page-content container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6">Testimonials</h1>
        {testimonials.length === 0 ? (
          <p className="text-center">No testimonials available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial bg-white shadow-md rounded-lg p-4 text-center"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {testimonial.title.rendered || "No title available"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {testimonial.acf.feedback || "No feedback available"}
                </p>
                {testimonial.acf.associated_project && (
                  <p className="text-gray-600 mb-4">
                    Associated Project:{" "}
                    {testimonial.acf.associated_project.post_title}
                  </p>
                )}
                {testimonial.acf.client_image?.url ? (
                  <div className="relative w-20 h-20 mx-auto">
                    <Image
                      src={testimonial.acf.client_image.url}
                      alt={testimonial.title.rendered || "Client Image"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">No client image available.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;
