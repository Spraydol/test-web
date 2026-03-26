import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#6B46C1]/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="heading-section text-xl lg:text-2xl text-white">
              Edubuddy
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="nav-link"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="nav-link"
            >
              Exams
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="nav-link"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection('login')}
              className="glass-button px-6 py-2 text-white font-medium"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#6B46C1]/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left text-white py-2"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left text-white py-2"
            >
              Exams
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="block w-full text-left text-white py-2"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection('login')}
              className="block w-full text-left text-white py-2"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
