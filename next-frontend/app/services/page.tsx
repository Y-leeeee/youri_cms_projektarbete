"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";
import Image from "next/image";

interface Service {
  id: number;
  title: { rendered: string };
  acf: {
    service_name: string;
    service_description: string;
    service_icon?: string;
  };
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        if (!res.ok) {
          throw new Error(`Failed to fetch services: ${res.statusText}`);
        }
        const data = await res.json();
        setServices(data);
      } catch (error: unknown) {
        console.error("Error fetching services:", error);
        setError("Failed to load services. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, [API_BASE_URL]);

  if (isLoading)
    return (
      <div>
        <MainMenu />
        <p className="text-center mt-6">Loading services...</p>
      </div>
    );

  if (error)
    return (
      <div>
        <MainMenu />
        <p className="text-center text-red-500 mt-6">{error}</p>
      </div>
    );

  return (
    <div>
      <MainMenu />
      <div className="page-content container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6">My Services</h1>
        <div className="services-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 ? (
            <p className="text-center">No services available</p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="service-card bg-white shadow-md rounded-lg p-4 text-center"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {service.acf.service_name || "No service name provided"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {service.acf.service_description ||
                    "No description available"}
                </p>
                {service.acf.service_icon ? (
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={service.acf.service_icon}
                      alt={service.acf.service_name || "Service Icon"}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">No icon available</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
