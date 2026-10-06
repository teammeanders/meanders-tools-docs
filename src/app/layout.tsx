import type { Metadata } from "next";
import "./globals.css";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Meanders.Tools",
  description: "Documentation for Meanders.Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex min-h-screen">
          <DocsSidebar />

          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
