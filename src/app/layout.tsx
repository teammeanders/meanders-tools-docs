import type { Metadata } from "next";
import "./globals.css";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  getComponents,
  groupComponents,
  groupParameters,
} from "@/lib/meanders-data";
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

  const componentGroups = groupComponents(data.components);

  const parameterGroups = groupParameters(data.parameters);

  return (
    <html lang="en">
      <body>
        <Header />
        <MobileMenu
          componentGroups={componentGroups}
          parameterGroups={parameterGroups}
        />

        <div className="flex min-h-[calc(100vh-4rem)]">
          <DocsSidebar />

          <main className="min-w-0 flex-1">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
