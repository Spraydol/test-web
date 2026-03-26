import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Brain, MessageCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bubble1Ref = useRef<HTMLDivElement>(null);
  const bubble2Ref = useRef<HTMLDivElement>(null);
  const bubble3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: '-12vw', scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9 }
      )
        .fromTo(
          [bubble1Ref.current, bubble2Ref.current, bubble3Ref.current],
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'back.out(1.7)',
          },
          '-=0.5'
        )
        .fromTo(
          headlineRef.current?.querySelectorAll('.word') || [],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.04 },
          '-=0.4'
        )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      scrollTl
        .fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          sublineRef.current,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(
          ctaRef.current,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.74
        )
        .fromTo(
          imageRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [bubble1Ref.current, bubble2Ref.current, bubble3Ref.current],
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
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
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden z-10"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floating ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full px-6 lg:px-12 pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left side - Image with bubbles */}
          <div className="relative order-2 lg:order-1">
            {/* Main image card */}
            <div
              ref={imageRef}
              className="glass-card overflow-hidden aspect-[4/3] lg:aspect-[4/3] max-w-xl mx-auto lg:mx-0"
            >
              <img
                src="/images/hero_student.jpg"
                alt="Student studying"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating icon bubbles */}
            <div
              ref={bubble1Ref}
              className="icon-bubble absolute -top-4 right-4 lg:right-8 floating"
            >
              <BookOpen className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <div
              ref={bubble2Ref}
              className="icon-bubble absolute bottom-8 -right-4 lg:right-0 floating-delayed"
              style={{ width: '84px', height: '84px' }}
            >
              <Brain className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            <div
              ref={bubble3Ref}
              className="icon-bubble absolute -bottom-4 left-8 floating-slow"
            >
              <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div ref={headlineRef} className="mb-6">
              <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                <span className="word inline-block">Study</span>{' '}
                <span className="word inline-block">smarter,</span>
                <br />
                <span className="word inline-block">stress</span>{' '}
                <span className="word inline-block">less.</span>
              </h1>
            </div>

            <p
              ref={sublineRef}
              className="text-lg lg:text-xl text-white/80 max-w-md mx-auto lg:mx-0 mb-8"
            >
              Courses, past exams, and a community that actually helps—all in
              one place.
            </p>

            <div ref={ctaRef} className="space-y-4">
              <button
                onClick={() => scrollToSection('features')}
                className="btn-primary inline-flex items-center gap-2 text-lg"
              >
                Start learning
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-white/70 text-sm">
                Already part of the community?{' '}
                <button
                  onClick={() => scrollToSection('login')}
                  className="text-[#F59E0B] font-semibold hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
