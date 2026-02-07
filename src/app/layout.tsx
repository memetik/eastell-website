import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eastell & Co — Sunshine Coast Real Estate",
  description:
    "Premium property across the Sunshine Coast. Noosa to Caloundra. Personal service, local knowledge, exceptional results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
