import type { Metadata } from "next";
import "./globals.css";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getComponents, groupComponents } from "@/lib/meanders-data";
import { MobileMenu } from "@/components/MobileMenu";

export const metadata: Metadata = {
  title: "Meanders.Tools",
  description: "Documentation for Meanders.Tools",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getComponents();
  const groups = groupComponents(data.components);

  return (
    <html lang="en">
      <body>
        <Header />

        <MobileMenu groups={groups} />

        <div className="flex min-h-[calc(100vh-4rem)]">
          <DocsSidebar />

          <main className="min-w-0 flex-1">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
