import { client } from "@/sanity/lib/client";
import Image from "next/image";

const getdata = async () => {
  const query = `
    *[_type == "Services"]{
      title,
      description,
      "urlImage":urlImage.asset->url
    }
  `;
  return await client.fetch(query);
};

async function Services() {
  const data = await getdata();
  if (!data || data.length < 4) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="inline-block border px-6 py-2 mb-6 text-2xl font-bold uppercase tracking-widest">
            Services
          </h1>
          <p className="text-3xl lg:text-4xl font-medium w-sm lg:max-w-md mx-auto">
            Sentez-vous comme chez vous avec les meilleurs soins médicaux
          </p>
        </div>

        {/* Grid System (8 Blocks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Row 1 */}
          <div className="h-[350px] bg-gray-200 p-8 flex flex-col justify-center shadow-md ">
            <h2 className="text-xl font-bold mb-4">{data[0].title}</h2>
            <p className="text-sm line-clamp-5">{data[0].description}</p>
          </div>

          <div className="h-[350px] bg-gray-200 p-8 flex flex-col justify-center shadow-md ">
            <h2 className="text-xl font-bold mb-4">{data[2].title}</h2>
            <p className="text-sm line-clamp-5">{data[2].description}</p>
          </div>

          <div className="h-[350px] bg-gray-200 p-8 flex flex-col justify-center shadow-md ">
            <h2 className="text-xl font-bold mb-4">{data[3].title}</h2>
            <p className="text-sm line-clamp-5">{data[3].description}</p>
          </div>

          <div className="h-[350px] relative  overflow-hidden">
            <Image
              src={data[1].urlImage}
              alt="service"
              fill
              className="object-cover"
            />
          </div>

          {/* Row 2 */}
          <div className="h-[350px] bg-gray-200 p-8 flex flex-col justify-center shadow-md ">
            <h2 className="text-xl font-bold mb-4">{data[0].title}</h2>
            <p className="text-sm line-clamp-5">{data[0].description}</p>
          </div>

          <div className="h-[350px] relative  overflow-hidden">
            <Image
              src={data[1].urlImage}
              alt="service"
              fill
              className="object-cover"
            />
          </div>

          <div className="h-[350px] bg-gray-200 p-8 flex flex-col justify-center shadow-md ">
            <h2 className="text-xl font-bold mb-4">{data[2].title}</h2>
            <p className="text-sm line-clamp-5">{data[2].description}</p>
          </div>

          <div className="h-[350px] bg-gray-200 p-8 flex flex-col justify-center shadow-md ">
            <h2 className="text-xl font-bold mb-4">{data[3].title}</h2>
            <p className="text-sm line-clamp-5">{data[3].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
