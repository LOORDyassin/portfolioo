import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaGraduationCap, FaSwimmer, FaGamepad } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

export default function About() {
  const { personal, education } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const hobbies = [
    { icon: FaSwimmer, label: 'Swimming' },
    { icon: FaGamepad, label: 'Gaming' },
    { icon: FaGraduationCap, label: 'Learning' },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="orb w-72 h-72 bg-violet-600/10 -right-20 top-20" />

      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">
            <span className="text-violet-400">01</span> About Me
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            The Person Behind the{' '}
            <span className="gradient-text">Pixels</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mt-14 items-center">
          {/* Left — second photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative pb-4 pr-4">
              <div className="w-full max-w-md mx-auto h-[500px] rounded-3xl overflow-hidden"
                style={{ border: '2px solid rgba(6, 182, 212, 0.3)' }}
              >
                <img
                  src={personal.photo2}
                  alt={personal.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #0c4a6e, #1e1b4b)';
                    e.target.parentElement.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:80px;">👤</div>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Decorative corners */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-violet-500 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-500 rounded-br-xl" />
            </div>

            {/* Hobbies */}
            <div className="flex gap-3 mt-10 justify-center">
              {hobbies.map(({ icon: Icon, label }) => (
                <div key={label} className="glass-card rounded-xl px-5 py-4 flex items-center gap-2">
                  <Icon className="text-violet-400" size={16} />
                  <span className="text-slate-300 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{personal.bio}</p>
            <p className="text-slate-400 leading-relaxed mb-10">{personal.bioExtended}</p>

            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: FaMapMarkerAlt, label: 'Location', value: personal.location },
                { icon: FaEnvelope, label: 'Email', value: personal.email },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card rounded-2xl p-6 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-violet-400" size={15} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">{label}</p>
                    <p className="text-slate-200 text-sm font-medium break-all">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            {education.map((edu, i) => (
              <div key={i} className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <FaGraduationCap className="text-cyan-400" size={18} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{edu.school}</p>
                    <p className="text-violet-400 text-sm">{edu.degree} · {edu.year}</p>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary inline-block mt-8 no-underline"
            >
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
