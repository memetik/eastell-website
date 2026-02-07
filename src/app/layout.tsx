import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eastell & Co | Sunshine Coast Real Estate",
  description:
    "Sunshine Coast's premier real estate agency. Selling across Noosa, Coolum, Maroochydore, and 60+ suburbs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
