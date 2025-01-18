import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome styles for icons

// Importing Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable for Geist font
  subsets: ["latin"], // Subset for Latin characters
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS variable for Geist Mono font
  subsets: ["latin"], // Subset for Latin characters
});

// Metadata for the site
export const metadata: Metadata = {
  title: "Portfolio Website", // Update with your site title
  description: "Welcome to my portfolio site built with Next.js", // Update with your site's description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Using fonts with antialiasing
      >
        {children}
      </body>
    </html>
  );
}
