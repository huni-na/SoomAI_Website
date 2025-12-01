"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./ui/Modal";

const services = [
  {
    title: "AI Chatbot",
    description: "24/7 customer support with our intelligent AI chatbot.",
    tags: ["NLP", "Machine Learning", "React"],
  },
  {
    title: "Image Generation",
    description: "Create stunning visuals with our AI-powered image generation.",
    tags: ["GANs", "Deep Learning", "Python"],
  },
  {
    title: "Data Analysis",
    description: "Unlock insights from your data with our advanced analytics.",
    tags: ["Big Data", "AI", "Tableau"],
  },
];

const ServiceGrid = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-[#111111] p-8 rounded-lg cursor-pointer border border-transparent hover:border-[#3FB0AE] hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedService(service)}
              whileHover={{
                boxShadow: "0 0 20px #3FB0AE",
              }}
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedService && (
        <Modal
          title={selectedService.title}
          onClose={() => setSelectedService(null)}
        >
          <p className="text-gray-400 mb-4">{selectedService.description}</p>
          <div className="flex flex-wrap gap-2">
            {selectedService.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#3FB0AE]/20 text-[#3FB0AE] px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ServiceGrid;