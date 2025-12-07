"use client";

import React, { useEffect, useState } from 'react';
import { useAnimate, motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection = () => {
  const [scope, animate] = useAnimate();
  const [orbPhase, setOrbPhase] = useState("initial");

  useEffect(() => {
    // [반응형 로직 1] 화면 크기에 따라 애니메이션 시작 위치(거리)를 동적으로 계산합니다.
    const isMobile = window.innerWidth < 768;
    
    // 모바일이면 거리를 좁게(화면 밖으로 나가지 않게), 데스크탑이면 넓게 설정
    // x축: 가로 너비의 약 35% 지점 (모바일) vs 350px (데스크탑)
    const dist = {
        x: isMobile ? window.innerWidth * 0.35 : 350, 
        y: isMobile ? window.innerHeight * 0.25 : 250 
    };

    const sequence = async () => {
        // --- 1. 초기화 (Reset) ---
        // 텍스트들을 화면 중앙이 아닌, 계산된 거리(dist)만큼 떨어진 곳에 배치
        await animate([
          [".orb-animatable", { scale: 1, opacity: 1 }, { duration: 0 }],
          [".orb-teal", { opacity: 0 }, { duration: 0 }],
          
          // IDEA (우측 하단에서 대각선 위로 올라옴 -> 원점 기준 -x, -y)
          // *수정: 원본 코드의 방향에 맞춰 좌표를 동적 변수(dist)로 교체
          [".text-idea", { x: -dist.x, y: -dist.y, scale: 1, opacity: 1 }, { duration: 0 }],
          
          // AI (좌측 하단 -> 원점 기준 +x, -y)
          [".text-ai", { x: dist.x, y: -dist.y, scale: 1, opacity: 1 }, { duration: 0 }],
          
          // SOLUTION (우측 상단 -> 원점 기준 -x, +y)
          [".text-solution", { x: -dist.x, y: dist.y, scale: 1, opacity: 1 }, { duration: 0 }],
          
          // SERVICE (좌측 상단 -> 원점 기준 +x, +y)
          [".text-service", { x: dist.x, y: dist.y, scale: 1, opacity: 1 }, { duration: 0 }],
          
          ["#soomai-text", { opacity: 0, scale: 0.5 }, { duration: 0 }],
          ["#sub-slogan_k", { opacity: 0, y: 50 }, { duration: 0 }]
        ]);

        await new Promise(resolve => setTimeout(resolve, 800));

        // --- 2. 흡수 단계 (Absorb) ---
        // (좌표 0,0으로 이동하는 것은 동일하므로 모바일/PC 로직 같음)

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
        await animate(".orb-animatable", { scale: 0, opacity: 0 }, { duration: 0.6, ease: "backIn" });
        
        setOrbPhase("reborn");

        // --- 4. 재등장 단계 (Exhale & Reveal) ---
        await Promise.all([
          // 모바일에서는 구체가 너무 커지지 않도록 scale 조정이 필요할 수 있으나,
          // 아래 CSS에서 width/height를 반응형으로 잡으므로 scale: 1로 두어도 무방합니다.
          animate(".orb-animatable", { scale: 1, opacity: 1 }, { duration: 1.2, ease: "backOut" }),
          animate(".orb-teal", { opacity: 0 }, { duration: 0.8, ease: "easeInOut" }),
          animate("#soomai-text", { opacity: 1, scale: 1 }, { duration: 1.2, ease: "backOut", delay: 0.1 }),
          animate("#sub-slogan_k", { opacity: 1, y: 0 }, { duration: 1.0, ease: "easeOut", delay: 0.3 })
        ]);
    };

    sequence();
    
    // 화면 리사이즈 시 애니메이션 위치 재계산이 필요하다면 여기에 이벤트 리스너 추가 가능
    // (보통 Hero 섹션은 첫 로딩 기준이므로 생략해도 무방)
  }, [animate]);

  const currentAnimation = orbPhase === "initial" 
    ? 'fluid-wobble 8s ease-in-out infinite' 
    : 'fluid-wobble-reborn 6s ease-in-out infinite';

  return (
    <section ref={scope} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      
      {/* --- FLUID ORB (구체) --- */}
      {/* [반응형 로직 2] 구체의 크기를 모바일(w-72 = 288px) -> 태블릿(md:w-[500px]) -> 데스크탑(lg:w-[600px])으로 단계적 조절 */}
      <div className="absolute z-0 pointer-events-none">
        <motion.div className="orb-animatable relative flex items-center justify-center w-72 h-72 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
          <div 
            className="absolute w-full h-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 20%, #d1d1d1 50%, #999999 100%)',
              boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)',
              animation: currentAnimation
            }}
          />
          <motion.div 
            className="orb-teal absolute w-full h-full"
            initial={{ opacity: 0 }}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #aafffe 0%, #3FB0AE 30%, #2a8a88 60%, #1a5a58 100%)',
              boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)',
              animation: currentAnimation
            }}
          />
        </motion.div>
      </div>

      {/* --- TEXT ELEMENTS (4 WORDS) --- */}
      {/* [반응형 로직 3] 폰트 크기를 text-3xl(모바일) -> md:text-5xl(태블릿) -> lg:text-6xl(데스크탑)으로 조절 */}
      
      {/* 1. IDEA */}
      <div className="absolute pointer-events-none w-full h-full flex items-center justify-center">
        <motion.div 
          className="text-idea absolute" 
          // initial 값은 useEffect 안에서 덮어씌워지지만 SSR 깜빡임 방지를 위해 CSS로 중앙 배치 후 애니메이션으로 이동
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#3FB0AE] drop-shadow-[0_0_15px_rgba(63,176,174,0.4)] text-center whitespace-nowrap">
            IDEA
          </h1>
        </motion.div>
      </div>

      {/* 2. AI */}
      <div className="absolute pointer-events-none w-full h-full flex items-center justify-center">
        <motion.div className="text-ai absolute">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#3FB0AE] drop-shadow-[0_0_15px_rgba(63,176,174,0.4)] text-center whitespace-nowrap">
            AI
          </h1>
        </motion.div>
      </div>

      {/* 3. SOLUTION */}
      <div className="absolute pointer-events-none w-full h-full flex items-center justify-center">
        <motion.div className="text-solution absolute">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#3FB0AE] drop-shadow-[0_0_15px_rgba(63,176,174,0.4)] text-center whitespace-nowrap">
            SOLUTION
          </h1>
        </motion.div>
      </div>

       {/* 4. SERVICE */}
       <div className="absolute pointer-events-none w-full h-full flex items-center justify-center">
        <motion.div className="text-service absolute">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#3FB0AE] drop-shadow-[0_0_15px_rgba(63,176,174,0.4)] text-center whitespace-nowrap">
            SERVICE
          </h1>
        </motion.div>
      </div>


      {/* --- FINAL REVEAL (로고 및 슬로건) --- */}
      <div className="absolute z-20 pointer-events-none flex flex-col items-center justify-center w-full px-4">
        <motion.div 
          id="soomai-text" 
          className="flex items-center justify-center text-center" 
          initial={{ opacity: 0, scale: 0.5 }}
        >
          {/* [반응형 로직 4] 로고 이미지 크기 조절 (w-10 ~ w-[70px]) */}
          <div className="relative w-10 h-10 md:w-14 md:h-14 lg:w-[70px] lg:h-[70px]">
             <Image 
                src="/img/logo/Logo_only.png" 
                alt="SoomAI Logo" 
                fill
                className="object-contain"
             />
          </div>
          
          {/* [반응형 로직 5] 메인 타이틀 폰트 크기 조절 */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black ml-2 md:ml-4">
            SoomAI
          </h1>
        </motion.div>

        {/* [반응형 로직 6] 서브 슬로건 폰트 및 여백 조절 */}
        <motion.p 
          id="sub-slogan_k" 
          className="text-sm md:text-lg lg:text-xl text-gray-900 mt-6 md:mt-10 text-center font-light tracking-wide break-keep" 
          initial={{ y: 50, opacity: 0 }}
        >
          AI로, 모든 서비스에 새로운 '숨'을 불어넣다.
        </motion.p>
      </div>

      <style>{`
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

        @keyframes fluid-wobble-reborn {
           0% { border-radius: 50%; transform: scale(1); }
           25% { border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%; transform: scale(1.02); }
           50% { border-radius: 50% 50% 55% 45% / 55% 45% 50% 50%; transform: scale(0.98); }
           75% { border-radius: 45% 55% 45% 55% / 45% 50% 55% 50%; transform: scale(1.02); }
           100% { border-radius: 50%; transform: scale(1); }
        }
      `}</style>
      
    </section>
  );
};

export default HeroSection;