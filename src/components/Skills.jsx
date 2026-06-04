import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="text-slate-300 font-medium text-sm min-w-0 truncate">{name}</span>
        <span className="text-slate-500 text-sm font-mono flex-shrink-0">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay }}
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}, #06b6d4)` }}
        />
      </div>
    </div>
  );
}

function BrowserFrame({ children }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <div className="browser-dots">
          <span className="browser-dot browser-dot-red" />
          <span className="browser-dot browser-dot-yellow" />
          <span className="browser-dot browser-dot-green" />
        </div>
        <div className="browser-url-bar">yassine.dev/skills</div>
        <div className="browser-actions">
          <span className="browser-icon" />
          <span className="browser-icon" />
        </div>
      </div>
      <div className="browser-content">{children}</div>
    </div>
  );
}

export default function Skills() {
  const { technicalSkills, softSkills } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="orb w-96 h-96 bg-cyan-500/8 -left-40 top-1/2" />

      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex">
            <span className="text-violet-400">02</span> My Skills
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2">
            What I <span className="gradient-text">Bring to the Table</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A blend of design sensibility and technical know-how, built over years of hands-on project work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <BrowserFrame>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Technical */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="glass-card rounded-3xl p-8 sm:p-12"
              >
                <h3 className="heading-font text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-mono">01</span>
                  Technical Skills
                </h3>
                {technicalSkills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 0.1} />
                ))}
              </motion.div>

              {/* Soft */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="glass-card rounded-3xl p-8 sm:p-12"
              >
                <h3 className="heading-font text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-mono">02</span>
                  Professional Skills
                </h3>
                {softSkills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} color="#7c3aed" delay={i * 0.1 + 0.2} />
                ))}

                {/* Expertise badges */}
                <div className="mt-10">
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Tools & Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Adobe Photoshop', 'VS Code', 'Git & GitHub', 'Chrome DevTools', 'Canva'].map((tool) => (
                      <span
                        key={tool}
                        className="text-xs px-3 py-1.5 rounded-full text-violet-300 font-medium"
                        style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </BrowserFrame>
        </motion.div>
      </div>
    </section>
  );
}
