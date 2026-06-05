import './index.css';
import CustomCursor from './components/CustomCursor';
import FloatingElements from './components/FloatingElements';
import ChatBot from './components/ChatBot';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Floating elements sit at z-index 0 — behind all page content */}
      <FloatingElements />

      {/* All content at z-index 1 — always above floating elements */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Services />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}
