import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import "./globals.css";
import ClientProviders from "./clientProviders";

const antonio = Antonio({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Little Horses",
  description: "A board game application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${antonio.className} min-h-screen-safe`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
