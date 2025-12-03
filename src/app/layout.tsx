import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Carteira Digital",
  description: "Gerencie suas finanças de forma simples e segura",
};

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased ${inter.className}`}
      >
        {children}

        <Toaster />
      </body>
    </html>
  );
}
