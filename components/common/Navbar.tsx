"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <div className="flex-shrink-0">
          <a href="/">
            <Image src="/img/logo.png" alt="SoomAI Logo" width={120} height={40} />
          </a>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a
              href="/"
              className="text-gray-300 hover:text-[#3FB0AE] px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="service"
              className="text-gray-300 hover:text-[#3FB0AE] px-3 py-2 rounded-md text-sm font-medium"
            >
              Service
            </a>
            <a
              href="contact"
              className="text-gray-300 hover:text-[#3FB0AE] px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;