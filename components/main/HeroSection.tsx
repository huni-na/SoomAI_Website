"use client";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

const HeroSection = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animation = async () => {
        // Phase 1: The Ingredients
        await animate([
            ["#service-text", { opacity: 1, x: 0 }, { duration: 0.5, at: 0 }],
            ["#ai-text", { opacity: 1, x: 0 }, { duration: 0.5, at: 0 }],
            ["#line-left", { scaleX: 1 }, { duration: 1, at: 0.5 }],
            ["#line-right", { scaleX: 1 }, { duration: 1, at: 0.5 }],
        ]);
    
        // Phase 2: Compression
        await animate([
            ["#line-left", { x: '50vw', scaleX: 0.05, opacity: 0}, { duration: 2, at: 0 }],
            ["#line-right", { x: '-50vw', scaleX: 0.05, opacity: 0}, { duration: 2, at: 0 }],
            ["#service-text", { x: '25vw', opacity: 0 }, { duration: 1, at: 0 }],
            ["#ai-text", { x: '-25vw', opacity: 0 }, { duration: 1, at: 0 }],
        ]);

        await animate([
            ["#line-left", { opacity: 0 }],
            ["#line-right", { opacity: 0 }],
        ]);

        // Phase 3: Materialization
        await animate("#logo-image", 
            { scale: [0, 2, 1.5], opacity: 1, filter: ['blur(10px)', 'blur(0px)'] }, 
            { duration: 0.5, type: "spring", stiffness: 200 }
        );

        // Phase 4: The Breath
        await animate("#logo-image", { scale: 1.1 }, { duration: 0.5 });
        await animate("#logo-image", { opacity: 0 }, { duration: 0.5 });


        // Phase 5: Brand Reveal
        await animate("#soomai-text", { opacity: 1, scale: 1 }, { duration: 0.5 });
        await animate("#sub-slogan_k", { y: 0, opacity: 1}, { duration: 0.5 });
    };

    animation();
  }, [animate]);

  return (
    <section ref={scope} id="hero" className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-[#0a0a0a]">
        {/* Phase 1 & 2 */}
        <motion.h1 id="service-text" className="absolute left-[20%] text-6xl font-bold text-white" initial={{ opacity: 0, x: -100 }}>Service</motion.h1>
        <motion.h1 id="ai-text" className="absolute right-[20%] text-6xl font-bold text-white" initial={{ opacity: 0, x: 100 }}>AI</motion.h1>
        <motion.div id="line-left" className="absolute left-0 w-1/2 h-1.5 bg-[#3FB0AE] origin-left" initial={{ scaleX: 0 }}/>
        <motion.div id="line-right" className="absolute right-0 w-1/2 h-1.5 bg-[#3FB0AE] origin-right" initial={{ scaleX: 0 }}/>
        
        {/* Phase 3 & 4 */}
        <motion.div id="logo-image" className="absolute" initial={{ opacity: 0, scale: 0 }} style={{ filter: "drop-shadow(0 0 1rem #3FB0AE)" }}>
            <Image src="/img/Logo_only.png" alt="SoomAI Logo" width={100} height={100} />
        </motion.div>

        {/* Phase 5 */}
        <motion.div id="soomai-text" className="flex items-center text-center" initial={{ opacity: 0, scale: 1 }}>
            <Image src="/img/Logo_only.png" alt="SoomAI Logo" width={70} height={70} style={{ filter: "drop-shadow(0 0 1rem #3FB0AE)" }} />
            <h1 className="text-8xl font-bold text-white ml-4" style={{ textShadow: '0 0 20px #3FB0AE' }}>SoomAI</h1>
        </motion.div>
        <motion.p id="sub-slogan_k" className="text-xl text-gray-300 mt-10" initial={{ y: 50, opacity: 0 }}>AI로, 모든 서비스에 새로운 '숨'을 불어넣다.</motion.p>

    </section>
  );
};

export default HeroSection;