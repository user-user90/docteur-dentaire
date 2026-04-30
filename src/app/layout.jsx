import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./(website)/_components/Navbar";
import Footer from "./(website)/_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Centre Médical | Centre Médical & Clinique Dentaire",
  description: "Centre médical et clinique dentaire multidisciplinaire. Prenez rendez-vous en ligne pour des soins de santé et dentaires de haute qualité.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-white text-slate-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}