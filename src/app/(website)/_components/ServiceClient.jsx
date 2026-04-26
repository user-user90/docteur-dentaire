"use client"
import Image from "next/image";
import { motion } from "framer-motion"; // استيراد motion
import {
 TbDentalBroken,
 TbEye,
 TbBone,
 TbDroplet,
} from "react-icons/tb";
import { GiHeartBeats } from "react-icons/gi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";
import Link from "next/link";

function ServiceClient({ data }) {
 // دالة بسيطة للصعود للأعلى
 const scrollToTop = () => {
 window.scrollTo({
 top: 0,
 behavior: "instant",
 });
 };

 // إعدادات التحريك الافتراضية المشابهة للهيرو
 const itemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0 },
 };

 return (
 <div className="container mx-auto px-4">
 {/* Header Section */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.5 }}
 transition={{ duration: 0.5 }}
 variants={itemVariants}
 className="text-center mb-16"
 >
 <h1 className="inline-block border border-gray-500 shadow-md px-6 py-2 mb-6 text-2xl font-bold uppercase tracking-widest text-gray-800">
 Services
 </h1>
 <motion.p
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.5 }}
 transition={{ delay: 0.3, duration: 0.7 }}
 variants={itemVariants}
 className="text-2xl lg:text-3xl font-medium w-full lg:max-w-2xl mx-auto text-gray-700 leading-tight"
 >
 Sentez-vous comme chez vous avec les meilleurs soins médicaux
 </motion.p>
 </motion.div>

 {/* Grid System (8 Blocks) */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 
 {/* ## Dentaire */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 transition={{ delay: 0.1 * 7, duration: 0.5 }} // مثال على تأخير ديناميكي بناءً على الفهرس
 variants={itemVariants}
 className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md"
 >
 <span className="absolute top-8 left-5 text-7xl text-[#00D3F2] opacity-40">
 <TbDentalBroken />
 </span>
 <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
 {data[7].title}
 </h2>
 <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
 {data[7].description}
 </p>
 <Link
 href={`/service/${data[7].slug}`}
 onClick={scrollToTop}
 className="absolute bottom-10 flex items-center gap-1 text-gray-600 font-bold hover:text-gray-800 transition-colors"
 >
 Lire la suite <FaAnglesRight />
 </Link>
 </motion.div>

 {/* ## image */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 transition={{ delay: 0.1 * 0, duration: 0.5 }} // تأخير للصورة الأولى
 variants={itemVariants}
 className="h-[350px] relative overflow-hidden shadow-md"
 >
 <Image
 src={data[0].urlImage}
 alt="service"
 fill
 className="object-cover"
 />
 </motion.div>

 {/* ## Cardiologie */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 transition={{ delay: 0.1 * 6, duration: 0.5 }} // تأخير بناءً على الفهرس
 variants={itemVariants}
 className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md"
 >
 <span className="absolute top-8 left-5 text-7xl text-[#00D3F2] opacity-40">
 <GiHeartBeats />
 </span>
 <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
 {data[6].title}
 </h2>
 <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
 {data[6].description}
 </p>
 <Link
 href={`/service/${data[6].slug}`}
 onClick={scrollToTop}
 className="absolute bottom-10 flex items-center gap-1 text-gray-600 font-bold hover:text-gray-800 transition-colors"
 >
 Lire la suite <FaAnglesRight />
 </Link>
 </motion.div>

 {/* ## Soins des yeux */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 transition={{ delay: 0.1 * 3, duration: 0.5 }} // تأخير بناءً على الفهرس
 variants={itemVariants}
 className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md"
 >
 <span className="absolute top-8 left-5 text-7xl text-[#00D3F2] opacity-40">
 <TbEye />
 </span>
 <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
 {data[3].title}
 </h2>
 <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
 {data[3].description}
 </p>
 <Link
 href={`/service/${data[3].slug}`} // تأكد من المسار الصحيح
 onClick={scrollToTop}
 className="absolute bottom-10 flex items-center gap-1 text-gray-600 font-bold hover:text-gray-800 transition-colors"
 >
 Lire la suite <FaAnglesRight />
 </Link>
 </motion.div>

 {/* ## Image 2 */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 transition={{ delay: 0.1 * 1, duration: 0.5 }} // تأخير للصورة الثانية
 variants={itemVariants}
 className="h-[350px] relative overflow-hidden shadow-md"
 >
 <Image
 src={data[1].urlImage}
 alt="service"
 fill
 className="object-cover"
 />
 </motion.div>

 {/* ## Orthopédie */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 transition={{ delay: 0.1 * 2, duration: 0.5 }} // تأخير بناءً على الفهرس
 variants={itemVariants}
 className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md"
 >
 <span className="absolute top-8 left-5 text-7xl text-[#00D3F2] opacity-40">
 <TbBone />
 </span>
 <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
 {data[2].title}
 </h2>
 <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
 {data[2].description}
 </p>
 <Link
 href={`/service/${data[2].slug}`}
 onClick={scrollToTop}
 className="absolute bottom-10 flex items-center gap-1 text-gray-600 font-bold hover:text-gray-800 transition-colors"
 >
 Lire la suite <FaAnglesRight />
 </Link>
 </motion.div>

 {/* ## Endocrinologie */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 transition={{ delay: 0.1 * 4, duration: 0.5 }} // تأخير بناءً على الفهرس
 variants={itemVariants}
 className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md"
 >
 <span className="absolute top-8 left-5 text-7xl text-[#00D3F2] opacity-40">
 <TbDroplet />
 </span>
 <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
 {data[4].title}
 </h2>
 <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
 {data[4].description}
 </p>
 <Link
 href={`/service/${data[4].slug}`}
 onClick={scrollToTop}
 className="absolute bottom-10 flex items-center gap-1 text-gray-600 font-bold hover:text-gray-800 transition-colors"
 >
 Lire la suite <FaAnglesRight />
 </Link>
 </motion.div>

 {/* ## Angioplastie */}
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 transition={{ delay: 0.1 * 5, duration: 0.5 }} // تأخير بناءً على الفهرس
 variants={itemVariants}
 className="relative h-[350px] bg-slate-200 p-8 flex flex-col justify-center shadow-md"
 >
 <span className="absolute top-8 left-5 text-7xl text-[#00D3F2] opacity-40">
 <TbActivityHeartbeat />
 </span>
 <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
 {data[5].title}
 </h2>
 <p className="text-sm font-semibold text-gray-800 tracking-wider line-clamp-5">
 {data[5].description}
 </p>
 <Link
 href={`/service/${data[5].slug}`}
 onClick={scrollToTop}
 className="absolute bottom-10 flex items-center gap-1 text-gray-600 font-bold hover:text-gray-800 transition-colors"
 >
 Lire la suite <FaAnglesRight />
 </Link>
 </motion.div>
 </div>
 </div>
 )
}

export default ServiceClient