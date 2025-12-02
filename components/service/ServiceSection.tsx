"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ServiceModal, { Project } from "./ServiceModal";

// [데이터] 가상의 포트폴리오 데이터
const projectsData: Project[] = [
  {
    id: 1,
    title: "AI 맞춤형 멘토링 플랫폼",
    description: "개인의 성향을 분석하여 최적의 멘토를 매칭합니다.",
    fullDescription: "사용자의 학습 스타일, 목표, 현재 수준을 AI가 심층 분석합니다.\n단순한 매칭을 넘어, 성공적인 멘토링을 위한 대화 가이드와 단계별 로드맵을 자동으로 생성하여 실질적인 성장을 돕습니다.\n\n[주요 기능]\n- MBTI 기반 성향 분석 모델\n- 실시간 대화 코칭 봇\n- 성장 리포트 자동 생성",
    tags: ["Personalization", "EdTech", "AI Matching"],
    imageUrl: "https://placehold.co/800x600/1a1a1a/3FB0AE.png?text=Mentoring+Platform",
  },
  {
    id: 2,
    title: "시니어 친화적 챗봇 가이드",
    description: "복잡한 디지털 기기를 말로 쉽게 제어합니다.",
    fullDescription: "디지털 소외계층인 어르신들이 키오스크나 앱을 쉽게 사용할 수 있도록 돕습니다.\n작은 글씨 대신 큰 화면과 음성 안내를 제공하며, 복잡한 메뉴 구조를 단순한 대화형 인터페이스로 변환합니다.\n\n[주요 기능]\n- 고성능 음성 인식 (STT)\n- 시니어 맞춤형 UX/UI\n- 원격 보호자 연동",
    tags: ["Accessibility", "Silver Tech", "Voice AI"],
    imageUrl: "https://placehold.co/800x600/1a1a1a/3FB0AE.png?text=Senior+Guide",
  },
  {
    id: 3,
    title: "감성 분석 고객센터 솔루션",
    description: "고객의 숨겨진 감정까지 읽어내어 대응합니다.",
    fullDescription: "텍스트 너머의 고객 감정을 AI가 실시간으로 분석합니다.\n강성 불만 고객을 사전 탐지하여 상담원에게 알림을 보내고, 상황에 맞는 가장 부드러운 공감 표현을 추천해줍니다.\n\n[주요 기능]\n- NLP 감정 분석\n- 위기 상황 자동 알림\n- 응대 스크립트 추천",
    tags: ["Sentiment Analysis", "B2B SaaS", "NLP"],
    imageUrl: "https://placehold.co/800x600/1a1a1a/3FB0AE.png?text=Emotion+Analysis",
  },
  {
    id: 4,
    title: "생성형 AI 크리에이티브 스튜디오",
    description: "상상만 했던 이미지를 현실의 결과물로.",
    fullDescription: "디자이너가 아니어도 누구나 고퀄리티 콘텐츠를 만들 수 있습니다.\n텍스트 프롬프트만으로 브랜드 로고, 마케팅 배너, 웹사이트 시안을 즉시 생성하여 업무 효율을 극대화합니다.\n\n[주요 기능]\n- Text-to-Image Generation\n- 브랜드 스타일 학습\n- 저작권 걱정 없는 에셋",
    tags: ["Generative AI", "Creative Tool", "Image Gen"],
    imageUrl: "https://placehold.co/800x600/1a1a1a/3FB0AE.png?text=Creative+Studio",
  },
];

const ServiceSection = () => {
  // TypeScript 에러 방지를 위해 타입을 명시적으로 캐스팅
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="services" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3FB0AE]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#3FB0AE]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-4 mb-6 text-sm font-bold text-[#3FB0AE] bg-[#3FB0AE]/10 border border-[#3FB0AE]/20 rounded-full"
          >
            Our Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
          >
            우리가 만들어낸 <span className="text-[#3FB0AE]">숨결들</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            SoomAI의 기술이 실제 서비스로 구현된 결과물입니다.<br/>
            각 카드를 클릭하여 자세한 이야기를 확인해보세요.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative h-[320px] rounded-[32px] overflow-hidden cursor-pointer border border-white/10 hover:border-[#3FB0AE]/50 transition-all duration-500 bg-[#151515]"
            >
              <div className="absolute inset-0">
                {/* 중요: unoptimized 속성을 추가하여 설정 없이 외부 이미지를 바로 보여줍니다 */}
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                  unoptimized 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs font-medium text-[#3FB0AE] bg-[#3FB0AE]/10 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#3FB0AE] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-[#3FB0AE] transition-all duration-300 ml-4 shrink-0">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ServiceModal 
        selectedProject={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default ServiceSection;