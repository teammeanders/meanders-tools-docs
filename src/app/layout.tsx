import type { Metadata } from "next";
import "./globals.css";
import { DocsSidebar } from "@/components/DocsSidebar";

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
        <div className="flex min-h-screen">
          <DocsSidebar />

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
