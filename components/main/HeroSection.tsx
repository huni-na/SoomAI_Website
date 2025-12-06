"use client";

import React, { useEffect } from 'react';
import { useAnimate, motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = async () => {
        // --- 1. 초기화 (Reset) ---
        await animate([
          [".orb-animatable", { scale: 1, opacity: 1 }, { duration: 0 }],
          [".orb-teal", { opacity: 0 }, { duration: 0 }],
          // 4개의 텍스트 위치 초기화 (X자 배치)
          [".text-idea", { x: -300, y: -200, scale: 1, opacity: 1 }, { duration: 0 }],
          [".text-ai", { x: 300, y: -200, scale: 1, opacity: 1 }, { duration: 0 }],
          [".text-solution", { x: -300, y: 200, scale: 1, opacity: 1 }, { duration: 0 }],
          [".text-service", { x: 300, y: 200, scale: 1, opacity: 1 }, { duration: 0 }],
          
          ["#soomai-text", { opacity: 0, scale: 0.5 }, { duration: 0 }],
          ["#sub-slogan_k", { opacity: 0, y: 50 }, { duration: 0 }]
        ]);

        await new Promise(resolve => setTimeout(resolve, 800));

        // --- 2. 흡수 단계 (Absorb - 4 Steps) ---
        
        // Step 1: IDEA 흡수 (Teal 25%)
        await animate([
          [".text-idea", { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 1.0, ease: "easeInOut" }],
          [".orb-teal", { opacity: 0.25 }, { duration: 1.2, ease: "easeInOut", at: "<" }]
        ]);

        // Step 2: AI 흡수 (Teal 50%)
        await animate([
          [".text-ai", { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 1.0, ease: "easeInOut" }],
          [".orb-teal", { opacity: 0.50 }, { duration: 1.2, ease: "easeInOut", at: "<" }]
        ]);

        // Step 3: SOLUTION 흡수 (Teal 75%)
        await animate([
          [".text-solution", { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 1.0, ease: "easeInOut" }],
          [".orb-teal", { opacity: 0.75 }, { duration: 1.2, ease: "easeInOut", at: "<" }]
        ]);

        // Step 4: SERVICE 흡수 (Teal 100%)
        await animate([
          [".text-service", { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 1.0, ease: "easeInOut" }],
          [".orb-teal", { opacity: 1 }, { duration: 1.2, ease: "easeInOut", at: "<" }]
        ]);

        await new Promise(resolve => setTimeout(resolve, 500));

        // --- 3. 호흡 단계 (Inhale) ---
        await animate(".orb-animatable", { scale: 0, opacity: 0 }, { duration: 0.6, ease: "backIn" });
        
        // --- 4. 재등장 단계 (Exhale & Reveal) ---
        await Promise.all([
          animate(".orb-animatable", { scale: 1, opacity: 1 }, { duration: 1.2, ease: "backOut" }),
          animate(".orb-teal", { opacity: 0 }, { duration: 0.8, ease: "easeInOut" }),
          animate("#soomai-text", { opacity: 1, scale: 1 }, { duration: 1.2, ease: "backOut", delay: 0.1 }),
          animate("#sub-slogan_k", { opacity: 1, y: 0 }, { duration: 1.0, ease: "easeOut", delay: 0.3 })
        ]);
    };

    sequence();
  }, [animate]);

  return (
    <section ref={scope} className="relative w-full h-screen  bg-[#0a0a0a]">
      
      {/* --- FLUID ORB (구체) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <motion.div className="orb-animatable relative flex items-center justify-center w-[450px] h-[450px] md:w-[600px] md:h-[600px]">
          <div 
            className="absolute w-full h-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 20%, #d1d1d1 50%, #999999 100%)',
              boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)',
              animation: 'fluid-wobble 8s ease-in-out infinite'
            }}
          />
          <motion.div 
            className="orb-teal absolute w-full h-full"
            initial={{ opacity: 0 }}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #aafffe 0%, #3FB0AE 30%, #2a8a88 60%, #1a5a58 100%)',
              boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)',
              animation: 'fluid-wobble 8s ease-in-out infinite'
            }}
          />
        </motion.div>
      </div>

      {/* --- TEXT ELEMENTS (4 WORDS) --- */}
      
      {/* 1. IDEA: 좌측 상단 (오른쪽 정렬) */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div 
          className="text-idea absolute right-0 bottom-0 flex justify-end origin-bottom-right" 
          initial={{ x: -300, y: -200 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#3FB0AE] drop-shadow-[0_0_15px_rgba(63,176,174,0.4)] text-right">
            IDEA
          </h1>
        </motion.div>
      </div>

      {/* 2. AI: 우측 상단 (왼쪽 정렬) */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div 
          className="text-ai absolute left-0 bottom-0 flex justify-start origin-bottom-left" 
          initial={{ x: 300, y: -200 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#3FB0AE] drop-shadow-[0_0_15px_rgba(63,176,174,0.4)] text-left">
            AI
          </h1>
        </motion.div>
      </div>

      {/* 3. SOLUTION: 좌측 하단 (오른쪽 정렬) */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div 
          className="text-solution absolute right-0 top-0 flex justify-end origin-top-right" 
          initial={{ x: -300, y: 200 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#3FB0AE] drop-shadow-[0_0_15px_rgba(63,176,174,0.4)] text-right">
            SOLUTION
          </h1>
        </motion.div>
      </div>

       {/* 4. SERVICE: 우측 하단 (왼쪽 정렬) */}
       <div className="absolute top-1/2 left-1/2 pointer-events-none">
        <motion.div 
          className="text-service absolute left-0 top-0 flex justify-start origin-top-left" 
          initial={{ x: 300, y: 200 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#3FB0AE] drop-shadow-[0_0_15px_rgba(63,176,174,0.4)] text-left">
            SERVICE
          </h1>
        </motion.div>
      </div>


      {/* --- FINAL REVEAL --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center">
        <motion.div 
          id="soomai-text" 
          className="flex items-center text-center" 
          initial={{ opacity: 0, scale: 0.5 }}
        >
          <Image 
            src="/img/logo/Logo_only.png" 
            alt="SoomAI Logo" 
            width={70} 
            height={70} 
          />
          <h1 className="text-6xl md:text-8xl font-bold text-black ml-4">
            SoomAI
          </h1>
        </motion.div>

        <motion.p 
          id="sub-slogan_k" 
          className="text-lg md:text-xl text-gray-900 mt-10 text-center font-light tracking-wide" 
          initial={{ y: 50, opacity: 0 }}
        >
          AI로, 모든 서비스에 새로운 '숨'을 불어넣다.
        </motion.p>
      </div>

      <style>{`
        @keyframes fluid-wobble {
            0% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            5% { border-radius: 95% 95% 80% 80% / 90% 80% 95% 95% transform: scale(1); }
            10% { border-radius: 90% 90% 85% 85% / 95% 85% 90% 90% transform: scale(1); }
            15% { border-radius: 100% 85% 90% 90% / 100% 90% 85% 85% transform: scale(0.95); }
            20% { border-radius: 100% 80% 95% 95% / 100% 95% 80% 80%; transform: scale(1); }
            25% { border-radius: 100% 80% 80% 80% / 100% 80% 80% 80%; transform: scale(0.95); } /*Idea 들어가는 타이밍*/
            30% { border-radius: 85% 100% 100% 100% / 85% 100% 100% 100%; transform: scale(1); }
            35% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(1); }
            40% { border-radius: 80% 100% 80% 80% / 80% 100% 80% 80%; transform: scale(0.95); } /*AI 들어가는 타이밍*/
            45% { border-radius: 100% 85% 100% 100% / 100% 85% 100% 100%; transform: scale(1); }
            50% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(1); } 
            55% { border-radius: 80% 80% 80% 100% / 80% 80% 80% 100%; transform: scale(0.95); } /*Solution 들어가는 타이밍*/
            60% { border-radius: 100% 100% 100% 85% / 100% 100% 100% 85%; transform: scale(1); } 
            65% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(1); }
            70% { border-radius: 80% 80% 100% 80% / 80% 80% 100% 80%; transform: scale(0.95); } /*Service 들어가는 타이밍*/
            75% { border-radius: 100% 100% 85% 100% / 100% 100% 85% 100%; transform: scale(1); }
            80% { border-radius: 95% 80% 95% 95% / 80% 95% 80% 80%; transform: scale(1); }
            85% { border-radius: 90% 85% 90% 90% / 85% 90% 85% 85% transform: scale(0.95); }
            90% { border-radius: 85% 90% 85% 85% / 90% 85% 90% 90% transform: scale(1); }
            95% { border-radius: 80% 95% 80% 80% / 95% 80% 95% 95% transform: scale(1); }
            100% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
        }
      `}</style>
      
    </section>
  );
};

export default HeroSection;