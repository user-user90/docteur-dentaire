import { client } from "@/sanity/lib/client";
import DoctorDetails from "../_components/DoctorDetails";

const getdata = async (slug) => {
  const query = `
    *[_type == "Dentaire" && slug.current == $slug][0]{
      title,
      emoji,
      subtitle,
      description,
      subDesc,
      "urlImage": urlImage.asset->url,
      "subImage": subImage.asset->url
    }
  `;
  return await client.fetch(query, { slug });
};

async function Page({ params }) {
  const { slug } = await params;
  const data = await getdata(slug);

  if (!data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <h1 className="text-xl text-gray-400">
          Contenu non trouvé.
        </h1>
      </div>
    );
  }

  return (
    <DoctorDetails data={data} />
  );
}

export default Page;