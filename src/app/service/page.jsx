import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { TbCircleCheckFilled } from "react-icons/tb";

const getdata = async () => {
  const query = `
    *[_type == "Dentaire"][0]{
      title,
      subtitle,
      description,
      "urlImage": urlImage.asset->url
    }
  `;
  return await client.fetch(query);
};

async function Page() {
  const data = await getdata();

  if (!data) return null;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] lg:h-[550px] w-full ">
        <Image
          src={data.urlImage}
          alt={data.title}
          fill
          priority
          className="object-cover mx-auto"
        />
        {/* ## info */}
      <div>
        <h2></h2>
      </div>
</div>

    </main>
  );
}

export default Page;