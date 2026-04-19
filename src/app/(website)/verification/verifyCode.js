"use server"

import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2024-04-16",
})

export async function verifyCodeAction(code) {
  const cleanCode = code.trim()

  const reservation = await client.fetch(
    `*[_type == "reservation" && code == $code][0]`,
    { code: cleanCode }
  )

  if (!reservation) {
    return { success: false }
  }

  await client.patch(reservation._id).set({
    isVerified: true,
  }).commit()

  return { success: true }
}