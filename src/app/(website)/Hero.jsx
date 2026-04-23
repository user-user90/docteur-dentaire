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
  if (!data || !data.heroImage) return null;

  return (
    <header className="relative w-full h-screen overflow-hidden flex items-center">
      {/* 1. الصورة كخلفية كاملة */}
      <Image
        src={data.heroImage}
        alt={data.title}
        fill
        className="object-cover z-0"
        priority
      />

      {/* 2. طبقة تغميق (Overlay) لضمان وضوح الخط */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* 3. محتوى النصوص والأزرار */}
      <div className="container mx-auto px-6 relative z-20 text-center md:text-left">
        <div className="max-w-3xl space-y-6">
          
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              {data.title}
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-cyan-400">
              {data.subtitle}
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed font-medium">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-6 justify-center md:justify-start">
            <Link 
              href="/reservations" 
              className="bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-600 transition-all shadow-lg active:scale-95"
            >
              Prendre RDV
            </Link>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              Nos Services
            </button>
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Hero