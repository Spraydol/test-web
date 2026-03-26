import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, FileText, Play, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: BookOpen,
    title: 'Courses',
    description: 'Organized by subject, easy to follow.',
    image: '/images/features_courses.jpg',
  },
  {
    icon: FileText,
    title: 'Exams',
    description: 'Past papers + corrections.',
    image: '/images/features_exams.jpg',
  },
  {
    icon: Play,
    title: 'Videos',
    description: 'Lessons & motivation.',
    image: '/images/features_videos.jpg',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Ask, answer, grow.',
    image: '/images/features_community.jpg',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: '18vh', opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative w-full py-20 lg:py-28 z-20 section-blue"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Title */}
        <h2
          ref={titleRef}
          className="heading-section text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-12 lg:mb-16"
        >
          Everything you need to ace your year.
        </h2>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="feature-card group cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 lg:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="heading-section text-xl text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/70 text-sm lg:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
