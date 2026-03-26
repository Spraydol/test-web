import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import WhySection from './sections/WhySection';
import StreakSection from './sections/StreakSection';
import CommunitySection from './sections/CommunitySection';
import LoginSection from './sections/LoginSection';
import AllInOneSection from './sections/AllInOneSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Setup global scroll snap
    const setupScrollSnap = () => {
      const sections = gsap.utils.toArray<HTMLElement>('section');
      
      ScrollTrigger.create({
        snap: {
          snapTo: (_progress, self) => {
            if (!self) return 0;
            const sectionStarts = sections.map((s) =>
              ScrollTrigger.create({ trigger: s, start: 'top top' }).start
            );
            const scrollPos = self.scroll();
            const closest = sectionStarts.reduce((prev, curr) =>
              Math.abs(curr - scrollPos) < Math.abs(prev - scrollPos)
                ? curr
                : prev
            );
            return closest / ScrollTrigger.maxScroll(window);
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupScrollSnap, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
        <WhySection />
        <StreakSection />
        <CommunitySection />
        <LoginSection />
        <AllInOneSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
