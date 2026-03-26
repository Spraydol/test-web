import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Simplified explanations',
  'Real student help',
  'All-in-one workspace',
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: '12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Checklist items animation
      const checklistItems = checklistRef.current?.querySelectorAll('.check-item');
      if (checklistItems) {
        gsap.fromTo(
          checklistItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: checklistRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative w-full py-20 lg:py-28 z-30 section-violet"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="glass-card overflow-hidden aspect-[4/3]">
              <img
                src="/images/why_student.jpg"
                alt="Student writing notes"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating chip */}
            <div className="absolute -bottom-4 left-6 glass-card px-4 py-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-white text-sm font-medium">
                Built for students
              </span>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Not just studying—
              <br />
              it's understanding.
            </h2>

            <p className="text-white/80 text-lg mb-8 max-w-md">
              We break topics down so you actually get them. No fluff, no
              overload.
            </p>

            <div ref={checklistRef} className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="check-item flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#F59E0B]" strokeWidth={3} />
                  </div>
                  <span className="text-white text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
