import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaImage } from 'react-icons/fa';

const linkIconMap = { FaGithub, FaImage };
import { portfolioData } from '../data/portfolio';

export default function Projects() {
  const { projects } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Dev', 'Design', 'Gaming'];
  const tagMap = { Dev: ['HTML', 'CSS', 'JavaScript', 'React'], Design: ['Figma', 'Photoshop', 'Branding', 'Graphic Design'], Gaming: ['Gaming'] };

  const filtered = filter === 'All' ? projects : projects.filter(p =>
    p.tags.some(t => tagMap[filter]?.includes(t))
  );

  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="orb w-96 h-96 bg-violet-600/8 left-1/3 top-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 sm:mb-10 lg:mb-12"
        >
          <div className="section-tag inline-flex">
            <span className="text-violet-400">04</span> Projects
          </div>
          <h2 className="heading-font text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-2">
            Work I'm <span className="gradient-text">Proud Of</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A curated selection of projects that showcase my range across design, development, and gaming.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-2 mb-6 sm:mb-10 lg:mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl overflow-hidden group"
              >
                {/* Project image / placeholder */}
                <div className={`h-40 sm:h-44 lg:h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  {/* Fallback letter — always rendered underneath */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="heading-font text-white/20 font-bold text-6xl select-none">
                      {project.title.charAt(0)}
                    </span>
                  </div>

                  {/* Real image on top — removes itself on error */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      onError={e => e.target.remove()}
                    />
                  )}

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-20" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 z-30 bg-yellow-500/90 text-black text-xs font-bold px-2.5 py-1 rounded-full">
                      Featured
                    </div>
                  )}

                  {/* Links overlay — always visible on touch, hover-only on pointer devices */}
                  <div className="absolute top-3 right-3 z-30 flex gap-2 project-links transition-opacity">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-black/60 rounded-lg flex items-center justify-center text-white hover:bg-violet-600 transition-colors"
                    >
                      {(() => { const I = linkIconMap[project.linkIcon] || FaGithub; return <I size={14} />; })()}
                    </a>
                    {project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-black/60 rounded-lg flex items-center justify-center text-white hover:bg-cyan-600 transition-colors"
                      >
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="heading-font font-bold text-white text-base sm:text-lg mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg text-violet-300"
                        style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.15)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 sm:mt-12"
        >
          <a
            href="https://github.com/LOORDyassin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-block no-underline"
          >
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
