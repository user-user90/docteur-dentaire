export default {
  name: "Services",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title",
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
        hotspot: true, // تفعيل ميزة اختيار منطقة التركيز في الصورة
      },
      description: "",
    },
  ],
};