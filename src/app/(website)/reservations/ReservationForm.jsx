"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getBookedTimes, initiateReservation, confirmReservation } from "./reservation"
import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"
import { motion, AnimatePresence } from "framer-motion"

export default function ReservationFlow() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState("form") // "form" أو "verify"

  // حالات النموذج
  const [selectedDate, setSelectedDate] = useState("")
  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedTime, setSelectedTime] = useState("")
  const [bookedTimes, setBookedTimes] = useState([])
  
  // حالة التحقق
  const [enteredCode, setEnteredCode] = useState("")

  const today = new Date().toISOString().split('T')[0]

  const allWorkHours = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ]

  useEffect(() => {
    async function fetchTimes() {
      if (selectedDate) {
        setLoading(true)
        try {
          const booked = await getBookedTimes(selectedDate)
          setBookedTimes(booked)
          const available = allWorkHours.filter(t => !booked.includes(t))
          setAvailableTimes(available)
          setSelectedTime("")
        } catch (error) {
          console.error("Failed to load times", error)
          setAvailableTimes([])
        } finally {
          setLoading(false)
        }
      } else {
        setAvailableTimes([])
      }
    }
    fetchTimes()
  }, [selectedDate])

  const handleInitiate = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const res = await initiateReservation(formData)
    
    if (res?.success) {
      setStep("verify")
    } else {
      alert(res?.message || "Une erreur est survenue lors du traitement de la demande.")
    }
    setLoading(false)
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const res = await confirmReservation(enteredCode)
    
    if (res?.success) {
      alert("Votre réservation a été confirmée avec succès ! Merci.")
      router.push("/")
    } else {
      alert(res?.message || "Une erreur est survenue.")
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-cyan-600 p-8 text-center relative">
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {step === "form" ? "Prendre un Rendez-vous" : "Validation du Rendez-vous"}
          </h2>
          <p className="text-cyan-50 text-sm mt-2 opacity-90">
            {step === "form" 
              ? "Réservations disponibles actuellement pour la médecine dentaire uniquement" 
              : "Veuillez entrer le code de vérification envoyé à votre adresse e-mail :"
            }
          </p>
          <Link 
            href="/" 
            className="mt-4 text-sm flex items-center gap-2 mx-auto w-fit text-white hover:bg-white/10 px-4 py-1.5 rounded-full transition-all border border-white/20"
          >
            <LuArrowLeft />
            Retour Accueil
          </Link>
        </div>

        <div className="p-8 lg:p-12">
          {step === "form" ? (
            <form onSubmit={handleInitiate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
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
                </div>
                <div className="flex flex-col">
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
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-wider">
                  Service Demandé
                </label>
                <select
                  required
                  name="service"
                  className="border-2 border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 p-3.5 rounded-xl outline-none transition-all bg-slate-50 cursor-pointer text-slate-700"
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="Consultation Dentaire">Consultation Dentaire</option>
                  <option value="Détartrage & Nettoyage">Détartrage & Nettoyage</option>
                  <option value="Extraction">Extraction</option>
                  <option value="Orthodontie">Orthodontie</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-wider">
                    Date du Rendez-vous
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border-2 border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 p-3.5 rounded-xl outline-none transition-all bg-slate-50 text-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 ml-1 tracking-wider">
                    Heure
                  </label>
                  <select
                    required
                    name="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="border-2 border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 p-3.5 rounded-xl outline-none transition-all bg-slate-50 cursor-pointer text-slate-700"
                  >
                    <option value="">Sélectionnez l'heure</option>
                    {availableTimes.length > 0 ? (
                      availableTimes.map((timeOption, index) => (
                        <option key={index} value={timeOption}>
                          {timeOption}
                        </option>
                      ))
                    ) : (
                      <option disabled>
                        {selectedDate ? "Aucun créneau disponible" : "Sélectionnez une date d'abord"}
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="pt-6">
                <button 
                  disabled={loading}
                  type="submit"
                  className={`w-full ${loading ? 'bg-slate-400' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg`}
                >
                  {loading ? "Traitement en cours..." : "📅 Réserver Maintenant"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex flex-col items-center justify-center text-center py-6">
                <p className="text-slate-600 mb-4">
                  Veuillez entrer le code de vérification (OTP) à 6 chiffres que nous avons envoyé à votre adresse e-mail :
                </p>
                <input
                  required
                  type="text"
                  placeholder="------"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="w-full max-w-xs text-center text-3xl font-mono tracking-[8px] border-2 border-slate-200 focus:border-cyan-500 p-4 rounded-xl outline-none"
                  maxLength={6}
                />
              </div>
              <div className="pt-6">
                <button 
                  disabled={loading}
                  type="submit"
                  className={`w-full ${loading ? 'bg-slate-400' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-100 transition-all text-lg`}
                >
                  {loading ? "Vérification en cours..." : "Confirmer le rendez-vous"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="w-full text-center text-slate-500 hover:text-slate-700 text-sm mt-4 underline"
              >
                Modifier les informations de réservation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}