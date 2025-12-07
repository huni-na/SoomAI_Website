"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { sendEmail } from "@/app/contact/actions"; // Server Action import

// 애니메이션 변수 (동일)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // [수정됨] 실제 서버 액션 연결
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    
    // Server Action 호출
    const result = await sendEmail(formData);

    if (result.success) {
      setFormStatus("success");
    } else {
      console.error(result.error);
      setFormStatus("error"); 
      alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setFormStatus("idle");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden py-20 px-6">
      {/* 배경 장식 요소 (동일) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#3FB0AE] rounded-full opacity-5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#3FB0AE] rounded-full opacity-5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Side (동일) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col justify-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-sm font-bold tracking-widest text-[#3FB0AE] mb-4 uppercase">
              Get in Touch
            </h2>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Breathe Life <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FB0AE] to-[#2a7a79]">
                Into Service.
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
              AI로 서비스에 새로운 숨을 불어넣을 준비가 되셨나요?
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <ContactItem icon={Mail} text="hello@soomai.life" label="Email" />
          </motion.div>
        </motion.div>

        {/* Right Side: 입력 폼 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl"
        >
          {formStatus === "success" ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20"
            >
              <div className="w-20 h-20 bg-[#3FB0AE]/20 rounded-full flex items-center justify-center text-[#3FB0AE] mb-4 shadow-[0_0_20px_rgba(63,176,174,0.4)]">
                <Send size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-gray-400">문의가 성공적으로 접수되었습니다.<br/>빠른 시일 내에 답변 드리겠습니다.</p>
              <button 
                onClick={() => setFormStatus("idle")}
                className="mt-6 text-[#3FB0AE] hover:text-white transition-colors underline underline-offset-4"
              >
                추가 문의하기
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* [수정됨] name 속성 추가 필수! */}
                <InputGroup label="Name" name="name" type="text" placeholder="홍길동" />
                <InputGroup label="Company" name="company" type="text" placeholder="SoomAI Corp" />
              </div>
              {/* [수정됨] name 속성 추가 필수! */}
              <InputGroup label="Email" name="email" type="email" placeholder="example@email.com" />
              
              <div className="group relative">
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  name="message" // [수정됨] name="message"가 있어야 서버에서 읽을 수 있음
                  rows={4}
                  className="w-full bg-transparent border-b border-gray-700 text-white text-lg py-2 focus:outline-none focus:border-[#3FB0AE] transition-colors resize-none placeholder-gray-600"
                  placeholder="내용을 작성해주세요"
                  required
                />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#3FB0AE] transition-all duration-300 group-focus-within:w-full shadow-[0_0_10px_#3FB0AE]" />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(63, 176, 174, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === "submitting"}
                className="w-full bg-[#3FB0AE] text-black font-bold text-lg py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-[#4ddddd]"
              >
                {formStatus === "submitting" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// [수정됨] 재사용 가능한 Input 컴포넌트: name prop 추가
const InputGroup = ({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) => {
  return (
    <div className="group relative">
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <input
        name={name} // [중요] form 데이터 전송을 위해 name 속성 바인딩
        type={type}
        className="w-full bg-transparent border-b border-gray-700 text-white text-lg py-2 focus:outline-none focus:border-[#3FB0AE] transition-colors placeholder-gray-600"
        placeholder={placeholder}
        required
      />
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#3FB0AE] transition-all duration-300 group-focus-within:w-full shadow-[0_0_8px_#3FB0AE]" />
    </div>
  );
};

const ContactItem = ({ icon: Icon, text, label }: { icon: any; text: string; label: string }) => {
  return (
    <motion.div variants={fadeInUp} className="flex items-center gap-5 group cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#3FB0AE] group-hover:bg-[#3FB0AE]/10 transition-all duration-300">
        <Icon size={20} className="text-gray-400 group-hover:text-[#3FB0AE] transition-colors" />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-lg text-gray-200 group-hover:text-white transition-colors">{text}</p>
      </div>
    </motion.div>
  );
};

export default ContactSection;