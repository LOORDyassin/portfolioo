import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaPaperPlane } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

const iconMap = { FaGithub, FaLinkedin, FaInstagram, FaFacebook };

export default function Contact() {
  const { personal, social } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="orb w-80 h-80 bg-violet-600/12 left-0 bottom-0" />
      <div className="orb w-64 h-64 bg-cyan-500/10 right-0 top-20" />

      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-tag inline-flex">
            <span className="text-violet-400">05</span> Contact
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-bold text-white mt-2">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Got a project in mind? I'm always open to new opportunities, collaborations, and interesting challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card rounded-3xl p-12">
              <h3 className="heading-font text-xl font-bold text-white mb-6">Get in Touch</h3>

              <div className="space-y-5">
                {[
                  { icon: FaEnvelope, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                  { icon: FaMapMarkerAlt, label: 'Location', value: personal.location, href: '#' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 text-decoration-none group"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                      <Icon className="text-violet-400" size={18} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">{label}</p>
                      <p className="text-slate-200 font-medium">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="mt-8 p-5 rounded-2xl flex items-center gap-3"
                style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
              >
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Currently available for new projects</span>
              </div>
            </div>

            {/* Social */}
            <div className="glass-card rounded-3xl p-10">
              <p className="text-slate-500 text-sm mb-4">Find me on</p>
              <div className="grid grid-cols-2 gap-3">
                {social.map((s) => {
                  const Icon = iconMap[s.icon];
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
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
            className="glass-card rounded-3xl p-12"
          >
            <h3 className="heading-font text-xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', placeholder: 'Your Name', type: 'text' },
                  { key: 'email', placeholder: 'Your Email', type: 'email' },
                ].map(({ key, placeholder, type }) => (
                  <div key={key}>
                    <input
                      type={type}
                      placeholder={placeholder}
                      required
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-violet-500"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>
                ))}
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-5 py-4 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-violet-500"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              />

              <textarea
                rows={5}
                placeholder="Your message..."
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none resize-none transition-all focus:border-violet-500"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {sent ? (
                  <>Message Sent! ✓</>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
