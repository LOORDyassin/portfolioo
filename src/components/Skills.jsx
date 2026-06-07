import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaReact, FaHtml5, FaCss3Alt, FaPython, FaGitAlt, FaJava,
  FaLightbulb, FaUsers, FaComments, FaBolt, FaClipboardCheck,
} from 'react-icons/fa';
import {
  SiFlutter, SiDart, SiJavascript, SiTypescript, SiFirebase, SiFigma, SiC,
} from 'react-icons/si';
import { MdDesignServices, MdBrandingWatermark, MdVideoCameraBack } from 'react-icons/md';
import {
  TbApi, TbBrandVscode, TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator, TbBrandAdobePremier,
} from 'react-icons/tb';
import { BsStars, BsInstagram } from 'react-icons/bs';

const skillCategories = [
  {
    label: 'Development',
    accent: '#60a5fa',
    reverse: false,
    skills: [
      { name: 'React',           icon: FaReact },
      { name: 'Flutter',         icon: SiFlutter },
      { name: 'Dart',            icon: SiDart },
      { name: 'JavaScript',      icon: SiJavascript },
      { name: 'TypeScript',      icon: SiTypescript },
      { name: 'HTML',            icon: FaHtml5 },
      { name: 'CSS',             icon: FaCss3Alt },
      { name: 'Python',          icon: FaPython },
      { name: 'C',               icon: SiC },
      { name: 'Java',            icon: FaJava },
      { name: 'Firebase',        icon: SiFirebase },
      { name: 'API Integration', icon: TbApi },
      { name: 'Git',             icon: FaGitAlt },
      { name: 'VS Code',         icon: TbBrandVscode },
    ],
  },
  {
    label: 'Design & Media',
    accent: '#a78bfa',
    reverse: true,
    skills: [
      { name: 'UI/UX Design',   icon: SiFigma },
      { name: 'Graphic Design', icon: MdDesignServices },
      { name: 'Photoshop',      icon: TbBrandAdobePhotoshop },
      { name: 'Illustrator',    icon: TbBrandAdobeIllustrator },
      { name: 'Premiere Pro',   icon: TbBrandAdobePremier },
      { name: 'Branding',       icon: MdBrandingWatermark },
      { name: 'Social Media',   icon: BsInstagram },
      { name: 'Video Editing',  icon: MdVideoCameraBack },
    ],
  },
  {
    label: 'Soft Skills',
    accent: '#06b6d4',
    reverse: false,
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

function MarqueeRow({ skills, accent, reverse }) {
  const doubled = [...skills, ...skills, ...skills];
  const Icon = null;
  return (
    <div className="marquee-outer">
      <div className={`marquee-track${reverse ? ' marquee-reverse' : ''}`}>
        {doubled.map((skill, i) => {
          const SkillIcon = skill.icon;
          return (
            <div key={i} className="marquee-pill" style={{ '--pill-accent': accent }}>
              <SkillIcon size={18} className="marquee-pill-icon" />
              <span className="marquee-pill-label">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CategoryRow({ category, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: category.reverse ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="mb-12 last:mb-0"
    >
      <div className="flex items-center gap-3 mb-5 px-1">
        <span className="marquee-dash" style={{ background: category.accent }} />
        <span
          className="text-xs font-bold tracking-[0.22em] uppercase select-none"
          style={{ color: category.accent }}
        >
          {category.label}
        </span>
      </div>
      <MarqueeRow
        skills={category.skills}
        accent={category.accent}
        reverse={category.reverse}
      />
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-violet-500/6 -left-48 top-1/3" />
      <div className="orb w-80 h-80 bg-cyan-500/5 right-0 bottom-1/4" />
      <div className="orb w-60 h-60 bg-blue-500/4 right-1/3 top-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="section-tag inline-flex">
            <span className="text-violet-400">02</span> My Skills
          </div>
          <h2 className="heading-font text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-2">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            From development to creative design — the tools, languages, and technologies I use daily.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="skills-panel"
        >
          {skillCategories.map((category, i) => (
            <CategoryRow key={category.label} category={category} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
