import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaPaperPlane, FaUser, FaTag, FaCommentDots } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolio';

const iconMap = { FaGithub, FaLinkedin, FaInstagram, FaFacebook };

const inputBase = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
};

function Field({ icon: Icon, label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-slate-400 text-xs font-medium tracking-wide uppercase flex items-center gap-2">
        <Icon size={11} className="text-violet-400" />
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const { personal, social } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Contact',
          message: form.message,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      const msg = err?.text || err?.message || JSON.stringify(err);
      setError('Error: ' + msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="orb w-80 h-80 bg-violet-600/12 left-0 bottom-0" />
      <div className="orb w-64 h-64 bg-cyan-500/10 right-0 top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="section-tag inline-flex">
            <span className="text-violet-400">05</span> Contact
          </div>
          <h2 className="heading-font text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-2">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Got a project in mind? I'm always open to new opportunities, collaborations, and interesting challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-12">
              <h3 className="heading-font text-xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-5">
                {[
                  { icon: FaEnvelope, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                  { icon: FaMapMarkerAlt, label: 'Location', value: personal.location, href: '#' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-center gap-4 group" style={{ textDecoration: 'none' }}>
                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                      <Icon className="text-violet-400" size={18} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">{label}</p>
                      <p className="text-slate-200 font-medium break-all text-sm sm:text-base">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl flex items-center gap-3 flex-wrap"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Currently available for new projects</span>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10">
              <p className="text-slate-500 text-sm mb-4">Find me on</p>
              <div className="grid grid-cols-2 gap-3">
                {social.map((s) => {
                  const Icon = iconMap[s.icon];
                  return (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        {Icon && <Icon className="text-violet-400 group-hover:scale-110 transition-transform" size={15} />}
                      </div>
                      <span className="text-slate-400 group-hover:text-slate-200 text-sm transition-colors">{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <div className="mb-7">
              <h3 className="heading-font text-2xl font-bold text-white">Send a Message</h3>
              <p className="text-slate-500 text-sm mt-1">I'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={FaUser} label="Full Name">
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={set('name')}
                    className="w-full px-4 py-3.5 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:ring-2 focus:ring-violet-500/40"
                    style={inputBase}
                  />
                </Field>
                <Field icon={FaEnvelope} label="Email Address">
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={form.email}
                    onChange={set('email')}
                    className="w-full px-4 py-3.5 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:ring-2 focus:ring-violet-500/40"
                    style={inputBase}
                  />
                </Field>
              </div>

              <Field icon={FaTag} label="Subject">
                <input
                  type="text"
                  placeholder="Project collaboration, Freelance work..."
                  value={form.subject}
                  onChange={set('subject')}
                  className="w-full px-4 py-3.5 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:ring-2 focus:ring-violet-500/40"
                  style={inputBase}
                />
              </Field>

              <Field icon={FaCommentDots} label="Message">
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, goals, timeline..."
                  required
                  value={form.message}
                  onChange={set('message')}
                  className="w-full px-4 py-3.5 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none resize-none transition-all focus:ring-2 focus:ring-violet-500/40"
                  style={inputBase}
                />
              </Field>

              {error && (
                <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <span className="text-red-400 text-xs leading-relaxed">{error}</span>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.97 }}
                className="btn-primary w-full flex items-center justify-center gap-2.5 py-4 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sent ? (
                  <><span className="text-lg">✓</span> Message Sent Successfully!</>
                ) : sending ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><FaPaperPlane size={13} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}