import React from "react"
import { updateDataHero } from "../action"
import { client } from "@/sanity/lib/client"
import Image from "next/image"

async function Dashbord() {
  // جلب البيانات الحالية لعرضها (Server-side fetching)
  const data = await client.fetch(`*[_type == "heroSection"][0]{
    title, 
    description, 
    "imageUrl": heroImage.asset->url
  }`)

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-amber-700 p-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>⚙️</span> Configuration du Hero
          </h1>
          <p className="text-amber-100 text-sm mt-1">Personnalisez l'accueil de votre site web</p>
        </div>

        <form action={updateDataHero} className="p-8 space-y-8">
          
          {/* Section: النصوص */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Titre Principal
              </label>
              <input
                type="text"
                name="title"
                defaultValue={data?.title}
                placeholder="Ex: Bienvenue dans notre clinique"
                className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-100 outline-none transition-all bg-gray-50 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                defaultValue={data?.description}
                placeholder="Décrivez brièvement vos services..."
                className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-100 outline-none transition-all bg-gray-50 resize-none"
              ></textarea>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: الصورة */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
              Image de fond
            </label>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* عرض الصورة الحالية */}
              {data?.imageUrl && (
                <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden border-2 border-amber-100 shadow-sm">
                  <Image 
                    src={data.imageUrl} 
                    alt="Current Hero" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">Actuelle</span>
                  </div>
                </div>
              )}

              {/* زر الرفع الجديد */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  <input 
                    type="file" 
                    name="heroImage" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center group-hover:border-amber-500 group-hover:bg-amber-50 transition-all">
                    <span className="text-amber-700 font-semibold text-sm">
                       + Cliquez pour changer l'image
                    </span>
                    <p className="text-gray-400 text-xs mt-1">PNG, JPG ou WebP (Max 10MB)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              💾 Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Dashbord