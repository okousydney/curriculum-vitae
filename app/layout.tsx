import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Curriculum-Vitae",
  description: "Publish your detailed resume or consult others'",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{ variables: { colorPrimary: "#624cf5" } }}
    >
      <html lang="en">
        <body className={`font-sans font-medium antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
