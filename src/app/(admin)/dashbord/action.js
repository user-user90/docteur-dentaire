"use server"
import { createClient } from "next-sanity"
import { revalidatePath } from "next/cache" // الخطأ 1: إضافة الاستيراد

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

  

    revalidatePath("/") 
    revalidatePath("/dashboard/hero") // تحديث الداشبورد أيضاً لرؤية الصورة الجديدة
    
    console.log("Updated successfully 🚀")
    return { success: true }
  
    
  } catch (error) {
    console.error("Error detail:", error)
    return { success: false, error: error.message }
  }
}