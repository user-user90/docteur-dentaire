"use client"

import { useState } from "react"
import { verifyCodeAction } from "./verifyCode"
import { useRouter } from "next/navigation"

export default function VerifyPage() {
  const [code, setCode] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleVerify = async (e) => {
    e.preventDefault()
    const result = await verifyCodeAction(code)

    if (result.success) {
      setMessage("✅ Code correct. Redirection...")
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } else {
      setMessage("❌ Code incorrect. Veuillez réessayer.")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center max-w-md w-full border border-slate-100">
        
        {/* أيقونة قفل بسيطة لإعطاء انطباع بالأمان */}
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">🔐</span>
        </div>

        <h1 className="text-xl font-bold text-slate-800 mb-2 text-center">Vérification de Réservation</h1>
        <p className="text-sm mb-8 text-slate-500 text-center px-4">
          Entrez le code reçu pour confirmer votre réservation
        </p>

        <form onSubmit={handleVerify} className="flex flex-col gap-5 w-full">
          <div className="relative">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex: 123456"
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none bg-slate-50 text-center text-lg font-semibold tracking-widest"
              required
            />
          </div>

          <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
            Vérifier le Code
          </button>

          {message && (
            <div className={`text-sm font-medium p-3 rounded-lg text-center transition-all ${
              message.includes("✅") 
                ? "bg-green-50 text-green-700 border border-green-100" 
                : "bg-red-50 text-red-700 border border-red-100"
            }`}>
              {message}
            </div>
          )}
        </form>

        <p className="mt-8 text-xs text-slate-400">
          Si vous n'avez pas reçu de code, contactez le support.
        </p>
      </div>
    </div>
  )
}