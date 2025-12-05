"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ServiceModal, { Project } from "./ServiceModal";

const projectsData: Project[] = [
  {
    id: 1,
    title: "개인 맞춤형 멘토링",
    description: "사용자의 성향을 기준으로 최적의 솔루션",
    fullDescription: `사용자의 성향을 먼저 심층 분석하여 고민 분야에 대한 맞춤형 가이드를 제공합니다.\n\n단방향적인 조언에 그치지 않습니다. 사용자가 멘토링 결과를 실행 후 남긴 솔직한 텍스트 피드백을 통해 더욱 맞춤화되고 세밀해진 '나만의 멘토링'을 제공합니다.`,
    tags: ["개인 맞춤화", "멘토링", "심층분석"],
    imageUrl: "/img/service/service_1.png",
  },
  {
    id: 2,
    title: "성향 심층 분석 리포트",
    description: "8가지 질문으로 나만의 고유한 성향 리포트.",
    fullDescription: `"당신은 A타입입니다"라는 단순한 분류가 아닙니다.\n\n엄선된 8가지 심층 질문에 대한 사용자의 답변을 분석하여, 세상에 하나뿐인 '개인 성향 분석 리포트'를 텍스트로 발행합니다. 정형화된 카테고리에 갇히지 않은 사용자의 고유한 특성을 파악하여, 모든 SoomAI 서비스의 정확도를 높이는 핵심 기반이 됩니다.`,
    tags: ["성향분석", "개인화리포트", "데이터분석"],
    imageUrl: "/img/service/service_2.png",
  },
  {
    id: 3,
    title: "시니어 AI 사용 가이드 & 세미나",
    description: "기술 장벽을 허무는 쉬운 가이드와 대면 교육.",
    fullDescription: `기술 용어를 몰라도 누구나 AI를 이해하고 쓸 수 있도록 돕는 '쉬운 가이드라인'을 제작중입니다.\n\n가이드라인을 기반으로, 중장년층을 위한 '오프라인 세미나'를 통해 직접 만나 강의를 계획중에 있습니다. 현장에서 가이드를 설명해 드리고 즉각적인 피드백을 주고받으며, 막막했던 디지털 기기 활용의 길을 친절하게 열어드립니다.`,
    tags: ["가이드북", "오프라인 세미나", "시니어케어"],
    imageUrl: "/img/service/service_3.png",
  }
];

const ServiceSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="services" className="py-36 px-6 bg-[#0a0a0a] relative overflow-hidden">
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
            Our Services
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