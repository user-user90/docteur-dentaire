export default {
  name: "Services",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "حدد ترتيب العنصر (مثلاً: 1، 2، 3...)",
    },
    {
      name: "title",
      title: "Title",
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