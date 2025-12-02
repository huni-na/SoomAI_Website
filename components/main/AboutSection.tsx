import React from "react";
import { Feather, Wind, CircleDashed } from "lucide-react"; // 아이콘 변경: 확장성과 범용성 강조

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white text-center">
      <div className="container mx-auto max-w-6xl">
        
        {/* 1. 섹션 헤더: 확장성과 비전 강조 */}
        <div className="mb-16">
          <span className="inline-block py-1 px-4 mb-6 text-sm font-bold text-[#3FB0AE] bg-[#3FB0AE]/10 rounded-full">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            도움이 필요한 <span className="text-[#3FB0AE]">모든 곳</span>에,<br className="hidden md:block" />
            AI의 숨을 불어넣습니다.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            '호흡'을 의미하는 순우리말인 '숨'처럼<br />
            일상의 작은 아이디어부터 세상을 바꾸는 솔루션까지,<br />
            <strong>분야의 경계 없이 사람을 돕는 모든 아이디어</strong>를 현실로 만듭니다.
          </p>
        </div>

        {/* 2. 핵심 가치 카드: 범용적 가치 위주 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="p-8 rounded-2xl bg-[#bffcfa]/30 border border-gray-100 hover:border-[#3FB0AE]/50 hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#3FB0AE] transition-colors">
              <Feather className="w-6 h-6 text-[#3FB0AE] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Inhale</h3>
            <p className="text-gray-600 leading-relaxed">
              기술은 친절해야 합니다. 숨을 들이마시듯 누구나 쉽게 서비스를 이해하고 사용할 수 있도록, <strong>사람을 향한 따뜻한 서비스</strong>를 제공합니다.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#bffcfa]/30 border border-gray-100 hover:border-[#3FB0AE]/50 hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#3FB0AE] transition-colors">
              <CircleDashed className="w-6 h-6 text-[#3FB0AE] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Air</h3>
            <p className="text-gray-600 leading-relaxed">
              우리의 무대는 정해져 있지 않습니다. 우리 곁의 산소처럼 <strong>서비스가 필요한 곳이라면 어디든</strong> SoomAI가 함께합니다.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#bffcfa]/30 border border-gray-100 hover:border-[#3FB0AE]/50 hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#3FB0AE] transition-colors">
              <Wind className="w-6 h-6 text-[#3FB0AE] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Exhale</h3>
            <p className="text-gray-600 leading-relaxed">
              단순한 기술 과시가 아닙니다. 숨을 내뱉어 이산화탄소를 배출하듯, 사용자의 삶 속 <strong>어려움과 답답함을 비워내고 실질적인 도움과 변화</strong>를 주는 의미 있는 서비스를 만듭니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;