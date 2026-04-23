import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'

const getdata = async () => {
  const query = `
    *[_type == "heroSection"][0]{
      title,
      subtitle,
      description,
      "heroImage": heroImage.asset->url
    }
  `
  return await client.fetch(query)
}

async function Hero() {
  const data = await getdata()
  if (!data) return null;

  return (
    <header className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#56C3E0]">
      {/* خلفية الصورة */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sa.jpg" 
          alt="Medical Background"
          fill
          className="object-cover object-center " // جعل الصورة تمتزج مع لون الخلفية
          priority
        />
      </div>

      <div className=" mt-10 container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
          
          <div className="space-y-4">
            {/* جعلنا العنوان أبيض بالكامل ليتناسب مع الخلفية الملونة */}
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] drop-shadow-sm">
              <span className="text-slate-900 block mb-2 opacity-90">{data.title}</span>
              {data.subtitle}
            </h1>
            
            {/* نص الوصف بلون كحلي غامق جداً ليكون مقروءاً بوضوح */}
            <p className="text-xl text-slate-900 font-semibold leading-relaxed max-w-xl border-l-4 border-white pl-4">
              {data.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {/* الزر الرئيسي باللون الكحلي ليبرز فوق الخلفية السماوية */}
            <Link 
              href="/reservations" 
              className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-extrabold hover:bg-slate-800 transition-all shadow-2xl active:scale-95"
            >
              Prendre rendez-vous
            </Link>
            
            {/* الزر الثانوي بلون أبيض شفاف (Glassmorphism) */}
            <button className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white px-10 py-5 rounded-2xl font-extrabold hover:bg-white/30 transition-all">
              Nos Services
            </button>
          </div>

          {/* الإحصائيات بألوان متناسقة مع الخلفية */}
          <div className="pt-10 flex gap-10 border-t border-white/30">
            <div className="group cursor-default">
              <p className="text-3xl font-black text-white group-hover:text-slate-900 transition-colors">10k+</p>
              <p className="text-xs font-black text-slate-900/80 uppercase tracking-[0.2em]">Patients</p>
            </div>
            <div className="w-[1px] bg-white/30 h-12" />
            <div className="group cursor-default">
              <p className="text-3xl font-black text-white group-hover:text-slate-900 transition-colors">15+</p>
              <p className="text-xs font-black text-slate-900/80 uppercase tracking-[0.2em]">Expérience</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Hero