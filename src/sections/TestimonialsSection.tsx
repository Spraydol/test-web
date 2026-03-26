import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    avatar: '/images/avatar_1.jpg',
    name: 'Emma L.',
    quote: 'Finally, a platform that feels made for us.',
  },
  {
    avatar: '/images/avatar_2.jpg',
    name: 'Lucas M.',
    quote: 'I actually understand the lessons now.',
  },
  {
    avatar: '/images/avatar_3.jpg',
    name: 'Aisha K.',
    quote: 'The community saves me every week.',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: '14vh', opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              delay: index * 0.12,
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
      id="testimonials"
      className="relative w-full py-20 lg:py-28 z-[80] section-blue"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Title */}
        <h2
          ref={titleRef}
          className="heading-section text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-12 lg:mb-16"
        >
          Students love Edubuddy.
        </h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="testimonial-card relative"
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-4 right-4 w-8 h-8 text-white/20"
                strokeWidth={2}
              />

              {/* Avatar and name */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="avatar"
                />
                <h4 className="text-white font-semibold">
                  {testimonial.name}
                </h4>
              </div>

              {/* Quote */}
              <p className="text-white/80 text-lg italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
