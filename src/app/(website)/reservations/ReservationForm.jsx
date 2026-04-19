"use client"

import { useRouter } from "next/navigation"
import createReservations from "./reservation"

export default function ReservationForm() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header الداشبورد المصغر */}
        <div className="bg-cyan-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Prendre un Rendez-vous</h2>
          <p className="text-blue-100 text-sm mt-1">Remplissez le formulaire pour réserver votre créneau</p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const res = await createReservations(formData)

            if (res?.success) {
              router.push("/verification")
            } else {
              alert(res?.message || "Erreur")
            }
          }}
          className="p-8 space-y-5"
        >
          {/* قسم المعلومات الشخصية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nom Complet</label>
              <input
                required
                name="name"
                placeholder="Ex: Ahmed Alami"
                className="border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 p-3 rounded-xl outline-none transition-all bg-slate-50"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="email@exemple.com"
                className="border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 p-3 rounded-xl outline-none transition-all bg-slate-50"
              />
            </div>
          </div>

          {/* اختيار الخدمة */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Service Demandé</label>
            <select
              name="service"
              className="border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 p-3 rounded-xl outline-none transition-all bg-slate-50 cursor-pointer"
            >
              <option value="">Sélectionnez un service</option>
              <option value="nettoyage">Nettoyage</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          {/* التاريخ والوقت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Date</label>
              <input
                required
                type="date"
                name="date"
                className="border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 p-3 rounded-xl outline-none transition-all bg-slate-50"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Heure</label>
              <input
                type="time"
                name="time"
                className="border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 p-3 rounded-xl outline-none transition-all bg-slate-50"
              />
            </div>
          </div>

          {/* زر الإرسال */}
          <div className="pt-4">
            <button className="w-full bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <span>📅</span> Réserver Maintenant
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Un code de confirmation vous sera envoyé par email.
          </p>
        </form>
      </div>

    </div>
  )
}