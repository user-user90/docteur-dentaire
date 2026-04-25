import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./(website)/Navbar";
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
  title: "Docteur Sourire | Clinique Dentaire",
  description: "Soins dentaires de haute qualité pour un sourire éclatant.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr" // اللغة الفرنسية للمحتوى
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-white text-slate-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
          <Footer/>
        
        {/* يمكنك إضافة Footer هنا لاحقاً */}
      </body>
    </html>
  );
}