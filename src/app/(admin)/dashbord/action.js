"use server"
import { createClient } from "next-sanity"
import { revalidatePath } from "next/cache" // الخطأ 1: إضافة الاستيراد
import { Resend } from "resend"

const dataClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2024-04-16",
})

export async function updateDataHero(formData) {
  const title = formData.get("title")
  const description = formData.get("description")
  const image = formData.get("heroImage") // تأكد أن name="heroImage" في الـ Input
  // ## 
  const resend = new Resend(process.env.RESEND_API_KEY)

  let imageAsset = null

  try {
    // الخطأ 2: تغيير "heroImage" إلى "image" في الرفع
    if (image && image.size > 0) {
      imageAsset = await dataClient.assets.upload("image", image)
    }

    const heroDoc = await dataClient.fetch(
      `*[_type == "heroSection"][0]._id`
    )
    
    if (!heroDoc) throw new Error("Document Hero introuvable")

    await dataClient
      .patch(heroDoc)
      .set({
        title,
        description,
        ...(imageAsset && {
          heroImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          },
        }),
      })
      .commit()
    await resend.emails.send({
  from: "docteur",
  to: "wissalinas6@gmail.com",
  subject: "Test Email 🚀",
  html: "<h1>Test réussi</h1><p>Votre email fonctionne !</p>",
  
})
    revalidatePath("/") 
    revalidatePath("/dashboard/hero") // تحديث الداشبورد أيضاً لرؤية الصورة الجديدة
    
    console.log("Updated successfully 🚀")
    return { success: true }
  
    
  } catch (error) {
    console.error("Error detail:", error)
    return { success: false, error: error.message }
  }
}