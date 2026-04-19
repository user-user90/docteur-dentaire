import Link from "next/link"

function Navbar() {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
        
        {/* Logo - تحسين تباعد الحروف والوزن */}
        <Link href={"/"} className="text-2xl font-extrabold tracking-tight">
          <span className="text-cyan-600">Docteur</span>
          <span className="text-slate-800">Sourire</span>
        </Link>

        {/* Links - إضافة خط سفلي ناعم عند التمرير */}
        <ul className="hidden md:flex items-center gap-10">
          {['Accueil', 'Réserver', 'Services'].map((item) => (
            <li key={item}>
              <Link 
                href={item === 'Réserver' ? "/reservations" : "/"} 
                className="text-[16px] font-semibold text-slate-600 hover:text-cyan-600 transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button - تنسيق يتناسب مع أزرار الهيرو */}
        <div className="flex items-center gap-4">
          <Link 
            href={"/"} 
            className="hidden sm:block bg-slate-900 text-white px-7 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-100 active:scale-95"
          >
            Contact
          </Link>
          
          {/* أيقونة للجوال (تبسيط) */}
          <button className="md:hidden text-slate-800">
           menu
          </button>
        </div>

      </nav>
    </div>
  )
}

export default Navbar