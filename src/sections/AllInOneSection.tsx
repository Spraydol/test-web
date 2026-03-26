import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, FileText, Users, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: BookOpen, text: 'Courses & exercises' },
  { icon: FileText, text: 'Past exams & corrections' },
  { icon: Users, text: 'Community help' },
];

export default function AllInOneSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { y: '16vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
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
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="allinone"
      className="relative w-full py-20 lg:py-28 z-[70] section-violet"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Wide image */}
        <div ref={imageRef} className="relative mb-10 lg:mb-14">
          <div className="glass-card overflow-hidden aspect-[16/9] lg:aspect-[21/9]">
            <img
              src="/images/allinone_workspace.jpg"
              alt="Student workspace"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating chip */}
          <div className="absolute bottom-4 left-6 glass-card px-4 py-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-white text-sm font-medium">
              Always up to date
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16"
        >
          <div>
            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-white">
              One place for your whole semester.
            </h2>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 glass-button"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon
                    className="w-5 h-5 text-[#F59E0B]"
                    strokeWidth={2}
                  />
                </div>
                <span className="text-white text-lg">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
