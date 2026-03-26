import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StreakSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { scale: 0.85, opacity: 0, y: '10vh' },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Number counter animation
      const obj = { value: 0 };
      gsap.to(obj, {
        value: 3,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(obj.value).toString();
          }
        },
      });

      // Flame pulse animation (continuous)
      gsap.to(flameRef.current, {
        scale: 1.06,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="streak"
      className="relative w-full py-20 lg:py-28 z-40 section-blue"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="glass-card px-8 py-10 lg:px-16 lg:py-14 text-center max-w-lg w-full"
          >
            {/* Flame Icon */}
            <div
              ref={flameRef}
              className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] mb-6 glow-amber"
            >
              <Flame className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={2} />
            </div>

            {/* Label */}
            <h3 className="heading-section text-2xl lg:text-3xl text-white mb-4">
              Study Streak
            </h3>

            {/* Big Number */}
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span
                ref={numberRef}
                className="heading-display text-6xl lg:text-8xl text-[#F59E0B]"
              >
                0
              </span>
            </div>

            {/* Subtext */}
            <p className="text-white/70 text-lg mb-4">days in a row</p>

            {/* Motivational line */}
            <p className="text-white/60 text-sm">
              Come back tomorrow to keep the fire alive.
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {[1, 2, 3].map((day) => (
                <div
                  key={day}
                  className={`w-3 h-3 rounded-full ${
                    day <= 3
                      ? 'bg-[#F59E0B]'
                      : 'bg-white/20'
                  }`}
                />
              ))}
              {[4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className="w-3 h-3 rounded-full bg-white/20"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
