import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Franklin } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Curtain Bluff — Antigua",
  description:
    "Curtain Bluff is an all-inclusive luxury resort on the southern coast of Antigua.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${libreFranklin.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
