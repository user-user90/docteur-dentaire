import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-[#32ABAB] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Section 1: About */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Doctor Maroc</h3>
            <p className="text-white/80 leading-relaxed mb-6">
              Nous nous engageons à fournir les meilleurs soins médicaux avec des technologies de pointe et une équipe d'experts dévoués à votre santé.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-[#32ABAB] transition-all">
                <FaFacebookF />
              </Link>
              <Link href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-[#32ABAB] transition-all">
                <FaInstagram />
              </Link>
              <Link href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-[#32ABAB] transition-all">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 inline-block">Liens Rapides</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:translate-x-2 transition-transform inline-block opacity-90 hover:opacity-100">Accueil</Link></li>
              <li><Link href="/services" className="hover:translate-x-2 transition-transform inline-block opacity-90 hover:opacity-100">Nos Services</Link></li>
              <li><Link href="/about" className="hover:translate-x-2 transition-transform inline-block opacity-90 hover:opacity-100">À Propos</Link></li>
              <li><Link href="/contact" className="hover:translate-x-2 transition-transform inline-block opacity-90 hover:opacity-100">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 inline-block">Spécialités</h3>
            <ul className="space-y-4">
              <li className="opacity-90">Cardiologie</li>
              <li className="opacity-90">Dentaire</li>
              <li className="opacity-90">Orthopédie</li>
              <li className="opacity-90">Ophtalmologie</li>
            </ul>
          </div>

          {/* Section 4: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 inline-block">Contact</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="mt-1 text-xl" />
                <span className="opacity-90">123 Avenue Mohamed V, Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-4">
                <FaPhoneAlt />
                <span className="opacity-90">+212 5XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-4">
                <FaEnvelope />
                <span className="opacity-90">contact@doctormaroc.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} Doctor Maroc. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;