import { BookOpen, Mail, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full py-12 lg:py-16 z-[100] bg-[#4c1d95]">
      <div className="w-full px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="heading-section text-xl text-white">
                Edubuddy
              </span>
            </div>
            <p className="text-white/70 max-w-sm mb-6">
              Your smart study partner. Courses, exams, and community—all in one
              place.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-button flex items-center justify-center"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-button flex items-center justify-center"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-button flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Exams
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('community')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Community
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('streak')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Study Streak
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4" />
                <span>hello@edubuddy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2026 Edubuddy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/50 text-sm hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 text-sm hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
