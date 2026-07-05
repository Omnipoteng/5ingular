import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5ingular Graphic | Creative Digital Agency",
  description: "Bespoke digital design, premium branding systems, motion graphics, and high-performance websites for ambitious brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
