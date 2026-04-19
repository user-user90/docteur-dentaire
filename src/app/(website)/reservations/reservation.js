"use server"; // هذا الكود يخدم غير فالسيرفر (ماشي في المتصفح)

import { createClient } from "next-sanity"; // ربط مع Sanity (قاعدة البيانات)
import { Resend } from "resend"; // خدمة إرسال الإيميلات

// إعداد الاتصال مع Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2024-04-16",
});

// إعداد خدمة الإيميل
const resend = new Resend(process.env.RESEND_API_KEY);

// Server Action لإنشاء الحجز
export default async function createReservations(formData) {

  // 🧾 جلب البيانات من الفورم
  const name = formData.get("name");
  const email = formData.get("email");
  const date = formData.get("date"); // التاريخ مهم باش نديرو limit

  // 🔐 توليد كود عشوائي (6 أرقام)
  const code = String(Math.floor(100000 + Math.random() * 900000));

  // 🔍 البحث عن الحجوزات لنفس email + نفس date
  const reservations = await client.fetch(
    `*[_type == "reservation" && email == $email && date == $date]`,
    { email, date }
  );

  // 🧠 حساب عدد الحجوزات
  const count = reservations.length;

  // ❌ إذا وصل 2 حجوزات في نفس اليوم → نمنع
  if (count >= 2) {
    return {
      success: false,
      message: "عدرا لا يمكنك عمل اكتر من حجزين في نفس اليوم!",
    };
  }

  // 💾 إنشاء الحجز في قاعدة البيانات
  await client.create({
    _type: "reservation",
    name,
    email,
    date,
    code,
    isVerified: false, // الحجز مازال غير مؤكد
  });

  // 📧 إرسال كود التحقق عبر الإيميل
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

  // ✅ إرجاع نجاح العملية
  return { success: true };
}