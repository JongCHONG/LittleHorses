import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={antonio.className}>
          {children}
      </body>
    </html>
  );
}
