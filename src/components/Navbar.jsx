import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

const links = ['Home', 'About', 'Skills', 'Services', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = links.map((link) => {
      const el = document.getElementById(link.toLowerCase());
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(link); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="heading-font font-bold text-xl cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollTo('home')}
        >
          <span className="gradient-text">LOORD</span>
          <span className="text-white">.Y!</span>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`nav-link bg-transparent border-none cursor-pointer ${
                active === link ? 'nav-link-active' : ''
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle — desktop */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={theme === 'dark' ? {
              background: '#f1f5f9',
              border: '1.5px solid #cbd5e1',
              boxShadow: '0 2px 12px rgba(241,245,249,0.3)',
            } : {
              background: '#0f172a',
              border: '1.5px solid rgba(124,58,237,0.5)',
              boxShadow: '0 2px 12px rgba(15,23,42,0.3)',
            }}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{   rotate:  90,  opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.22 }}
              >
                {theme === 'dark'
                  ? <FaSun  size={15} style={{ color: '#334155' }} />
                  : <FaMoon size={15} style={{ color: '#e2e8f0' }} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.a
            href={`${import.meta.env.BASE_URL}cv.pdf`}
            download="Yassine_Souissi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-sm py-2.5 px-6 no-underline"
            style={{ textDecoration: 'none' }}
          >
            My CV
          </motion.a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-8 py-6 flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className={`text-left py-3 px-4 rounded-xl border-none bg-transparent cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                    active === link
                      ? 'text-white bg-violet-600/20 border-l-2 border-violet-500'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={active === link ? { borderLeft: '2px solid #7c3aed' } : {}}
                >
                  {active === link && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
                  )}
                  {link}
                </button>
              ))}
              {/* Toggle + My CV side by side */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={toggle}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full cursor-pointer border-none font-semibold text-sm transition-all"
                  style={theme === 'dark' ? {
                    background: '#f1f5f9',
                    border: '1.5px solid #cbd5e1',
                    color: '#334155',
                  } : {
                    background: '#0f172a',
                    border: '1.5px solid rgba(124,58,237,0.5)',
                    color: '#e2e8f0',
                  }}
                >
                  {theme === 'dark'
                    ? <FaSun  size={14} style={{ color: '#334155' }} />
                    : <FaMoon size={14} style={{ color: '#e2e8f0' }} />}
                  <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                </button>

                <a
                  href={`${import.meta.env.BASE_URL}cv.pdf`}
                  download="Yassine_Souissi_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary text-sm text-center no-underline flex items-center justify-center"
                  style={{ textDecoration: 'none' }}
                >
                  My CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
