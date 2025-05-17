
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "./userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const getLato = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RiderIssue",
  description: "An ultimate solution for rider's day to day issue solving",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${getLato.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
