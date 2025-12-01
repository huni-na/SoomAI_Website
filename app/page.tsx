import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServiceGrid from "@/components/ServiceGrid";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ServiceGrid />
    </div>
  );
}