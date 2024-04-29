import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIP Calculator - Systematic Investment Plan Calculator Online",
  description:
    "SIP Calculator - Systematic Investment Plan calculator is a tool that helps you determine the returns you can avail when parking your funds in such investment tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="xS6z7cPlnipI4ebrj2O5e68TLXF8NXfjrf8A_qGR4zk"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
