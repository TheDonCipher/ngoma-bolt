'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { ValueProposition } from '@/components/sections/value-proposition';
import { ProblemStatement } from '@/components/sections/problem-statement';
import { HowItWorks } from '@/components/sections/how-it-works';
import { CommunitySection } from '@/components/sections/community-section';
import { CTASection } from '@/components/sections/cta-section';
import { ImmersiveCanvas } from '@/components/ui/immersive-canvas';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { MusicParticles } from '@/components/ui/music-particles';
import { AdaptiveThemes } from '@/components/ui/adaptive-themes';
import { MouseResponsivePattern } from '@/components/ui/mouse-responsive-pattern';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background & UI elements */}
      <AdaptiveThemes />
      <ImmersiveCanvas />
      <ScrollProgress />
      <MusicParticles />

      {/* Global leteisi pattern background with subtle mouse-responsive movement (no bounce) */}
      <MouseResponsivePattern
        opacity={0.2}
        intensity={0.005}
        patternType="leteisi"
        limitRange={10}
      />

      {/* Global gradient overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none z-0"></div>

      {/* Main content sections with completely clear backgrounds */}
      <div className="relative z-10">
        {/* Hero section */}
        <section id="hero" className="relative pt-24 py-24 overflow-hidden">
          <div className="container px-4 relative z-10">
            <HeroSection />
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="relative py-24 overflow-hidden">
          <div className="container px-4 relative z-10">
            <FeaturesSection />
          </div>
        </section>

        {/* Value proposition section */}
        <section id="solutions" className="relative py-24 overflow-hidden">
          <div className="container px-4 relative z-10">
            <ValueProposition />
          </div>
        </section>

        {/* Problems statement section */}
        <section id="problems" className="relative py-24 overflow-hidden">
          <div className="container px-4 relative z-10">
            <ProblemStatement />
          </div>
        </section>

        {/* How it works section */}
        <section id="how-it-works" className="relative py-24 overflow-hidden">
          <div className="container px-4 relative z-10">
            <HowItWorks />
          </div>
        </section>

        {/* Community section */}
        <section id="community" className="relative py-24 overflow-hidden">
          <div className="container px-4 relative z-10">
            <CommunitySection />
          </div>
        </section>

        {/* CTA section */}
        <section id="cta" className="relative py-24 overflow-hidden">
          <div className="container px-4 relative z-10">
            <CTASection />
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-background/90 border-t border-white/10">
          <Footer />
        </footer>
      </div>
    </main>
  );
}
