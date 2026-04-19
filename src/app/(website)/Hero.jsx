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
    <header className="relative bg-white overflow-hidden min-h-screen flex items-center">
      {/* خلفية جمالية خفيفة (Decorative Background) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-cyan-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
          
          {/* Section Info: نصوص واضحة وجذابة */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-cyan-600 leading-[1.1] tracking-tight">
                {data.title}
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-800 leading-[1.2]">
                {data?.subtitle}
              </h2>
            </div>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {data.description}
            </p>
            
            {/* أزرار التفاعل: مع تأثيرات Hover متطورة */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start pt-4">
              <Link href={"/reservations"}  className="bg-cyan-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-cyan-700 transition-all shadow-xl shadow-cyan-100 active:scale-95 flex items-center gap-2">
                <span>📅</span> Prendre rendez-vous
              </Link>
              <button className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-bold hover:border-cyan-600 hover:text-cyan-600 transition-all active:scale-95 shadow-sm">
                Nos Services
              </button>
            </div>

            {/* إحصائيات سريعة (إضافة اختيارية تعطي ثقة) */}
            <div className="pt-10 flex gap-8 justify-center lg:justify-start border-t border-slate-100">
              <div>
                <p className="text-2xl font-bold text-slate-800">10k+</p>
                <p className="text-sm text-slate-500 font-medium">Patients Satisfaits</p>
              </div>
              <div className="w-[1px] bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-slate-800">15+</p>
                <p className="text-sm text-slate-500 font-medium">Ans d'Expérience</p>
              </div>
            </div>
          </div>

          {/* Section Image: تصميم إطار عصري */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative group">
              {/* الإطار المزخرف خلف الصورة */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-[2.5rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              
              <div className="relative h-[450px] md:h-[550px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
                {data.heroImage && (
                  <Image
                    src={data.heroImage}
                    alt={data.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Overlay خفيف */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Hero