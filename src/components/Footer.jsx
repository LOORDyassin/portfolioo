import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaHeart } from 'react-icons/fa';

const iconMap = { FaGithub, FaLinkedin, FaInstagram, FaFacebook };

export default function Footer() {
  const { personal, social } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
        <div>
          <p className="heading-font font-bold text-lg">
            <span className="gradient-text">LOORD</span>
            <span className="text-white">.Y!</span>
          </p>
          <p className="text-slate-600 text-sm mt-1">
            © {year} {personal.name}. All rights reserved.
          </p>
        </div>

        <p className="text-slate-600 text-sm flex items-center gap-1.5">
          Built with <FaHeart className="text-pink-500" size={12} /> using React & Tailwind
        </p>

        <div className="flex gap-3">
          {social.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-500 hover:text-violet-400 transition-colors"
              >
                {Icon && <Icon size={14} />}
              </motion.a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
