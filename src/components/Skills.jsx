import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaReact, FaHtml5, FaCss3Alt, FaPython, FaGitAlt,
  FaLightbulb, FaUsers, FaComments, FaBolt, FaClipboardCheck,
} from 'react-icons/fa';
import {
  SiFlutter, SiDart, SiJavascript, SiFirebase,
  SiVisualstudiocode, SiAdobephotoshop, SiAdobeillustrator,
  SiAdobepremierepro, SiFigma,
} from 'react-icons/si';
import { MdDesignServices, MdBrandingWatermark, MdVideoCameraBack } from 'react-icons/md';
import { TbApi } from 'react-icons/tb';
import { BsStars, BsInstagram } from 'react-icons/bs';

const skillCategories = [
  {
    label: 'Development',
    accent: '#ef4444',
    skills: [
      { name: 'React',           icon: FaReact },
      { name: 'Flutter',         icon: SiFlutter },
      { name: 'Dart',            icon: SiDart },
      { name: 'JavaScript',      icon: SiJavascript },
      { name: 'HTML',            icon: FaHtml5 },
      { name: 'CSS',             icon: FaCss3Alt },
      { name: 'Python',          icon: FaPython },
      { name: 'Firebase',        icon: SiFirebase },
      { name: 'API Integration', icon: TbApi },
      { name: 'Git',             icon: FaGitAlt },
      { name: 'VS Code',         icon: SiVisualstudiocode },
    ],
  },
  {
    label: 'Design & Media',
    accent: '#a78bfa',
    skills: [
      { name: 'UI/UX Design',   icon: SiFigma },
      { name: 'Graphic Design', icon: MdDesignServices },
      { name: 'Photoshop',      icon: SiAdobephotoshop },
      { name: 'Illustrator',    icon: SiAdobeillustrator },
      { name: 'Premiere Pro',   icon: SiAdobepremierepro },
      { name: 'Branding',       icon: MdBrandingWatermark },
      { name: 'Social Media',   icon: BsInstagram },
      { name: 'Video Editing',  icon: MdVideoCameraBack },
    ],
  },
  {
    label: 'Soft Skills',
    accent: '#06b6d4',
    skills: [
      { name: 'Problem Solving', icon: FaLightbulb },
      { name: 'Teamwork',        icon: FaUsers },
      { name: 'Communication',   icon: FaComments },
      { name: 'Creativity',      icon: BsStars },
      { name: 'Fast Learning',   icon: FaBolt },
      { name: 'Project Org.',    icon: FaClipboardCheck },
    ],
  },
];

function SkillCard({ skill, index, accent, inView }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.38, delay: index * 0.045, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -5, scale: 1.06 }}
      className="skill-icon-card"
      style={{ '--card-accent': accent }}
    >
      <span className="skill-icon-wrap">
        <Icon size={26} />
      </span>
      <span className="skill-icon-label">{skill.name}</span>
    </motion.div>
  );
}

function CategorySection({ category }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-10 last:mb-0">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="skill-dash" style={{ background: category.accent }} />
        <span
          className="text-xs font-bold tracking-[0.22em] uppercase select-none"
          style={{ color: category.accent }}
        >
          {category.label}
        </span>
      </motion.div>

      <div className="skill-card-grid">
        {category.skills.map((skill, i) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={i}
            accent={category.accent}
            inView={inView}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-violet-500/6 -left-48 top-1/3" />
      <div className="orb w-80 h-80 bg-cyan-500/5 right-0 bottom-1/4" />
      <div className="orb w-60 h-60 bg-red-500/4 right-1/3 top-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14 lg:mb-18"
        >
          <div className="section-tag inline-flex">
            <span className="text-violet-400">02</span> My Skills
          </div>
          <h2 className="heading-font text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-2">
            What I <span className="gradient-text">Bring to the Table</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            A blend of design sensibility and technical know-how, built over years of hands-on project work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="skills-panel"
        >
          {skillCategories.map((category) => (
            <CategorySection key={category.label} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
