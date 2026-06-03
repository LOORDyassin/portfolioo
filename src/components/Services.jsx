import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPaintBrush, FaCode, FaGamepad } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

const iconMap = { FaPaintBrush, FaCode, FaGamepad };

export default function Services() {
  const { services } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="orb w-80 h-80 bg-pink-500/10 right-0 bottom-0" />

      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex">
            <span className="text-violet-400">03</span> Services
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2">
            What I <span className="gradient-text">Can Do for You</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            From concept to launch — I handle every layer of the creative and technical stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-3xl p-12 group cursor-default relative overflow-hidden"
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} rounded-t-3xl`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-10 flex items-center justify-center mb-6`}
                  style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
                >
                  {Icon && <Icon size={24} className="text-violet-400 group-hover:scale-110 transition-transform" />}
                </div>

                <h3 className="heading-font text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg text-slate-400"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
