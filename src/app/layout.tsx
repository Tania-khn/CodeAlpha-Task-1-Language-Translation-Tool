import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Smarter, Translate Better with Tania - AI-Powered Language Translation",
  description: "Translate text between 36+ languages with AI-powered accuracy. Features auto-detect, text-to-speech, and instant copy.",
  keywords: ["translation", "language", "AI", "translate", "multilingual", "text-to-speech", "Learn Smarter, Translate Better with Tania"],
  authors: [{ name: "Learn Smarter, Translate Better with Tania" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Learn Smarter, Translate Better with Tania",
    description: "AI-powered language translation with 36+ languages",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Smarter, Translate Better with Tania",
    description: "AI-powered language translation with 36+ languages",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
