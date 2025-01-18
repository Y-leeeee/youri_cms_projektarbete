"use client";

import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";

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
      } catch (error) {
        console.error("Error fetching services:", error);
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
        <p>Loading services...</p>
      </div>
    );

  return (
    <div>
      <MainMenu />
      <div className="page-content">
        <h1>My Services</h1>
        <div className="services-grid">
          {services.length === 0 ? (
            <p>No services available</p>
          ) : (
            services.map((service) => (
              <div key={service.id} className="service-card">
                <h2>
                  {service.acf.service_name || "No service name provided"}
                </h2>
                <p>
                  {service.acf.service_description ||
                    "No description available"}
                </p>
                {service.acf.service_icon ? (
                  <img
                    src={service.acf.service_icon}
                    alt={service.acf.service_name}
                    width={100}
                  />
                ) : (
                  <p>No icon available</p>
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
