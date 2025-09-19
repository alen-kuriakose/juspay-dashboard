import { ThemeProvider } from "@/components/themes-provider";
import type { Metadata } from "next";
import { Inter, Sora, Space_Mono } from "next/font/google";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font_inter",
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font_spaceMono",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font_sora",
});

export const metadata: Metadata = {
  title: "Dashboard assignment",
  description: "Ecommerce dashboard for Juspay Technologies ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${sora.variable} ${space_mono.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
