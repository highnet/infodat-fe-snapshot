import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WienerMelangeProvider from "@/components/WienerMelangeProvider";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Infodat Wien",
  description: "Informationsdatenbank des Wiener Landtages und Gemeinderates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="root">
          <WienerMelangeProvider>
            <Header />
            {children}
            <Contact />
            <Footer />
          </WienerMelangeProvider>
        </div>
      </body>
    </html>
  );
}
