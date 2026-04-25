import { client } from "@/sanity/lib/client";
import Image from "next/image";

// 1. تأكد أن الـ _type هو "Dentaire" كما في السكيما الخاصة بك
const getdata = async (slug) => {
  const query = `
    *[_type == "Dentaire" && slug.current == $slug][0]{
      title,
      subtitle,
      description,
      "urlImage": urlImage.asset->url
    }
  `;
  return await client.fetch(query, { slug });
};

async function Page({ params }) {
  // 2. فك السلاغ من الرابط
  const { slug } = await params;
  const data = await getdata(slug);

  // 3. إذا لم يجد البيانات (تأكد أنك ضغطت Publish في Sanity)
  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-xl text-gray-400">Contenu non trouvé. Vérifiez le Slug dans Sanity.</h1>
      </div>
    );
  }

  return (
    <main className="flex flex-col mb-32 mx-4 lg:mx-12">
      {/* Hero Section */}
         <div className="relative h-[300px] lg:h-[500px] w-full">
        <Image
          src={data.urlImage}
          alt={data.title}
          fill
          priority
          className="object-cover"
        />
         </div>
        {/* ## info */}
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-extrabold text-2xl lg:text-4xl text-gray-700 mt-10">{data.title}</h2>
          <p className="w-full lg:max-w-3xl mt-5 text-md font-semibold tracking-tighter  ">{data?.description}</p>
        </div>
     
    </main>
  );
}

export default Page;