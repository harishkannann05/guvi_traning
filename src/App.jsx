import { useState, useEffect, useRef } from 'react';
import { IonApp, IonContent, IonPage, useIonViewDidEnter } from '@ionic/react';
import { rocketOutline, cloudDownloadOutline } from 'ionicons/icons'; // Keeping icons just in case, but using emojis mostly
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// We don't import other Ionic CSS to avoid overriding your custom design

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    college: 'Kongu Engineering College'
  });

  const contentRef = useRef(null);

  // Handle Scroll from IonContent (Native Scroll Replacement)
  const handleScroll = (e) => {
    setScrolled(e.detail.scrollTop > 50);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Create particle trail effect
      const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      ];

      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 3,
          velocityX: (Math.random() - 0.5) * 4,
          velocityY: Math.random() * -3 - 1,
          rotation: Math.random() * 360,
        };

        setParticles(prev => [...prev, newParticle]);

        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const fullText = "Empowering Students with Industry-Ready DevOps Skills";
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowSubtitle(true);
          setShowCursor(false);
          setTimeout(() => setShowButtons(true), 600);
        }, 500);
      }
    }, 50);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for registering! We will contact you soon.');
    closeModal();
    setFormData({
      name: '',
      email: '',
      department: '',
      year: '',
      college: 'Kongu Engineering College'
    });
  };

  return (
    <IonApp>
      <IonPage>
        {/* Custom Cursor Follower - Placed OUTSIDE IonContent to track correctly */}
        <div className="cursor-follower" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px`, zIndex: 99999 }} />
        <div className="cursor-dot" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px`, zIndex: 99999 }} />
        {particles.map(particle => (
          <div
            key={particle.id}
            className="cursor-particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color,
              '--velocity-x': `${particle.velocityX}px`,
              '--velocity-y': `${particle.velocityY}px`,
              '--rotation': `${particle.rotation}deg`,
              zIndex: 99998
            }}
          />
        ))}

        {/* Original Navigation - Placed OUTSIDE IonContent to stay Fixed */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ zIndex: 1000, position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <div className="nav-content">
            <div className="logo">KEC × GUVI</div>
            <ul className="nav-links">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
              <li><a href="#program" onClick={(e) => { e.preventDefault(); scrollToSection('program'); }}>Program</a></li>
              <li><a href="#highlights" onClick={(e) => { e.preventDefault(); scrollToSection('highlights'); }}>Highlights</a></li>
              <li><a href="#registration" onClick={(e) => { e.preventDefault(); scrollToSection('registration'); }}>Register</a></li>
            </ul>
            <button className="cta-btn" onClick={() => scrollToSection('registration')}>
              Register Now
            </button>
          </div>
        </nav>

        {/* Content Area - Wrapped in IonContent for Native Scroll */}
        <IonContent ref={contentRef} scrollEvents={true} onIonScroll={handleScroll} fullscreen>

          {/* Hero Section */}
          <section className="hero">
            <div className="particles">
              {[...Array(5)].map((_, i) => <div key={i} className="particle"></div>)}
            </div>
            <div className="container hero-content">
              <div className="badge">
                🚀 KONGU ENGINEERING COLLEGE × GUVI
              </div>
              <h1 className="typewriter-text">
                {typewriterText}
                <span className={`typewriter-cursor ${showCursor ? 'blink' : 'hidden'}`}>|</span>
              </h1>
              <p className={`hero-subtitle ${showSubtitle ? 'fade-in-subtitle' : 'invisible'}`}>
                Kongu Engineering College, in collaboration with GUVI (An IIT-Madras Incubated EdTech Company),
                proudly presents an intensive DevOps Training Program designed to equip students with real-world
                cloud and automation expertise.
              </p>
              <div className={`btn-group ${showButtons ? 'fade-in-buttons' : 'invisible'}`}>
                <button className="btn-primary" onClick={() => scrollToSection('registration')}>
                  Register Now
                </button>
                <a
                  href="/brochure.html"
                  target="_blank"
                  className="btn-secondary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  📥 Download Brochure
                </a>
              </div>
            </div>
          </section>

          {/* About Collaboration */}
          <section id="about" className="fade-in">
            <div className="container">
              <div className="section-header">
                <span className="section-badge">The Collaboration</span>
                <h2>Bridging Academia & Industry</h2>
                <p>
                  Kongu Engineering College has partnered with GUVI to bridge the gap between academic learning
                  and industry requirements. This collaboration focuses on providing hands-on, practical DevOps
                  training aligned with current market demands.
                </p>
              </div>
            </div>
          </section>

          {/* About Institutions */}
          <section className="fade-in" style={{ background: 'var(--bg-light)' }}>
            <div className="container">
              <div className="card-grid">
                <div className="card">
                  <div className="card-icon">🎓</div>
                  <h3>Kongu Engineering College</h3>
                  <p>
                    One of Tamil Nadu's premier autonomous institutions, known for academic excellence,
                    research innovation, and industry-driven education.
                  </p>
                </div>
                <div className="card">
                  <div className="card-icon">💡</div>
                  <h3>GUVI</h3>
                  <p>
                    GUVI (Grab Your Vernacular Imprint) is an IIT-Madras incubated EdTech company that provides
                    industry-focused technology courses with practical, hands-on learning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Program Details */}
          <section id="program" className="fade-in">
            <div className="container">
              <div className="section-header">
                <span className="section-badge">Curriculum</span>
                <h2>DevOps Training Program</h2>
                <p>
                  This program is designed to provide comprehensive knowledge and hands-on experience in DevOps practices.
                </p>
              </div>

              <div className="features-grid">
                {[
                  { icon: '🐧', title: 'Linux Fundamentals', desc: 'Master command-line operations and system administration' },
                  { icon: '📦', title: 'Git & Version Control', desc: 'Learn modern version control and collaboration workflows' },
                  { icon: '🐳', title: 'Docker & Containerization', desc: 'Build, ship, and run applications in containers' },
                  { icon: '☸️', title: 'Kubernetes', desc: 'Orchestrate and manage containerized applications at scale' },
                  { icon: '🔄', title: 'CI/CD Pipelines', desc: 'Automate testing, building, and deployment processes' },
                  { icon: '☁️', title: 'AWS Cloud Basics', desc: 'Deploy and manage infrastructure on Amazon Web Services' },
                  { icon: '⚙️', title: 'Infrastructure as Code', desc: 'Automate infrastructure provisioning with Terraform' },
                  { icon: '📊', title: 'Monitoring & Deployment', desc: 'Implement observability and deployment strategies' },
                ].map((item, index) => (
                  <div className="feature-item" key={index}>
                    <div className="feature-icon">{item.icon}</div>
                    <div className="feature-content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Highlights */}
          <section id="highlights" className="fade-in" style={{ background: 'var(--bg-light)' }}>
            <div className="container">
              <div className="section-header">
                <span className="section-badge">Why Choose Us</span>
                <h2>Program Highlights</h2>
              </div>
              <div className="card-grid">
                {[
                  { icon: '💼', title: 'Industry-Oriented', desc: 'Top tech stack used by leading companies' },
                  { icon: '🛠️', title: 'Hands-on Projects', desc: 'Real-world scenarios and portfolio building' },
                  { icon: '👨‍🏫', title: 'Expert Mentorship', desc: 'Learn from industry professionals' },
                  { icon: '🎓', title: 'Certification', desc: 'Joint certification from KEC and GUVI' },
                  { icon: '🎯', title: 'Placement Support', desc: 'Career guidance and placement assistance' },
                  { icon: '📚', title: 'Case Studies', desc: 'Analyze actual industry challenges' },
                ].map((item, i) => (
                  <div className="card" key={i}>
                    <div className="card-icon">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="fade-in">
            <div className="container">
              <div className="stats-container">
                {[
                  { num: '4-8', label: 'Weeks Duration' },
                  { num: '100%', label: 'Hands-on Training' },
                  { num: '8+', label: 'Core Technologies' },
                  { num: '1', label: 'Industry Certificate' },
                ].map((stat, i) => (
                  <div className="stat-item" key={i}>
                    <div className="stat-number">{stat.num}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Registration CTA */}
          <section id="registration" className="fade-in" style={{ background: 'var(--bg-light)', paddingBottom: '100px' }}>
            <div className="container">
              <div className="section-header">
                <span className="section-badge">Limited Seats</span>
                <h2>Register Now</h2>
                <p>
                  Seats are limited. Register early to secure your participation in this exclusive training program.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  className="btn-primary"
                  style={{ fontSize: '18px', padding: '20px 50px' }}
                  onClick={openModal}
                >
                  🚀 Register Now and Step into the Future
                </button>
                <p style={{ marginTop: '24px', color: 'var(--text-light)' }}>
                  Limited seats available • First come, first served
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>About</h3>
                  <p>A collaborative initiative between Kongu Engineering College and GUVI.</p>
                </div>
                <div className="footer-section">
                  <h3>Contact</h3>
                  <p>Kongu Engineering College, Perundurai, Erode - 638060, Tamil Nadu</p>
                </div>
                <div className="footer-section">
                  <h3>Partners</h3>
                  <p>🎓 Kongu Engineering College</p>
                  <p>💡 GUVI - IIT Madras Incubated</p>
                </div>
              </div>
              <div className="footer-bottom">
                <p>© 2026 Kongu Engineering College × GUVI. All rights reserved.</p>
              </div>
            </div>
          </footer>

        </IonContent>

        {/* Original Custom Modal - Placed OUTSIDE IonContent to overlay correctly */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center px-4" style={{ position: 'fixed' }}>
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={closeModal}
            ></div>

            <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-float">
              <div className="bg-primary-gradient p-6 text-white relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="text-2xl font-bold font-display" style={{ margin: 0 }}>Secure Your Spot 🚀</h3>
                <p className="text-white/90 mt-1" style={{ margin: '4px 0 0 0' }}>Join the DevOps Revolution today.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="p-8 space-y-4" style={{ padding: '30px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="john@example.com"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Department</label>
                    <input
                      type="text"
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleFormChange}
                      placeholder="CSE / IT"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Year</label>
                    <select
                      name="year"
                      required
                      value={formData.year}
                      onChange={handleFormChange}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: 'white' }}
                    >
                      <option value="">Select Year</option>
                      <option value="II">II Year</option>
                      <option value="III">III Year</option>
                      <option value="IV">IV Year</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary-gradient text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    style={{ width: '100%', padding: '12px', background: 'var(--primary-gradient)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Confirm Registration
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3" style={{ textAlign: 'center', fontSize: '12px', color: '#888', marginTop: '10px' }}>
                    By registering, you agree to our Terms & Conditions.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

      </IonPage>
    </IonApp>
  );
}

export default App;
