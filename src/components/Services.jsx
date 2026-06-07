import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPaintBrush, FaCode, FaVideo, FaArrowRight } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

const iconMap = { FaPaintBrush, FaCode, FaVideo };

const numbers = ['01', '02', '03'];

export default function Services() {
  const { services } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="orb w-96 h-96 bg-violet-500/8 left-0 top-1/3" />
      <div className="orb w-72 h-72 bg-cyan-500/6 right-0 bottom-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="section-tag inline-flex">
            <span className="text-violet-400">03</span> Services
          </div>
          <h2 className="heading-font text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-2">
            What I <span className="gradient-text">Can Do for You</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Specialized in design, development, and video production — delivering end-to-end creative solutions that elevate brands and drive real results.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="service-card group"
                style={{ '--svc-accent': service.accent }}
              >
                {/* Top accent line */}
                <div
                  className="service-card-bar"
                  style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
                />

                {/* Number + Icon row */}
                <div className="flex items-start justify-between mb-8">
                  <div
                    className="service-icon-box"
                    style={{ background: `color-mix(in srgb, ${service.accent} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${service.accent} 25%, transparent)` }}
                  >
                    {Icon && <Icon size={22} style={{ color: service.accent }} className="transition-transform duration-300 group-hover:scale-110" />}
                  </div>
                  <span className="service-number">{numbers[i]}</span>
                </div>

                {/* Text */}
                <h3 className="heading-font text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-7">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map((tag) => (
                    <span key={tag} className="service-tag" style={{ '--svc-accent': service.accent }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom CTA line */}
                <div className="flex items-center gap-2 mt-auto text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
                  style={{ color: service.accent, opacity: 0.7 }}
                >
                  <span>Learn More</span>
                  <FaArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
