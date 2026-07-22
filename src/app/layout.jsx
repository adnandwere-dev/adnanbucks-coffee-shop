import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// إعداد خطوط جوجل لتناسب الهوية البصرية الفاخرة للمقهى
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

// إعدادات الـ Metadata لتحسين SEO
export const metadata = {
  title: "AdnanBucks | Premium Artisanal Roastery",
  description:
    "Experience the finest single-origin beans, roasted to perfection in our boutique roastery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${dmSans.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>

      <body className="min-h-screen flex flex-col bg-surface">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
