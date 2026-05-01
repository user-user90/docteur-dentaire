export default function robots() {
  const baseUrl = 'https://doctormaroc.com';

  return {
    rules: {
      userAgent: '*', // ينطبق على جميع روبوتات محركات البحث
      allow: '/',     // السماح بأرشفة جميع صفحات الموقع
      disallow: [
        '/admin',     // منع أرشفة لوحة التحكم
        '/private',   // منع أرشفة أي مسار خاص
      ], 
    },
    sitemap: `${baseUrl}/sitemap.xml`, // الرابط المباشر لخريطة الموقع
  };
}