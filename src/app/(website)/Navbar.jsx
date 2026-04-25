"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

function Navbar() {
  const links = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/" },
    { name: "Réserver", href: "/reservations" },
    { name: "Produits", href: "/produits" },
  ];

  const pathname = usePathname()
  
  // إخفاء الـ Navbar داخل السانتي استوديو
  if (pathname.startsWith('/studio')) return null

  return (
    <header className="w-full z-50">
      {/* 1. الشريط العلوي (Top Bar) */}
      <div className="bg-cyan-400 py-2 md:h-12 flex items-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          
          {/* اسم العيادة أو شعار صغير */}
          <div className="flex items-center">
            <span className="text-lg font-black text-slate-900 tracking-tighter uppercase">
              Bienvenue Clinic
            </span>
          </div>

          {/* أوقات العمل والاتصال */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-slate-900 font-bold text-[13px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Lun - Ven: 09:00 - 18:00</span>
            </div>

            <a href="tel:+212500000000" className="flex items-center gap-2 text-slate-900 font-bold text-[13px] hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.18-2.18a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2z"/></svg>
              <span>+212 5XX XX XX XX</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. شريط التنقل الرئيسي (Main Navbar) */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <nav className="container mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link className="font-black text-2xl tracking-tighter text-slate-900" href="/">
            DOCTOR<span className="text-cyan-500">.</span>
          </Link>

          {/* Links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className={`px-4 py-2 font-bold transition-all rounded-lg ${
                    pathname === link.href 
                    ? "text-cyan-600 bg-cyan-50" 
                    : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
                  }`}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Call to Action */}
          <Link 
            className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95 text-sm" 
            href="/reservations"
          >
            Réserver
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar