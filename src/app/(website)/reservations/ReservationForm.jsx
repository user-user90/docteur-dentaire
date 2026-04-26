"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import createReservations from "./reservation"
import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"
import { motion } from "framer-motion" // استيراد فريمر موشن

export default function ReservationForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const res = await createReservations(formData)

    if (res?.success) {
      router.push("/verification")
    } else {
      setLoading(false)
      alert(res?.message || "Une erreur est survenue")
    }
  }

  // إعدادات الحركة (Variants)
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden border border-slate-100"
      >
        
        {/* Header - الداشبورد المصغر */}
        <div className="bg-cyan-600 p-8 text-center relative">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl lg:text-3xl font-bold text-white tracking-tight"
          >
            Prendre un Rendez-vous
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-cyan-50 text-sm mt-2 opacity-90"
          >
            Réservations disponibles actuellement pour la médecine dentaire uniquement
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="text-center text-[11px] text-cyan-100 mt-1 uppercase tracking-widest font-medium"
          >
            Un code de confirmation vous sera envoyé par email
          </motion.p>

          {/* رابط العودة للرئيسية */}
          <motion.div variants={itemVariants}>
            <Link 
              href="/" 
              className="mt-4 text-sm flex items-center gap-2 mx-auto w-fit text-white hover:bg-white/10 px-4 py-1.5 rounded-full transition-all border border-white/20"
            >
              <LuArrowLeft />
              Retour Accueil
            </Link>
          </motion.div>
        </div>

        <motion.form 
          variants={itemVariants}
          onSubmit={handleSubmit} 
          className="p-8 lg:p-12 space-y-6"
        >
          
          {/* قسم المعلومات الشخصية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-wider">
                Nom Complet
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="Ex: Ahmed Alami"
                className="border-2 border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 p-3.5 rounded-xl outline-none transition-all bg-slate-50 text-slate-700"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-wider">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="email@exemple.com"
                className="border-2 border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 p-3.5 rounded-xl outline-none transition-all bg-slate-50 text-slate-700"
              />
            </motion.div>
          </div>

          {/* اختيار الخدمة */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-wider">
              Service Demandé
            </label>
            <select
              required
              name="service"
              className="border-2 border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 p-3.5 rounded-xl outline-none transition-all bg-slate-50 cursor-pointer text-slate-700"
            >
              <option value="">Sélectionnez un service</option>
              <option value="consultation">Consultation Dentaire</option>
              <option value="detartrage">Détartrage & Nettoyage</option>
              <option value="extraction">Extraction</option>
              <option value="orthodontie">Orthodontie</option>
            </select>
          </motion.div>

          {/* التاريخ والوقت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-wider">
                Date du Rendez-vous
              </label>
              <input
                required
                type="date"
                name="date"
                min={today}
                className="border-2 border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 p-3.5 rounded-xl outline-none transition-all bg-slate-50 text-slate-700"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-wider">
                Heure
              </label>
              <input
                required
                type="time"
                name="time"
                className="border-2 border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 p-3.5 rounded-xl outline-none transition-all bg-slate-50 text-slate-700"
              />
            </motion.div>
          </div>

          {/* زر الإرسال */}
          <motion.div variants={itemVariants} className="pt-6">
            <button 
              disabled={loading}
              className={`w-full ${loading ? 'bg-slate-400' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Traitement en cours...
                </>
              ) : (
                <>
                  <span>📅</span> Réserver Maintenant
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  )
}