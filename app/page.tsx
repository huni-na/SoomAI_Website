import HeroSection from "@/components/main/HeroSection";
import AboutSection from "@/components/main/AboutSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
    </div>
  );
}