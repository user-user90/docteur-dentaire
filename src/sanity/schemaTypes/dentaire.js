export default {
  name: "Dentaire",
  title: "Dentaire",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "اضغط على Generate لإنشاء رابط الصفحة تلقائياً من العنوان",
      options: {
        source: "title", // سيأخذ النص من حقل title
        maxLength: 96,
      },
    },
    {
      name: "subtitle",
      title: "subTitle",
      type: "string",
      description: "Title",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Description",
    },
    {
      name: "urlImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "",
    },
  ],
};