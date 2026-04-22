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
    <header className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white">
      {/* 1. الخلفية - مع تحسين التموضع */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/dcc2.jpg" 
          alt="Medical Background"
          fill
          className="object-cover object-center" 
          priority
        />
        {/* طبقة بيضاء خفيفة (Radial Gradient) لتفتيح الوسط وضمان وضوح النص */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] md:backdrop-blur-0" />
      </div>

      {/* 2. المحتوى - متمحور في الوسط ليتناسب مع وقفة الطبيب */}
      <div className="my-12 md:my-0 container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in zoom-in duration-1000">
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-tight tracking-tighter">
              <span className="text-cyan-700">{data.title}</span>
              <br />
              {data.subtitle}
            </h1>
            
            {/* وصف بلمسة عصرية يتوسط الشاشة */}
            <p className="text-xl md:text-2xl text-slate-800 font-semibold max-w-2xl mx-auto leading-relaxed px-4 py-2 bg-white/50 backdrop-blur-sm rounded-2xl">
              {data.description}
            </p>
          </div>

          {/* أزرار تفاعلية متمحورة */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
            <Link 
              href="/reservations" 
              className="bg-cyan-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-200 active:scale-95 w-full sm:w-auto text-lg"
            >
              Prendre rendez-vous
            </Link>
            <button className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl w-full sm:w-auto text-lg">
              Nos Services
            </button>
          </div>

          {/* الإحصائيات متمحورة في الأسفل */}
          <div className="pt-12 flex justify-center gap-12 border-t border-slate-200/60 max-w-lg mx-auto">
            <div className="text-center">
              <p className="text-4xl font-black text-slate-900">10k+</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Patients</p>
            </div>
            <div className="w-[1px] bg-slate-300 h-14" />
            <div className="text-center">
              <p className="text-4xl font-black text-slate-900">15+</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Expérience</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Hero