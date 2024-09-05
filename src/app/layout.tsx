import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpaceTraders API Project",
  description: "A project to interact with the SpaceTraders API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CookiesProvider>
        <body className={inter.className}>{children}</body>
      </CookiesProvider>
    </html>
  );
}
