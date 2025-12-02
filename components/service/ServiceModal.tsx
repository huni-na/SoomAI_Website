"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

// 프로젝트 데이터 타입 정의 (외부에서 사용할 수 있도록 export)
export type Project = {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  imageUrl: string;
};

interface ServiceModalProps {
  selectedProject: Project | null;
  onClose: () => void;
}

const ServiceModal = ({ selectedProject, onClose }: ServiceModalProps) => {
  // 모달 내부 클릭 시 닫힘 방지
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {selectedProject && (
        <>
          {/* Backdrop (배경): 클릭 시 닫힘 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal Container: 화면 중앙 정렬 */}
          <div className="fixed inset-0 flex items-center justify-center z-[51] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={handleModalClick}
              className="bg-[#1a1a1a] border border-[#3FB0AE]/30 rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col pointer-events-auto shadow-2xl shadow-[#3FB0AE]/10"
            >
              {/* Header: 이미지 및 닫기 버튼 */}
              <div className="relative h-64 md:h-80 w-full shrink-0">
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80" />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-[#3FB0AE] rounded-full text-white transition-colors duration-200 backdrop-blur-md"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content: 스크롤 가능한 영역 */}
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium text-[#3FB0AE] bg-[#3FB0AE]/10 border border-[#3FB0AE]/20 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {selectedProject.title}
                </h3>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* 하단 장식용 라인 */}
                <div className="mt-8 h-1 w-20 bg-[#3FB0AE] rounded-full" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;