"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function HeroClient({ data }) {
  return (
    <header className="relative w-full h-screen overflow-hidden flex items-center">
      {/* image */}
      <Image
        src={data.heroImage}
        alt={data.title}
        fill
        className="object-cover z-0"
        priority
      />

      {/* "" */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* ## info  && botton*/}
      <div className="container mx-auto px-6 relative z-20 text-center md:text-left">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-black text-white leading-tight"
            >
              {data.title}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-2xl md:text-4xl font-bold text-cyan-400"
            >
              {data.subtitle}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 20 }} // التغيير هنا: من أسفل لأعلى
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed font-medium"
          >
            {data.description}
          </motion.p>

          <div className="flex items-center flex-wrap gap-4 pt-6 justify-center md:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }} // التغيير هنا: من أسفل لأعلى
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <Link
                href="/reservations"
                className="bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-600 transition-all shadow-lg active:scale-95"
              >
                Prendre RDV
              </Link>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }} // التغيير هنا: من أسفل لأعلى
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Nos Services
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroClient;
