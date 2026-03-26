import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow animation
      gsap.fromTo(
        glowRef.current,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card animation
      gsap.fromTo(
        cardRef.current,
        { y: '12vh', opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous glow pulse
      gsap.to(glowRef.current, {
        scale: 1.04,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative w-full py-20 lg:py-28 z-[90] section-violet overflow-hidden"
    >
      {/* Amber glow background */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(245,158,11,0) 70%)',
        }}
      />

      <div className="relative w-full px-6 lg:px-12">
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="glass-card px-8 py-12 lg:px-16 lg:py-16 text-center max-w-2xl w-full"
          >
            {/* Sparkle icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F59E0B]/20 mb-6">
              <Sparkles className="w-8 h-8 text-[#F59E0B]" strokeWidth={2} />
            </div>

            {/* Headline */}
            <h2
              ref={headlineRef}
              className="heading-section text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            >
              Ready to succeed?
            </h2>

            {/* Subline */}
            <p className="text-white/80 text-lg mb-8">
              Join thousands of students studying smarter today.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('features')}
              className="btn-primary inline-flex items-center gap-2 text-lg mb-4"
            >
              Join Edubuddy now
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Secondary text */}
            <p className="text-white/50 text-sm">
              Free to start. No credit card needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
