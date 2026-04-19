export default {
  name: "heroSection",
  title: "Hero-Section",
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
      name: "heroImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // تفعيل ميزة اختيار منطقة التركيز في الصورة
      },
      description: "",
    },
  ],
};