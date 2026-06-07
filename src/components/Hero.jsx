import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaArrowDown } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

const iconMap = { FaGithub, FaLinkedin, FaInstagram, FaFacebook };

export default function Hero() {
  const { personal, stats, social } = portfolioData;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Orbs */}
      <div className="orb w-96 h-96 bg-violet-600/20 top-20 -left-32" />
      <div className="orb w-80 h-80 bg-cyan-500/15 bottom-32 right-0" />
      <div className="orb w-64 h-64 bg-pink-500/10 top-1/2 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-14 sm:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-tag mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Available for Work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="heading-font text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">{personal.name.split(' ')[0]}</span>
              <br />
              <span className="text-slate-300 text-base sm:text-xl md:text-2xl lg:text-5xl font-medium">{personal.tagline}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mt-6 max-w-lg"
            >
              I design{' '}
              <span className="text-violet-400 font-medium">brands</span>,
              build{' '}
              <span className="text-cyan-400 font-medium">web experiences</span>,
              and craft{' '}
              <span className="text-emerald-400 font-medium">video content</span>{' '}
              — delivering complete digital solutions from concept to launch, with precision and style.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-6 sm:mt-10"
            >
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </button>
              <button
                className="btn-outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Talk
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-5 mt-6 sm:mt-10"
            >
              {social.map((s) => {
                const Icon = iconMap[s.icon];

                if (s.name === 'GitHub') {
                  return (
                    <motion.a
                      key={s.name}
                      href={personal.photo2}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full overflow-hidden"
                      style={{ border: '2px solid rgba(139,92,246,0.5)' }}
                      title="View photo"
                    >
                      <img
                        src={personal.photo2}
                        alt={personal.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </motion.a>
                  );
                }

                return (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    {Icon && <Icon size={17} />}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right — photo + stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative flex flex-col items-center px-0 sm:px-6 lg:px-10"
          >
            {/* Photo frame — badges are siblings of the photo, never inside overflow-hidden */}
            <div className="relative w-full max-w-xs sm:w-80 lg:w-96">
              <div className="absolute inset-0 rounded-3xl glow-purple" />
              <div className="w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px] rounded-3xl overflow-hidden"
                style={{ border: '2px solid rgba(124, 58, 237, 0.4)' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}free-palestine.svg`}
                  alt="Free Palestine — فلسطين حرة"
                  className="w-full h-full object-contain"
                  style={{ background: '#080814' }}
                />
              </div>

              {/* Floating badge — right side */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="hidden sm:block absolute -right-14 top-8 z-20 rounded-2xl px-5 py-3 whitespace-nowrap"
                style={{ background: 'rgba(8,8,20,0.95)', border: '1px solid rgba(124,58,237,0.45)', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
              >
                <p className="text-violet-400 font-bold text-lg leading-none">5+</p>
                <p className="text-slate-300 text-xs mt-1">Years Exp.</p>
              </motion.div>

              {/* Floating badge — left side */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="hidden sm:block absolute -left-14 bottom-20 z-20 rounded-2xl px-5 py-3 whitespace-nowrap"
                style={{ background: 'rgba(8,8,20,0.95)', border: '1px solid rgba(6,182,212,0.45)', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
              >
                <p className="text-cyan-400 font-bold text-lg leading-none">22+</p>
                <p className="text-slate-300 text-xs mt-1">Projects Done</p>
              </motion.div>
            </div>

            {/* Caption — completely outside the photo frame */}
            <div className="w-full max-w-xs sm:w-80 lg:w-96 mt-5 px-1 flex items-center justify-between">
              <div>
                <p className="heading-font font-bold text-base text-white leading-tight">{personal.name}</p>
                <p className="text-sm text-violet-300 mt-0.5">{personal.brand}</p>
              </div>
              <span className="text-xs text-emerald-400 border border-emerald-400/30 px-2 py-1 rounded-full whitespace-nowrap">Available</span>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-10 w-full"
            >
              {stats.map((s, i) => (
                <div key={i} className="glass-card rounded-2xl p-5 text-center">
                  <p className="heading-font font-bold text-2xl gradient-text">{s.value}</p>
                  <p className="text-slate-500 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-8 sm:mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-slate-600 cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <FaArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
