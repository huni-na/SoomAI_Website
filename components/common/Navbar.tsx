"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  // 모바일 메뉴 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 로고 영역 */}
          <div className="flex-shrink-0 cursor-pointer">
            <a href="/">
              <Image src="/img/logo/Logo.png" alt="SoomAI Logo" width={120} height={40} />
            </a>
          </div>

          {/* Desktop Menu (768px 이상에서만 보임) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="/" text="Home" />
              <NavLink href="service" text="Service" />
              <NavLink href="contact" text="Contact" />
            </div>
          </div>

          {/* Mobile Menu Button (768px 미만에서만 보임) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* 햄버거 아이콘 / 닫기 아이콘 전환 */}
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (애니메이션 적용) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/90 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
              <MobileNavLink href="/" text="Home" />
              <MobileNavLink href="service" text="Service" />
              <MobileNavLink href="news" text="News" />
              <MobileNavLink href="contact" text="Contact" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// 중복 코드를 줄이기 위한 컴포넌트 분리

// 데스크탑 링크 컴포넌트
const NavLink = ({ href, text }: { href: string; text: string }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-[#3FB0AE] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {text}
  </a>
);

// 모바일 링크 컴포넌트 (터치 영역을 위해 조금 더 큼)
const MobileNavLink = ({ href, text }: { href: string; text: string }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-[#3FB0AE] hover:bg-white/5 block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
  >
    {text}
  </a>
);

export default Navbar;