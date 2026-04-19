"use server";
import { createClient } from "next-sanity";
import { Resend } from "resend";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2024-04-16",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function createReservations(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const date = formData.get("date"); // ❗ ضروري التاريخ

  // 🔐 توليد الكود
  const code = String(Math.floor(100000 + Math.random() * 900000));

  // 🔍 نجيب الحجوزات لنفس email + date
  const reservations = await client.fetch(
    `*[_type == "reservation" && email == $email && date == $date]`,
    { email, date }
  );

  // 🧠 نحسب العدد
  const count = reservations.length;

  // ❌ إذا وصل 2 → نمنع
  if (count >= 2) {
    return {
      success: false,
      message: "عدرا لا يمكنك عمل اكتر من حجزين في نفس اليوم",
    };
  }

  // 💾 إنشاء الحجز
  await client.create({
    _type: "reservation",
    name,
    email,
    date, // ❗ خاصو يتخزن
    code,
    isVerified: false,
  });

  // 📧 إرسال الإيميل
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Code de confirmation 🦷",
    html: `
      <h2>Bonjour ${name}</h2>
      <p>Voici votre code de confirmation :</p>

      <h1 style="font-size:32px;letter-spacing:6px;">
        ${code}
      </h1>

      <p>Utilisez ce code pour confirmer votre rendez-vous.</p>
    `,
  });

  return { success: true };
}