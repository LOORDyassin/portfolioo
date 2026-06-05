import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaRobot, FaTrash } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

const { personal, technicalSkills, softSkills, services, projects, social, education, stats } = portfolioData;

/* ── Intent responses ── */
const R = {
  greeting: [
    `Hi! I'm **LOORD.Y! Assistant** 👋\nAsk me anything about Yassine — his skills, projects, services, or how to hire him!`,
    `Hello! Great to meet you 😊\nI can tell you all about Yassine Souissi's work and experience. What would you like to know?`,
  ],
  about: [
    `${personal.bio}\n\n${personal.bioExtended}`,
    `Yassine Souissi (a.k.a **LOORD.Y!**) is a 19-year-old digital creative from **${personal.location}**. He blends design thinking with technical execution to build products people love. 🎨💻`,
  ],
  skills: [
    `**Technical Skills:**\n${technicalSkills.map(s => `• ${s.name} — ${s.level}%`).join('\n')}\n\n**Soft Skills:**\n${softSkills.map(s => `• ${s.name} — ${s.level}%`).join('\n')}`,
    `Yassine is strongest in **Figma (90%)**, **UI/UX (85%)**, and **HTML5 (88%)**. He also knows Photoshop, JavaScript, and CSS very well!`,
  ],
  services: [
    `Yassine offers **3 core services:**\n\n${services.map(s => `🔹 **${s.title}**\n${s.description}`).join('\n\n')}`,
  ],
  projects: [
    `Here are Yassine's **featured projects:**\n\n${projects.filter(p => p.featured).map(p => `⭐ **${p.title}**\n${p.description}\nTags: ${p.tags.join(', ')}`).join('\n\n')}`,
    `Yassine has worked on ${projects.length}+ projects across design, development, and gaming. His portfolio includes brand identities, web apps, and ad campaigns!`,
  ],
  contact: [
    `You can reach Yassine at:\n📧 **${personal.email}**\n📍 **${personal.location}**\n\nOr connect on **GitHub**, **LinkedIn**, or **Instagram** — links are in the Contact section!`,
  ],
  hire: [
    `Great decision! ✅ Yassine is **currently available** for new projects.\n\nJust drop him an email at **${personal.email}** or use the Contact form on this page!`,
  ],
  experience: [
    `Yassine has:\n${stats.map(s => `• **${s.value}** ${s.label}`).join('\n')}\n\nAll built through years of hands-on design and development work 🚀`,
  ],
  education: [
    `Yassine studies **${education[0].degree}** at *${education[0].school}* (${education[0].year}).\n\n${education[0].description}`,
  ],
  location: [
    `Yassine is based in **${personal.location}** 🌍. He works remotely with clients worldwide!`,
  ],
  social: [
    `Find Yassine on social media:\n${social.filter(s => s.url !== '#').map(s => `• **${s.name}**: ${s.url}`).join('\n')}`,
  ],
  tools: [
    `Yassine's toolkit includes:\n🎨 **Design:** Figma, Adobe Photoshop, Canva\n💻 **Dev:** HTML, CSS, JavaScript, React\n🛠️ **Other:** VS Code, Git & GitHub, Chrome DevTools`,
  ],
  price: [
    `Pricing depends on the project scope and complexity. The best way to get a quote is to reach out directly at **${personal.email}** — Yassine will get back to you quickly! 💬`,
  ],
  unknown: [
    `Hmm, I'm not sure about that one! 🤔\nTry asking me about Yassine's **skills**, **projects**, **services**, **experience**, or **how to hire** him!`,
    `I specialize in Yassine's portfolio info! Ask me about his **work**, **skills**, **contact**, or **education** 😊`,
  ],
};

