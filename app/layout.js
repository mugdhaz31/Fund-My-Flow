import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { DarkModeProvider } from "./context/DarkModeContext";
import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";
import localFont from "next/font/local";

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

export const metadata = {
  title: "Fund My Flow",
  description: "Fund My Flow allows creators to receive support from their fans and followers. Whether you're an artist, writer, musician, or influencer, fund your passion and fuel your creativity with easy contributions. Join now and make your creative journey sustainable!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="antialiased transition-colors duration-300">
        <SessionWrapper>
          <DarkModeProvider>
            <Navbar />
            <div className="min-h-[71vh]">{children}</div>
            <Footer />
          </DarkModeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
