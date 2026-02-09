import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

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

      // Spawn particle occasionally (not every mousemove to avoid performance issues)
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

        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for fade-in animations
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

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
        // Show subtitle and stop cursor blinking after typing is complete
        setTimeout(() => {
          setShowSubtitle(true);
          setShowCursor(false);
          // Show buttons after subtitle fades in
          setTimeout(() => setShowButtons(true), 600);
        }, 500);
      }
    }, 50); // 50ms per character for smooth typing

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
    // Simulate API call
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
    <>
      {/* Custom Cursor Follower */}
      <div
        className="cursor-follower"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      <div
        className="cursor-dot"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* Particle Trail */}
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
          }}
        />
      ))}

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="logo">KEC × GUVI</div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#program">Program</a></li>
            <li><a href="#highlights">Highlights</a></li>
            <li><a href="#registration">Register</a></li>
          </ul>
          <button className="cta-btn" onClick={() => scrollToSection('registration')}>
            Register Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        {/* Floating Particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
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
              style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
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
                research innovation, and industry-driven education. With a strong focus on skill development
                and placement success, KEC continuously collaborates with industry leaders to enhance student employability.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">💡</div>
              <h3>GUVI</h3>
              <p>
                GUVI (Grab Your Vernacular Imprint) is an IIT-Madras incubated EdTech company that provides
                industry-focused technology courses with practical, hands-on learning. GUVI specializes in
                bridging the skill gap through real-time projects, mentorship, and globally recognized certifications.
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
            <div className="feature-item">
              <div className="feature-icon">🐧</div>
              <div className="feature-content">
                <h4>Linux Fundamentals</h4>
                <p>Master command-line operations and system administration</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📦</div>
              <div className="feature-content">
                <h4>Git & Version Control</h4>
                <p>Learn modern version control and collaboration workflows</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🐳</div>
              <div className="feature-content">
                <h4>Docker & Containerization</h4>
                <p>Build, ship, and run applications in containers</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">☸️</div>
              <div className="feature-content">
                <h4>Kubernetes</h4>
                <p>Orchestrate and manage containerized applications at scale</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <div className="feature-content">
                <h4>CI/CD Pipelines</h4>
                <p>Automate testing, building, and deployment processes</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">☁️</div>
              <div className="feature-content">
                <h4>AWS Cloud Basics</h4>
                <p>Deploy and manage infrastructure on Amazon Web Services</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">⚙️</div>
              <div className="feature-content">
                <h4>Infrastructure as Code</h4>
                <p>Automate infrastructure provisioning with Terraform</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-content">
                <h4>Monitoring & Deployment</h4>
                <p>Implement observability and deployment strategies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section id="highlights" className="fade-in" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why Choose Us</span>
            <h2>Program Highlights</h2>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-icon">💼</div>
              <h3>Industry-Oriented Curriculum</h3>
              <p>Learn tools and technologies used by top tech companies worldwide</p>
            </div>

            <div className="card">
              <div className="card-icon">🛠️</div>
              <h3>Hands-on Live Projects</h3>
              <p>Work on real-world scenarios and build a professional portfolio</p>
            </div>

            <div className="card">
              <div className="card-icon">👨‍🏫</div>
              <h3>Expert Mentorship</h3>
              <p>Learn from industry professionals with years of DevOps experience</p>
            </div>

            <div className="card">
              <div className="card-icon">🎓</div>
              <h3>Certification</h3>
              <p>Receive joint certification from KEC and GUVI upon completion</p>
            </div>

            <div className="card">
              <div className="card-icon">🎯</div>
              <h3>Placement Support</h3>
              <p>Get career guidance and placement assistance from our team</p>
            </div>

            <div className="card">
              <div className="card-icon">📚</div>
              <h3>Real-Time Case Studies</h3>
              <p>Analyze and solve actual industry challenges and scenarios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="fade-in">
        <div className="container">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">4-8</div>
              <div className="stat-label">Weeks Duration</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Hands-on Training</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8+</div>
              <div className="stat-label">Core Technologies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Industry Certificate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Apply */}
      <section className="fade-in" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Eligibility</span>
            <h2>Who Can Apply?</h2>
          </div>

          <div class="features-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="feature-item">
              <div className="feature-icon">👨‍🎓</div>
              <div className="feature-content">
                <h4>Pre-Final & Final Year Students</h4>
                <p>Open to students in their third and fourth years of engineering</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">☁️</div>
              <div className="feature-content">
                <h4>Cloud & DevOps Enthusiasts</h4>
                <p>Students interested in pursuing careers in cloud computing and DevOps</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">💻</div>
              <div className="feature-content">
                <h4>Programming Background</h4>
                <p>Beginners with basic programming knowledge are welcome</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why DevOps */}
      <section className="fade-in">
        <div className="container">
          <div className="highlight-section">
            <div className="highlight-content">
              <h2>Why DevOps?</h2>
              <p>
                DevOps is one of the most in-demand skills in today's IT industry. Companies are actively
                hiring professionals skilled in automation, cloud infrastructure, and deployment strategies.
              </p>
              <div className="stats-container" style={{ marginTop: '40px', marginBottom: '40px' }}>
                <div className="stat-item">
                  <div className="stat-number" style={{ color: 'white' }}>DevOps Engineer</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" style={{ color: 'white' }}>Cloud Engineer</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" style={{ color: 'white' }}>SRE</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" style={{ color: 'white' }}>Automation Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="registration" className="fade-in" style={{ background: 'var(--bg-light)' }}>
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
              <p>
                A collaborative initiative between Kongu Engineering College and GUVI to empower students
                with industry-ready DevOps skills.
              </p>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <a href="#about">About Program</a>
              <a href="#program">Curriculum</a>
              <a href="#highlights">Highlights</a>
              <a href="#registration">Register</a>
            </div>

            <div className="footer-section">
              <h3>Contact</h3>
              <p>Kongu Engineering College</p>
              <p>Perundurai, Erode - 638060</p>
              <p>Tamil Nadu, India</p>
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

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-float">
            <div className="bg-primary-gradient p-6 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-2xl font-bold font-display">Secure Your Spot 🚀</h3>
              <p className="text-white/90 mt-1">Join the DevOps Revolution today.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                    placeholder="CSE / IT"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all bg-white"
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
                >
                  Confirm Registration
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  By registering, you agree to our Terms & Conditions.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