const INTENTS = [
  { keys: ['hello','hi','hey','salut','bonjour','good','start','sup'],                        r: 'greeting'   },
  { keys: ['about','who','person','yourself','yassine','loord','bio','age','story'],          r: 'about'      },
  { keys: ['skill','know','figma','css','html','react','javascript','photoshop','design'],    r: 'skills'     },
  { keys: ['service','offer','provide','graphic','web','gaming'],                             r: 'services'   },
  { keys: ['project','work','portfolio','built','created','made','showcase','example'],       r: 'projects'   },
  { keys: ['contact','email','reach','message','talk','get in touch'],                        r: 'contact'    },
  { keys: ['hire','available','freelance','collaboration','job','open'],                      r: 'hire'       },
  { keys: ['experience','year','client','how long','many','stats'],                          r: 'experience' },
  { keys: ['education','study','school','university','degree','institute'],                   r: 'education'  },
  { keys: ['location','where','country','tunisia','city','live','based'],                     r: 'location'   },
  { keys: ['social','github','linkedin','instagram','follow','twitter'],                      r: 'social'     },
  { keys: ['tool','software','use','stack','tech'],                                           r: 'tools'      },
  { keys: ['price','cost','rate','charge','budget','quote','how much'],                       r: 'price'      },
];

function getReply(text) {
  const lower = text.toLowerCase();
  const match = INTENTS.find(({ keys }) => keys.some(k => lower.includes(k)));
  const arr = R[match ? match.r : 'unknown'];
  return arr[Math.floor(Math.random() * arr.length)];
}

function Bubble({ text, from }) {
  return (
    <div className={`flex ${from === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          from === 'user' ? 'rounded-br-sm text-white' : 'rounded-bl-sm text-slate-200'
        }`}
        style={from === 'user'
          ? { background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }
          : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }
        }
        dangerouslySetInnerHTML={{
          __html: text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#a78bfa">$1</strong>')
        }}
      />
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="w-2 h-2 rounded-full bg-violet-400 block"
            style={{ animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: `Hi! I'm **LOORD.Y! Assistant** 🤖\nAsk me anything about Yassine's skills, projects, services, or how to hire him!` },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const WELCOME = { from: 'ai', text: `Hi! I'm **LOORD.Y! Assistant** 🤖\nAsk me anything about Yassine's skills, projects, services, or how to hire him!` };

  const clearMessages = () => setMessages([WELCOME]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'ai', text: getReply(text) }]);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[9990] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-none cursor-pointer"
        animate={open ? {} : { y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
          boxShadow: '0 0 24px rgba(124,58,237,0.55), 0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
          >
            {open ? <FaTimes size={20} className="text-white" /> : <FaRobot size={22} className="text-white" />}
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }} />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-20 sm:bottom-24 z-[9989] flex flex-col rounded-2xl overflow-hidden
                       left-3 right-3 sm:left-auto sm:right-6 sm:w-[370px]"
            style={{
              height: 'clamp(360px, 65vh, 520px)',
              background: 'rgba(8,8,18,0.97)',
              border: '1px solid rgba(124,58,237,0.3)',
              boxShadow: '0 28px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: 'rgba(124,58,237,0.1)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>
                  <FaRobot size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold heading-font leading-none">LOORD.Y! Assistant</p>
                  <p className="text-xs mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    <span className="text-emerald-400">Online — always here to help</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={clearMessages}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  title="Clear messages"
                  className="text-slate-500 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-1.5 rounded-lg hover:bg-red-500/10"
                >
                  <FaTrash size={13} />
                </motion.button>
                <button onClick={() => setOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1.5 rounded-lg hover:bg-white/5">
                  <FaTimes size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(124,58,237,0.3) transparent' }}>
              {messages.map((m, i) => <Bubble key={i} {...m} />)}
              {typing && <TypingDots />}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            <div className="px-3 pb-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {['Skills', 'Projects', 'Hire me', 'Contact'].map(s => (
                <button key={s} onClick={() => { setInput(s); }}
                  className="text-xs px-3 py-1 rounded-full text-violet-300 cursor-pointer transition-all hover:bg-violet-500/20 border-none"
                  style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 pb-3 flex gap-2 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2.5 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <motion.button
                onClick={send}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-none cursor-pointer disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }}
              >
                <FaPaperPlane size={13} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
