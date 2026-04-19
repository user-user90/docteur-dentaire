export default {
  name: "reservation",
  title: "Reservation",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "service",
      title: "Service",
      type: "string",
    },
    {
      name: "date",
      title: "Date",
      type: "string",
    },
    {
      name: "time",
      title: "Time",
      type: "string",
    },
    {
      name: "code",
      title: "OTP Code",
      type: "string",
    },
    {
      name: "isVerified",
      title: "Is Verified",
      type: "boolean",
      initialValue: false,
    },
  ],
}