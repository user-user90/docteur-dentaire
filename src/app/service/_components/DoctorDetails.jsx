"use client"; 
import { useEffect } from "react";
import Image from "next/image";

export default function DoctorDetails({ data }) {
  
  // هذا الجزء سيجبر الصفحة على الصعود للأعلى فور التحميل
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="flex flex-col pb-32">
        {/* Hero Section */}
        <div className="relative h-[300px] lg:h-[500px] w-full">
          {data.urlImage && (
            <Image
              src={data.urlImage}
              alt={data.title}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* القسم الأول: العنوان والوصف */}
        <div className="container mx-auto px-4 lg:px-20 flex flex-col items-start justify-start text-start">
          <div className="flex items-center gap-4 mt-10 mb-6">
            <span className="text-3xl lg:text-5xl leading-none">
              {data?.emoji}
            </span>
            {data.title && (
              <h2 className="font-extrabold text-2xl lg:text-4xl text-gray-800">
                {data?.title}
              </h2>
            )}
          </div>
          <p className="whitespace-pre-line text-gray-700 max-w-3xl text-lg leading-relaxed mb-12">
            {data?.description}
          </p>
        </div>

        {/* القسم الثاني: الصورة والمعلومات الفرعية */}
        <div className="container mx-auto px-4 flex flex-col items-start md:justify-center md:items-center">
          {data.subImage && (
            <div className="relative w-full max-w-[600px] aspect-video">
              <Image
                src={data.subImage}
                alt="sub-detail"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          )}
          <div className="mt-8 flex flex-col items-center">
            {data.subtitle && (
              <h3 className="text-2xl text-center font-bold text-gray-800 mb-4">
                {data?.subtitle}
              </h3>
            )}
            {data.subDesc && (
              <p className="whitespace-pre-wrap text-start md:text-center text-gray-700 max-w-3xl text-lg leading-relaxed">
                {data?.subDesc}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}