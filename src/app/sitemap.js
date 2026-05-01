import { createClient } from "next-sanity";

// إعداد اتصال Sanity لجلب البيانات
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2024-04-16",
});

export default async function sitemap() {
  const baseUrl = 'https://doctormaroc.com';

  // 1. جلب الخدمات أو الصفحات الديناميكية من قاعدة البيانات (Sanity CMS)
  // افترضنا أن لديك نوع (type) يسمى "service" ولديه حقل "slug"
  const services = await client.fetch(`*[_type == "Services"]{
    "slug": slug.current,
    _updatedAt
  }`);

  // 2. الصفحات الثابتة في الموقع
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/reservations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

  ];

  // 3. تحويل الخدمات الديناميكية إلى مسارات (URLs)
  const dynamicUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service._updatedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. دمج جميع المسارات وإرجاعها
  return [...staticUrls, ...dynamicUrls];
}