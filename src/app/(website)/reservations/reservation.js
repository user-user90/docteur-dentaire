"use server";
import { createClient } from "next-sanity";
import { Resend } from "resend";
import { cookies } from "next/headers";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2024-04-16",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getBookedTimes(date) {
  try {
    const reservations = await client.fetch(
      `*[_type == "reservation" && date == $date]{time}`,
      { date }
    );
    return reservations.map(r => r.time).filter(Boolean);
  } catch (error) {
    console.error("Error fetching booked times:", error);
    return [];
  }
}

export async function initiateReservation(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const date = formData.get("date");
  const time = formData.get("time");
  const service = formData.get("service") || "Médecine Générale";

  if (!time) {
    return { success: false, message: "Veuillez sélectionner une heure de rendez-vous." };
  }

  try {
    // التحقق من الحجوزات لنفس البريد والتاريخ
    const reservations = await client.fetch(
      `*[_type == "reservation" && email == $email && date == $date]`,
      { email, date }
    );

    if (reservations.length >= 2) {
      return {
        success: false,
        message: "Désolé, vous ne pouvez pas effectuer plus de deux réservations le même jour avec la même adresse e-mail.",
      };
    }

    // التحقق من أن الوقت غير محجوز
    const existingReservation = await client.fetch(
      `*[_type == "reservation" && date == $date && time == $time][0]`,
      { date, time }
    );

    if (existingReservation) {
      return {
        success: false,
        message: "Désolé, ce créneau horaire a déjà été réservé. Veuillez en choisir un autre.",
      };
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));

    // إرسال كود التحقق
    await resend.emails.send({
      from: "Docteur Maroc <contact@doctormaroc.com>",
      to: email,
      subject: `Code de confirmation - Docteur Maroc 🏥`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; padding: 20px; border-radius: 12px; direction: ltr;">
          <h2 style="color: #0891b2; text-align: center;">Docteur Maroc</h2>
          <p>Bonjour <strong>${name}</strong>,</p>
          <p>Vous avez demandé un rendez-vous pour le service : <strong>${service}</strong> le ${date} à ${time}.</p>
          <p>Voici votre code de confirmation pour valider votre demande :</p>
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="font-size: 36px; letter-spacing: 8px; color: #1e293b; margin: 0;">${code}</h1>
          </div>
          <p style="font-size: 14px; color: #64748b;">Ce code est confidentiel. Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="text-align: center; color: #94a3b8; font-size: 12px;">© 2026 Docteur Maroc - Centre Médical Multidisciplinaire</p>
        </div>
      `,
    });

    // تخزين البيانات مؤقتاً في ملفات تعريف الارتباط الآمنة (Cookies) لمدة 5 دقائق
    const cookieStore = await cookies();
    cookieStore.set(
      "pendingReservation",
      JSON.stringify({ name, email, date, time, service, code }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 300, // 5 دقائق
        sameSite: "strict",
        path: "/",
      }
    );

    return { success: true };
  } catch (error) {
    console.error("Erreur Reservation:", error);
    return { success: false, message: "Une erreur est survenue lors du traitement de la réservation, veuillez réessayer plus tard." };
  }
}

export async function confirmReservation(enteredCode) {
  try {
    const cookieStore = await cookies();
    const cookieData = cookieStore.get("pendingReservation");

    if (!cookieData) {
      return { success: false, message: "La session a expiré, veuillez saisir à nouveau les données." };
    }

    const reservationData = JSON.parse(cookieData.value);

    // مطابقة الأكواد
    if (reservationData.code !== enteredCode) {
      return { success: false, message: "Le code de vérification est incorrect, veuillez réessayer." };
    }

    // الآن وبعد التحقق، نقوم بإنشاء الحجز في سانيتي
    await client.create({
      _type: "reservation",
      name: reservationData.name,
      email: reservationData.email,
      date: reservationData.date,
      time: reservationData.time,
      service: reservationData.service,
      code: reservationData.code,
      isVerified: true,
    });

    // حذف البيانات المؤقتة
    cookieStore.delete("pendingReservation");

    return { success: true };
  } catch (error) {
    console.error("Erreur Confirmation:", error);
    return { success: false, message: "Une erreur est survenue lors de l'enregistrement de la réservation." };
  }
}