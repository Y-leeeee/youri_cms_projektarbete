"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

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

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(
          "http://localhost:8888/cms_projektarbete/wordpress/wp-json/wp/v2/testimonials"
        );
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <MainMenu />
      <div className="page-content">
        <h1>Testimonials</h1>
        {testimonials.length === 0 ? (
          <p>No testimonials available.</p>
        ) : (
          <div>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial">
                <h2>{testimonial.title.rendered}</h2>
                <p>{testimonial.acf.feedback}</p>
                {testimonial.acf.associated_project && (
                  <p>
                    Associated Project:{" "}
                    {testimonial.acf.associated_project.post_title}
                  </p>
                )}
                {testimonial.acf.client_image && (
                  <img
                    src={testimonial.acf.client_image.url}
                    alt={testimonial.title.rendered}
                    width={100}
                  />
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
