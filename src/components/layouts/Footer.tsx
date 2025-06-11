import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#192f59] text-white py-10 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10 md:flex-row md:justify-between">
        
        {/* Left: Logo and Description */}
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src="/ISN_Primary_Logo.png"
            alt="ISN Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <p className="max-w-sm text-sm leading-relaxed">
            The SKS Student Portal is a dedicated platform established to promote student involvement in sports and co-curricular activities, fostering holistic development through organized events and official recognition.
          </p>
        </div>

        {/* Middle: Contact Info */}
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-white" />
            <span>Email: support@sksportal.edu.my</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-white" />
            <span>Phone: +603–8991 4400</span>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 items-start">
          <Instagram className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          <Youtube className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          <Facebook className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
          <Twitter className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-10 text-center text-sm font-semibold flex justify-center gap-10">
        <Link href="" className="hover:text-gray-300">FAQ</Link>
        <Link href="" className="hover:text-gray-300">Privacy Policy</Link>
        <Link href="" className="hover:text-gray-300">Terms & Conditions</Link>
      </div>
    </footer>
  );
}
