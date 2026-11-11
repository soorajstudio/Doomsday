import type { Metadata } from "next";
import "./globals.css";
import Toast from "./components/Toast";

export const metadata: Metadata = {
  title: "AVENGERS: DOOMSDAY — In Cinemas December 18, 2026",
  description: "There is only DOOM. Marvel Studios' Avengers: Doomsday starring Robert Downey Jr. as Victor von Doom. Witness the fall of the Multiverse.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        {children}
        <Toast />
      </body>
    </html>
  );
}
