"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { TbStethoscope, TbClock, TbUsers, TbAward } from "react-icons/tb";

const AboutSection = () => {
  const stats = [
    { icon: <TbUsers />, label: "Patients Satisfaits", value: "5000+" },
    { icon: <TbStethoscope />, label: "Spécialités", value: "12+" },
    { icon: <TbAward />, label: "Années d'Expérience", value: "15+" },
    { icon: <TbClock />, label: "Urgence 24/7", value: "Dispo" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* 1. الجزء الأيسر: الصور مع لمسة تصميمية (معدل للموبايل) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full h-[380px] sm:h-[450px] md:h-[550px]">
              
              {/* الصورة الرئيسية - الخلفية */}
              <div className="absolute top-0 left-0 w-[85%] h-[80%] rounded-3xl overflow-hidden shadow-xl z-10">
                <Image 
                  src="/about-2.jpg" 
                  alt="Notre Clinique"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* الصورة الثانوية - المتداخلة */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute bottom-0 right-0 w-[65%] h-[60%] rounded-3xl overflow-hidden shadow-2xl z-20 border-4 md:border-8 border-white"
              >
                <Image 
                  src="/about-1.jpg" 
                  alt="Équipe Médicale"
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover"
                />
              </motion.div>

              {/* عنصر زخرفي خلفي */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-100 rounded-full -z-10 blur-2xl opacity-60" />
            </div>
          </motion.div>

          {/* 2. الجزء الأيمن: النص والمحتوى */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="text-center lg:text-left">
              <h4 className="text-cyan-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">
                À Propos de Nous
              </h4>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1]">
                Votre Santé est Notre Priorité Absolue.
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed text-lg">
                Bienvenue à <span className="text-cyan-600 font-bold">Docteur Maroc</span>. Nous combinons expertise médicale de pointe et approche humaine pour offrir à nos patients des soins d'excellence. 
                Notre équipe de spécialistes dévoués travaille chaque jour pour assurer votre bien-être.
              </p>
            </div>

            {/* شبكة الإحصائيات */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 pt-4">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                    {stat.icon}
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-slate-900 leading-none">{stat.value}</h5>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 flex justify-center lg:justify-start">
              <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-cyan-600 transition-all shadow-xl hover:shadow-cyan-100 active:scale-95 duration-300">
                En savoir plus
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;