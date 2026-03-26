import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const chatMessages = [
  {
    id: 1,
    avatar: '/images/chat_avatar_1.jpg',
    name: 'Ahmed',
    message: 'How do I understand derivatives?',
    isSelf: false,
  },
  {
    id: 2,
    avatar: '/images/chat_avatar_2.jpg',
    name: 'Sara',
    message: 'Simple explanation here 👇',
    isSelf: false,
  },
  {
    id: 3,
    avatar: '/images/chat_avatar_3.jpg',
    name: 'You',
    message: 'Thanks! That actually clicked.',
    isSelf: true,
  },
];

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Chat card animation
      gsap.fromTo(
        chatRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Messages stagger animation
      messagesRef.current.forEach((msg, index) => {
        if (msg) {
          gsap.fromTo(
            msg,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.15,
              scrollTrigger: {
                trigger: chatRef.current,
                start: 'top 70%',
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
      id="community"
      className="relative w-full py-20 lg:py-28 z-50 section-violet"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Headline */}
          <div ref={headlineRef}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#F59E0B]" strokeWidth={2} />
              </div>
              <span className="text-[#F59E0B] font-semibold uppercase tracking-wider text-sm">
                Live Community
              </span>
            </div>

            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Stuck?
              <br />
              The community has your back.
            </h2>

            <p className="text-white/80 text-lg max-w-md">
              Ask questions, share notes, get answers that make sense.
            </p>
          </div>

          {/* Right - Chat */}
          <div ref={chatRef} className="glass-card p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Math Help Channel
              </h4>
              <span className="text-white/50 text-sm">24 online</span>
            </div>

            <div className="space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={msg.id}
                  ref={(el) => { messagesRef.current[index] = el; }}
                  className={`flex items-start gap-3 ${
                    msg.isSelf ? 'flex-row-reverse' : ''
                  }`}
                >
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                  />
                  <div
                    className={`chat-bubble ${
                      msg.isSelf ? 'chat-bubble-self' : ''
                    }`}
                  >
                    <p className="text-white/60 text-xs mb-1">{msg.name}</p>
                    <p className="text-white">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input placeholder */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 glass-button px-4 py-3 text-white/50 text-sm">
                Type your question...
              </div>
              <button className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
