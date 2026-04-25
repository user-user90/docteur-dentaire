import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { TbDentalBroken, TbStethoscope, TbEye, TbBone, TbDroplet } from "react-icons/tb";
import { GiHeartBeats } from "react-icons/gi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";
import Link from "next/link";

const getdata = async () => {
  const query = `
    *[_type == "Services"] | order(order asc) {
      title,
      description,
      "urlImage": urlImage.asset->url
    }
  `;
  return await client.fetch(query);
};

async function Services() {
  const data = await getdata();
  console.log(data);
  if (!data || data.length < 4) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="inline-block border px-6 py-2 mb-6 text-2xl font-bold uppercase tracking-widest text-gray-800">
            Services
          </h1>
          <p className="text-3xl lg:text-4xl font-medium w-full lg:max-w-2xl mx-auto text-gray-900 leading-tight">
            Sentez-vous comme chez vous avec les meilleurs soins médicaux
          </p>
        </div>

        {/* Grid System (8 Blocks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* ## Dentaire */}
          <div className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md">
            <span className="absolute top-8 left-5 text-7xl text-[#00D3F2] opacity-40">
              <TbDentalBroken />
            </span>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
              {data[7].title}
            </h2>
            <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
              {data[7].description}
            </p>
            <Link
              href="/"
              className="absolute bottom-10 flex items-center gap-1 text-gray-600 font-bold hover:text-gray-800 transition-colors"
            >
              Lire la suite <FaAnglesRight />
            </Link>
          </div>
          {/* ## image */}
          <div className="h-[350px] relative overflow-hidden shadow-md">
            <Image
              src={data[0].urlImage}
              alt="service"
              fill
              className="object-cover"
            />
          </div>
          {/* ## Cardiologie */}
          <div className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md">
            <span className="absolute top-8 left-5 text-7xl text-[#FF5A5F] opacity-40">
              <GiHeartBeats />
            </span>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
              {data[6].title}
            </h2>
            <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
              {data[6].description}
            </p>
            <Link
              href="/"
              className="absolute bottom-10 flex items-center gap-1  text-gray-600 font-bold hover:text-gray-800 transition-colors"
            >
              Lire la suite <FaAnglesRight />
            </Link>
          </div>
          {/* ## Soins des yeux */}
          <div className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md">
            <span className="absolute top-8 left-5 text-7xl text-[#0FE3AF] opacity-40">
              <TbEye />
            </span>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
              {data[3].title}
            </h2>
            <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
              {data[3].description}
            </p>
            <Link
              href="/"
              className="absolute bottom-10 flex items-center gap-1  text-gray-600 font-bold hover:text-gray-800 transition-colors"
            >
              Lire la suite <FaAnglesRight />
            </Link>
          </div>

          {/* #### ICON ##  */}
          <span className="flex text-9xl h-12 items-center justify-center text-[#0FE3AF] my-10 opacity-25 md:hidden">
            <TbActivityHeartbeat />
          </span>
          {/* ## Orthopédie */}
          <div className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md">
            <span className="absolute top-8 left-5 text-7xl text-[#8B4513] opacity-40">
              <TbBone />
            </span>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
              {data[2].title}
            </h2>
            <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
              {data[2].description}
            </p>
            <Link
              href="/"
              className="absolute bottom-10 flex items-center gap-1  text-gray-600 font-bold hover:text-gray-800 transition-colors"
            >
              Lire la suite <FaAnglesRight />
            </Link>
          </div>

          {/* ## Endocrinologie */}
          <div className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md">
            <span className="absolute top-8 left-5 text-7xl text-[#FF8C00] opacity-40">
              <TbDroplet />
            </span>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
              {data[4].title}
            </h2>
            <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
              {data[4].description}
            </p>
            <Link
              href="/"
              className="absolute bottom-10 flex items-center gap-1  text-gray-600 font-bold hover:text-gray-800 transition-colors"
            >
              Lire la suite <FaAnglesRight />
            </Link>
          </div>

          {/* ## Angioplastie */}
          <div className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md">
            <span className="absolute top-8 left-5 text-7xl text-[#DC143C] opacity-40">
              <TbActivityHeartbeat />
            </span>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
              {data[5].title}
            </h2>
            <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
              {data[5].description}
            </p>
            <Link
              href="/"
              className="absolute bottom-10 flex items-center gap-1  text-gray-600 font-bold hover:text-gray-800 transition-colors"
            >
              Lire la suite <FaAnglesRight />
            </Link>
          </div>

          {/* المربع 6: صورة */}
          <div className="h-[350px] relative overflow-hidden shadow-md">
            <Image
              src={data[1].urlImage}
              alt="service"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Services;