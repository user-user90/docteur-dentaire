import "../../globals.css";
import Link from "next/link"; // 1. استيراد Link

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* القائمة الجانبية */}
      <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl">
        {/* retour home */}
        <Link href={"/"} className="text-sm text-gray-300 border-b ">Accueil</Link>
        <h2 className="text-xl font-bold mt-4 mb-8 border-b border-slate-700 pb-4">
          Tableau de Bord
        </h2>
        
        <nav className="space-y-4">
          {/* 2. تحويل الـ divs إلى Links مع المسارات الصحيحة */}
          
          <Link 
            href="/dashbord/hero" 
            className="block p-2 hover:bg-slate-800 rounded transition-colors"
          >
            Accueil (Hero)
          </Link>

          <Link 
            href="/dashbord/services" 
            className="block p-2 hover:bg-slate-800 rounded transition-colors"
          >
            Services
          </Link>
    
          <Link 
            href="/dashbord/produits" 
            className="block p-2 hover:bg-slate-800 rounded transition-colors"
          >
            Produits
          </Link>
        </nav>
      </aside>

      {/* محتوى الصفحة */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}