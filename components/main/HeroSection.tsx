"use client";

import React, { useEffect, useState } from 'react'; // [수정] useState 추가
import { useAnimate, motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection = () => {
  const [scope, animate] = useAnimate();
  
  // [추가] 1. 애니메이션 단계를 관리하는 상태 (initial: 처음, reborn: 재등장)
  const [orbPhase, setOrbPhase] = useState("initial");

  useEffect(() => {
    const sequence = async () => {
        // --- 1. 초기화 (Reset) ---
        await animate([
          [".orb-animatable", { scale: 1, opacity: 1 }, { duration: 0 }],
          [".orb-teal", { opacity: 0 }, { duration: 0 }],
          // 4개의 텍스트 위치 초기화
          [".text-idea", { x: -300, y: -200, scale: 1, opacity: 1 }, { duration: 0 }],
          [".text-ai", { x: 300, y: -200, scale: 1, opacity: 1 }, { duration: 0 }],
          [".text-solution", { x: -300, y: 200, scale: 1, opacity: 1 }, { duration: 0 }],
          [".text-service", { x: 300, y: 200, scale: 1, opacity: 1 }, { duration: 0 }],
          
          ["#soomai-text", { opacity: 0, scale: 0.5 }, { duration: 0 }],
          ["#sub-slogan_k", { opacity: 0, y: 50 }, { duration: 0 }]
        ]);

        await new Promise(resolve => setTimeout(resolve, 800));

        // --- 2. 흡수 단계 (Absorb - 4 Steps) ---
        
        // Step 1: IDEA 흡수
        await animate([
          [".text-idea", { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 1.0, ease: "easeInOut" }],
          [".orb-teal", { opacity: 0.25 }, { duration: 1.2, ease: "easeInOut", at: "<" }]
        ]);

        // Step 2: AI 흡수
        await animate([
          [".text-ai", { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 1.0, ease: "easeInOut" }],
          [".orb-teal", { opacity: 0.50 }, { duration: 1.2, ease: "easeInOut", at: "<" }]
        ]);

        // Step 3: SOLUTION 흡수
        await animate([
          [".text-solution", { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 1.0, ease: "easeInOut" }],
          [".orb-teal", { opacity: 0.75 }, { duration: 1.2, ease: "easeInOut", at: "<" }]
        ]);

        // Step 4: SERVICE 흡수
        await animate([
          [".text-service", { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 1.0, ease: "easeInOut" }],
          [".orb-teal", { opacity: 1 }, { duration: 1.2, ease: "easeInOut", at: "<" }]
        ]);

        await new Promise(resolve => setTimeout(resolve, 500));

        // --- 3. 호흡 단계 (Inhale) ---
        // 구가 작아져서 사라짐
        await animate(".orb-animatable", { scale: 0, opacity: 0 }, { duration: 0.6, ease: "backIn" });
        
        // [추가] 2. 구가 사라진 이 시점에 애니메이션 상태 변경!
        setOrbPhase("reborn");

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

  // [추가] 3. 상태에 따라 적용할 애니메이션 CSS 문자열 결정
  // initial: 텍스트 먹을 때의 움직임 (8초)
  // reborn: 재등장 후의 평온한 움직임 (6초, 조금 더 빠르고 부드럽게)
  const currentAnimation = orbPhase === "initial" 
    ? 'fluid-wobble 8s ease-in-out infinite' 
    : 'fluid-wobble-reborn 6s ease-in-out infinite';

  return (
    <section ref={scope} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      
      {/* --- FLUID ORB (구체) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        {/* 구가 잘리지 않게 하려면 여기 w, h를 줄이거나 부모의 overflow를 확인하세요. 현재는 기존 값 유지 */}
        <motion.div className="orb-animatable relative flex items-center justify-center w-[450px] h-[450px] md:w-[600px] md:h-[600px]">
          <div 
            className="absolute w-full h-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 20%, #d1d1d1 50%, #999999 100%)',
              boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)',
              // [수정] 변수로 변경
              animation: currentAnimation
            }}
          />
          <motion.div 
            className="orb-teal absolute w-full h-full"
            initial={{ opacity: 0 }}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #aafffe 0%, #3FB0AE 30%, #2a8a88 60%, #1a5a58 100%)',
              boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)',
              // [수정] 변수로 변경
              animation: currentAnimation
            }}
          />
        </motion.div>
      </div>

      {/* --- TEXT ELEMENTS (4 WORDS) --- */}
      
      {/* 1. IDEA */}
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

      {/* 2. AI */}
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

      {/* 3. SOLUTION */}
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

       {/* 4. SERVICE */}
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

      {/* [수정 및 추가] CSS Keyframes */}
      <style>{`
        /* 1. 기존 애니메 수정함) */
        @keyframes fluid-wobble {
            0% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            5% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            10% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            15% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            20% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            

            25% { border-radius: 100% 80% 80% 80% / 100% 80% 80% 80%; transform: scale(0.9); } /* Idea 타이밍 */
            30% { border-radius: 85% 100% 100% 100% / 85% 100% 100% 100%; transform: scale(0.95); }
            35% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }

            40% { border-radius: 80% 100% 80% 80% / 80% 100% 80% 80%; transform: scale(0.9); } /* AI 타이밍 */
            45% { border-radius: 100% 85% 100% 100% / 100% 85% 100% 100%; transform: scale(0.95); }
            50% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }

            55% { border-radius: 80% 80% 80% 100% / 80% 80% 80% 100%; transform: scale(0.9); } /* Solution 타이밍 */
            60% { border-radius: 100% 100% 100% 85% / 100% 100% 100% 85%; transform: scale(0.95); }
            65% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }

            70% { border-radius: 80% 80% 100% 80% / 80% 80% 100% 80%; transform: scale(0.9); } /* Service 타이밍 */
            75% { border-radius: 100% 100% 85% 100% / 100% 100% 85% 100%; transform: scale(0.95); }
            80% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }

            85% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            90% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            95% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
            100% { border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%; transform: scale(0.95); }
        }

        /* 2. [추가됨] 재등장용 애니메이션 (더 부드럽고 안정적인 느낌) */
        @keyframes fluid-wobble-reborn {
           0% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; transform: scale(1); }
           25% { border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%; transform: scale(1.02); }
           50% { border-radius: 50% 50% 55% 45% / 55% 45% 50% 50%; transform: scale(0.98); }
           75% { border-radius: 45% 55% 45% 55% / 45% 50% 55% 50%; transform: scale(1.02); }
           100% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; transform: scale(1); }
        }
      `}</style>
      
    </section>
  );
};

export default HeroSection;