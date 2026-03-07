import type { Metadata, Viewport } from "next";
import "./globals.css";
import SWRegister from "@/components/SWRegister";

export const metadata: Metadata = {
  title: "Memory Helper",
  description: "Never forget a familiar face",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Memory Helper",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        {children}
        <SWRegister />
      </body>
    </html>
  );
}
