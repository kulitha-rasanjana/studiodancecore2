import HeroSection from "../components/home/HeroSection";
import HappeningSection from "../components/home/HappeningSection";
import QuickLinks from "../components/home/QuickLinks";
import AboutSection from "../components/home/AboutSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HappeningSection />
      <QuickLinks />
      <AboutSection />
    </main>
  );
}
