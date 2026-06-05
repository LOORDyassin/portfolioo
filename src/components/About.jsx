import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaGraduationCap, FaSwimmer, FaGamepad, FaHeart, FaDownload, FaShareAlt, FaCheck } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

const NS       = 'loordyassin-portfolio';
const KEY      = 'photo-likes-v1';
const INIT     = 88;
const LS_COUNT = 'plikes-count';
const LS_LIKED = 'plikes-liked';

const api = (path) =>
  fetch(`https://api.countapi.xyz/${path}`, { cache: 'no-store' }).then(r => r.json());

async function fetchCount() {
  try {
    const d = await api(`get/${NS}/${KEY}`);
    if (d.value != null) return d.value;
  } catch {}
  // counter doesn't exist yet — create it
  try {
    const d = await api(`create?namespace=${NS}&key=${KEY}&value=${INIT}&enable_reset=false`);
    return d.value ?? INIT;
  } catch { return null; }
}

async function increment() {
  const d = await api(`hit/${NS}/${KEY}`); return d.value;
}

async function decrement() {
  const d = await api(`update/${NS}/${KEY}?amount=-1`); return d.value;
}


export default function About() {
  const { personal, education } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Read from localStorage cache instantly — no flash to 88 on refresh
  const [likes,  setLikes]  = useState(() => parseInt(localStorage.getItem(LS_COUNT) || INIT));
  const [liked,  setLiked]  = useState(() => localStorage.getItem(LS_LIKED) === 'true');
  const [copied, setCopied] = useState(false);

  const saveLikes = (v) => { setLikes(v); localStorage.setItem(LS_COUNT, String(v)); };

  // Sync with shared server on mount
  useEffect(() => {
    fetchCount().then(v => { if (v != null) saveLikes(v); });
  }, []);

  const handleLike = async () => {
    const nowLiked = !liked;
    setLiked(nowLiked);
    localStorage.setItem(LS_LIKED, String(nowLiked));
    // Optimistic update immediately
    saveLikes(nowLiked ? likes + 1 : likes - 1);
    try {
      const v = nowLiked ? await increment() : await decrement();
      if (v != null) saveLikes(v);
    } catch {}
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const hobbies = [
    { icon: FaSwimmer,    label: 'Swimming' },
    { icon: FaGamepad,    label: 'Gaming'   },
    { icon: FaGraduationCap, label: 'Learning' },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="orb w-72 h-72 bg-violet-600/10 -right-20 top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">
            <span className="text-violet-400">01</span> About Me
          </div>
          <h2 className="heading-font text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-2 mb-4">
            The Person Behind the{' '}
            <span className="gradient-text">Pixels</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 mt-6 md:mt-10 lg:mt-14 items-start md:items-center">
          {/* Left — second photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="w-full h-56 sm:h-72 md:h-80 lg:h-[500px] rounded-3xl overflow-hidden"
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

            {/* Action buttons */}
            <div className="flex gap-3 mt-5 justify-center">

              {/* Like */}
              <motion.button
                onClick={handleLike}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border-none cursor-pointer text-sm font-semibold transition-all"
                style={{
                  background: liked ? 'rgba(244,63,94,0.15)' : 'rgba(255,255,255,0.06)',
                  border: liked ? '1px solid rgba(244,63,94,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  color: liked ? '#fb7185' : '#94a3b8',
                }}
              >
                <motion.span animate={liked ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
                  <FaHeart size={13} />
                </motion.span>
                <span>{likes}</span>
              </motion.button>

              {/* Download photo */}
              <motion.a
                href={personal.photo2}
                download="Yassine_Souissi.jpg"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold no-underline"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                  textDecoration: 'none',
                }}
              >
                <FaDownload size={13} />
                <span>Save</span>
              </motion.a>

              {/* Share */}
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border-none cursor-pointer text-sm font-semibold"
                style={{
                  background: copied ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
                  border: copied ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  color: copied ? '#34d399' : '#94a3b8',
                }}
              >
                {copied ? <FaCheck size={13} /> : <FaShareAlt size={13} />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </motion.button>
            </div>

            {/* Toast */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  exit={{   opacity: 0, y: 10, scale: 0.95 }}
                  className="fixed bottom-24 left-1/2 z-[9995] flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium"
                  style={{
                    transform: 'translateX(-50%)',
                    background: 'rgba(16,185,129,0.15)',
                    border: '1px solid rgba(16,185,129,0.35)',
                    color: '#34d399',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <FaCheck size={12} /> Link copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hobbies */}
            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8 justify-center">
              {hobbies.map(({ icon: Icon, label }) => (
                <div key={label} className="glass-card rounded-xl px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-2">
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
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">{personal.bio}</p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-10">{personal.bioExtended}</p>

            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6 sm:mb-10">
              {[
                { icon: FaMapMarkerAlt, label: 'Location', value: personal.location },
                { icon: FaEnvelope, label: 'Email', value: personal.email },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card rounded-2xl p-4 sm:p-6 flex items-start gap-3">
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
              <div key={i} className="glass-card rounded-2xl p-5 sm:p-8">
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
              href={`${import.meta.env.BASE_URL}cv.pdf`}
              download="Yassine_Souissi_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary inline-block mt-6 sm:mt-8 w-full sm:w-auto text-center no-underline"
              style={{ textDecoration: 'none' }}
            >
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
