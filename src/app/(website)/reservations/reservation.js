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
  const date = formData.get("date");
  const service = formData.get("service") || "Médecine Générale"; // أضفنا التخصص

  // 🔐 توليد الكود
  const code = String(Math.floor(100000 + Math.random() * 900000));

  try {
    // 🔍 التحقق من عدد الحجوزات لنفس البريد والتاريخ
    const reservations = await client.fetch(
      `*[_type == "reservation" && email == $email && date == $date]`,
      { email, date }
    );

    if (reservations.length >= 2) {
      return {
        success: false,
        message: "عذراً، لا يمكنك عمل أكثر من حجزين في نفس اليوم بنفس البريد الإلكتروني.",
      };
    }

    // 💾 إنشاء الحجز في Sanity
    await client.create({
      _type: "reservation",
      name,
      email,
      date,
      service,
      code,
      isVerified: false,
    });

    // 📧 إرسال الإيميل من الدومين الرسمي الجديد
    await resend.emails.send({
      // ⚠️ قمنا بتغيير البريد من onboarding@resend.dev إلى بريدك الرسمي
      from: "Docteur Maroc <contact@doctormaroc.com>", 
      to: email,
      subject: `Code de confirmation - Docteur Maroc 🏥`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; padding: 20px; border-radius: 12px; direction: ltr;">
          <h2 style="color: #0891b2; text-align: center;">Docteur Maroc</h2>
          <p>Bonjour <strong>${name}</strong>,</p>
          <p>Vous avez demandé un rendez-vous pour le service : <strong>${service}</strong>.</p>
          <p>Voici votre code de confirmation pour valider votre demande :</p>

          <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="font-size: 36px; letter-spacing: 8px; color: #1e293b; margin: 0;">${code}</h1>
          </div>

          <p style="font-size: 14px; color: #64748b;">Ce code est confidentiel. Si vous n'êtes نpas à l'origine de cette demande, veuillez ignorer cet e-mail.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="text-align: center; color: #94a3b8; font-size: 12px;">© 2026 Docteur Maroc - Centre Médical Multidisciplinaire</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur Reservation:", error);
    return { success: false, message: "حدث خطأ أثناء معالجة الحجز، يرجى المحاولة لاحقاً." };
  }
}