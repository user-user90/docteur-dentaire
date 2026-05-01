"use client"
import { useState } from "react" 
import Link from "next/link"
import { usePathname } from "next/navigation"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false) 
  const pathname = usePathname()

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Réserver", href: "/reservations" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const hideNavbarPaths = ['/studio', '/reservations'];

if (hideNavbarPaths.some(path => pathname.startsWith(path))) {
  return null;
}

  return (
    <header className="w-full z-50 relative">
      {/* ## navbar top  */}
      <div className="bg-cyan-400 py-2 md:h-12 flex items-center relative z-20">
        <div className="container mx-auto  flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex items-center">
            <span className="text-sm font-semibold text-slate-900 tracking-wide uppercase">
              Bienvenue chez Centre Médical 
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-[13px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>24h/24 7j/7</span>
            </div>

            <a href="tel:+212500000000" className="flex items-center gap-2 text-slate-900 font-bold text-[13px] hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.18-2.18a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2z"/></svg>
              <span>+212 5XX XX XX XX</span>
            </a>
          </div>
        </div>
      </div>

       {/* ## navbar links */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 relative z-20">
        <nav className="container mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link className="font-black text-xl md:text-2xl tracking-tighter text-slate-900" href="/">
            Centre<span className="text-cyan-700 text-[16px] md:text-[18px] ">  Médical</span> 
          </Link>

          {/* Desktop Links */}
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

          <div className="flex items-center gap-4">
            {/* rdv*/}
            <Link 
              className="hidden sm:block bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95 text-sm" 
              href="/reservations"
            >
              RDV
            </Link>

            {/* Mobile Menu Button */}
            <button 
            aria-label="toggel-menu"
              onClick={toggleMenu}
              className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </nav>
      </div>

  
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      />

<aside className={`fixed top-0 buttom-0 h-full w-full bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out md:hidden ${isOpen ? "translate-y-0" : "translate-y-full"}`}>        <div className="flex flex-col h-full p-8">
          <button 
          aria-label="close-menu"
            onClick={closeMenu}
            className="self-end p-2 mb-8 text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* ## link menu version mobil */}
          <ul className="flex flex-col gap-4">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  onClick={closeMenu}
                  className={`block px-4 py-3 text-lg font-bold rounded-xl transition-all ${
                    pathname === link.href 
                    ? "text-cyan-600 bg-cyan-50" 
                    : "text-slate-700 hover:bg-slate-50"
                  }`}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
             <Link 
              onClick={closeMenu}
              className="block w-full bg-slate-900 text-white font-bold px-6 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-md text-center" 
              href="/reservations"
            >
              Réserver RDV
            </Link>
          </div>
        </div>
      </aside>
    </header>
  )
}

export default Navbar