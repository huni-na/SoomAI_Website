import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoomAI",
  description: "SoomAI는 아이디어에 AI를 결합하여 상상하는 모든 서비스를 현실로 만듭니다.",
  icons: {
    icon: "/img/Logo_only_square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}