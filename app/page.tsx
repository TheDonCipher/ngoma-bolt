import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedArtists } from "@/components/sections/featured-artists";
import { HowItWorks } from "@/components/sections/how-it-works";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/patterns/afro-pattern.svg')] opacity-5 pointer-events-none" />
      <div className="relative">
        <HeroSection />
        <FeaturedArtists />
        <HowItWorks />
      </div>
    </main>
  );
}
