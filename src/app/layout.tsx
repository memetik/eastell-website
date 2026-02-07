import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eastell & Co — Sunshine Coast Real Estate",
  description:
    "Sunshine Coast real estate. Noosa to Caloundra and everywhere between.",
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
