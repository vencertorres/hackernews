import Nav from "@/components/Nav";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s | Hacker News",
    default: "Hacker News",
  },
  description: "A Hacker News clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="mx-auto max-w-[50rem] p-4 text-neutral-800">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
