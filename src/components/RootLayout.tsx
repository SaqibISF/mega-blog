"use client";
import React from "react";
import { Footer, Header } from "@/components";
import { Provider } from "react-redux";
import store from "@/store";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <div className="min-h-screen flex flex-col w-full">
            <Header />
            <main className="flex-1 flex-shrink-0">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
