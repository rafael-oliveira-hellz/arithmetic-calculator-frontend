"use client";

import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "./providers/AppProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
  withHtmlAndBody = true,
}: {
  children: React.ReactNode;
  withHtmlAndBody?: boolean;
}) {
  if (withHtmlAndBody) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    );
  }

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AppProvider>{children}</AppProvider>
    </div>
  );
}
