"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

function Navbar() {
  // ## Link
const links = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Réserver", href: "/reservations" },
  { name: "Produits", href: "/produits" },
];

  const pathname = usePathname()
  if (pathname.startsWith('/studio')) return null
  return (
   <div className="bg-linear-to-r from-[#F0F7FF] to-[#FEFFFF] border-b border-gray-200 px-6 py-4">
   <nav className="flex items-center justify-between ">
    {/* ## logo */}
    <Link className="font-bold text-2xl" href={"/"}>Doctor</Link>
    <ul className="hidden md:flex">
      {links?.map((link,index)=>(
        <li id={index} className="">
          <Link
          className="m-4 font-bold text-gray-700"
          href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>

    {/* reserver */}
    <Link className="bg-blue-500 text-white font-bold px-3 py-1 rounded-md" href={"/"}>Reserver</Link>
   </nav>
   </div>
  )
}

export default Navbar