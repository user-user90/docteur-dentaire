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
    <header className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* خلفية الصورة */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data?.heroImage} 
          alt="Medical Background"
          fill
          className="object-cover object-center scale-105" // أضفت scale خفيف ليعطي عمقاً
          priority
        />
        {/* تحسين الطبقة الشفافة لتكون أقوى في الموبايل */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent  via-blue-300 to-transparent z-10" />
      </div>

      <div className="flex flex-col items-start justify-start container mx-auto px-6 lg:px-12 relative z-20">
        {/* المحتوى مع أنيماسيون بسيط عبر Tailwind */}
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-cyan-800 leading-[1.1]">
              <span className="text-slate-900 block mb-2">{data.title}</span>
              {data.subtitle}
            </h1>
            <p className="text-xl text-slate-800 font-medium leading-relaxed max-w-xl border-l-4 border-cyan-600 pl-4">
              {data.description}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Link 
              href="/reservations" 
              className=" bg-black text-white  flex items-center  rounded-md py-2 px-4 font-bold hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-200 active:scale-95"
            >
              Prendre rendez-vous
            </Link>
            <button className="bg-white/40 backdrop-blur-md border-2 border-white/60 text-slate-800 py-2 px-4 rounded-md font-extrabold hover:bg-white transition-all shadow-sm">
              Nos Services
            </button>
          </div>

          {/* الإحصائيات مع خلفية زجاجية خفيفة في الموبايل */}
          <div className="flex gap-10 border-t border-slate-300/30">
            <div className="group cursor-default">
              <p className="text-3xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors">10k+</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Patients</p>
            </div>
            <div className="w-[1px] bg-slate-300/50 h-12" />
            <div className="group cursor-default">
              <p className="text-3xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors">15+</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Expérience</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Hero