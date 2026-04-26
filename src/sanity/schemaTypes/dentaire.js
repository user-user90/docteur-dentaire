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
      name: "emoji",
      title: "Emoji Icon",
      type: "string",
      description: "أدخل إيموجي هنا (مثال: 🦷 أو 🫀)",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "اضغط على Generate لإنشاء رابط الصفحة تلقائياً من العنوان",
      options: {
        source: "title",
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
      name: "subDesc",
      title: "sub-Desc",
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
        {
      name: "subImage",
      title: "subImage",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "",
    },
   
  ],
};