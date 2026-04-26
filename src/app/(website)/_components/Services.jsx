import { client } from "@/sanity/lib/client";

import ServiceClient from "./ServiceClient";

const getdata = async () => {
  const query = `
    *[_type == "Services"] | order(order asc) {
      title,
      description,
      "slug": slug.current,
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
      {/* هذا الكود يضمن الصعود للأعلى فوراً */}
     <ServiceClient data={data}/>   
    </section>
  );
}

export default Services;
