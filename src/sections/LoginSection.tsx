import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, KeyRound, Shield, PartyPopper, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Mail,
    title: 'Enter your academic email',
    description: 'Use your school or university email',
  },
  {
    icon: KeyRound,
    title: 'Code sent instantly',
    description: 'Check your inbox for the verification code',
  },
  {
    icon: Shield,
    title: 'Verify',
    description: 'Enter the code to confirm your identity',
  },
  {
    icon: PartyPopper,
    title: 'Welcome 🎉',
    description: "You're all set to start learning!",
  },
];

export default function LoginSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

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

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.fromTo(
            step,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Auto-advance steps animation
      const stepInterval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 2000);

      return () => clearInterval(stepInterval);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="login"
      className="relative w-full py-20 lg:py-28 z-[60] section-blue"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="glass-card overflow-hidden aspect-[4/3]">
              <img
                src="/images/login_student.jpg"
                alt="Student using laptop"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secure chip */}
            <div className="absolute -bottom-4 right-6 glass-card px-4 py-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm font-medium">
                Secure login
              </span>
            </div>
          </div>

          {/* Right - Steps */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-white mb-8">
              Get started in seconds.
            </h2>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => { stepsRef.current[index] = el; }}
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 ${
                    activeStep === index
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-transparent border border-transparent'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div
                    className={`step-number transition-all duration-500 ${
                      activeStep === index ? 'step-active' : ''
                    }`}
                  >
                    {activeStep > index ? (
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <step.icon
                        className={`w-5 h-5 ${
                          activeStep === index ? 'text-white' : 'text-white/60'
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold text-lg transition-colors duration-300 ${
                        activeStep === index ? 'text-white' : 'text-white/70'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        activeStep === index
                          ? 'text-white/80'
                          : 'text-white/50'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F59E0B] transition-all duration-500 rounded-full"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
