import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, AudioLines, CheckCircle2, ChevronDown, Clapperboard,
  Heart, Home, Instagram, Linkedin, Mail, MapPin, Megaphone,
  Menu, MessageCircle, Palette, Play, PlaySquare, Send, Sparkles,
  X, Youtube, Zap
} from "lucide-react";
import gsap from "gsap";

import Scene3D from "./components/Scene3D";
import Portfolio from "./components/Portfolio";
import { services, faqs } from "./data/siteData";

const icons = {
  Home,
  Sparkles,
  Heart,
  Clapperboard,
  PlaySquare,
  Megaphone,
  Youtube,
  Palette,
  AudioLines,
  Zap,
};

const navItems = [
  ["home", "Home"],
  ["services", "Services"],
  ["portfolio", "Portfolio"],
  ["about", "About"],
  ["testimonials", "Reviews"],
  ["contact", "Contact"],
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function App() {
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-kicker",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.15 }
      );

      gsap.fromTo(
        ".hero-title",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          delay: 0.25,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-copy, .hero-actions, .hero-socials",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.65,
          stagger: 0.1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="app">
      <div className="noise" />

      {/* ================= HEADER ================= */}
      <header className="nav">
        <button
          className="brand"
          onClick={() => scrollToId("home")}
          aria-label="Lucky FX Studio home"
        >
          <img src="/assets/lucky-fx-logo.jpeg" alt="Lucky FX Studio" />
          <span>
            LUCKY <b>FX</b>
            <small>STUDIO</small>
          </span>
        </button>

        <nav className={`nav-links ${menu ? "open" : ""}`}>
          {navItems.map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                scrollToId(id);
                setMenu(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="btn btn-primary nav-cta"
          onClick={() => scrollToId("contact")}
        >
          Get a Quote <ArrowRight size={15} />
        </button>

        <button
          className="mobile-menu"
          onClick={() => setMenu((v) => !v)}
          aria-label="Toggle navigation"
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section id="home" className="hero section">
          <div className="hero-grid" />
          <Scene3D />

          <div className="hero-content">
            <div className="hero-kicker">
              <span />
              PREMIUM VIDEO EDITING & MOTION GRAPHICS STUDIO
            </div>

            <h1 className="hero-title">
              Transforming Footage Into{" "}
              <em>Powerful Stories & Visuals.</em>
            </h1>

            <p className="hero-copy">
              We transform raw footage into cinematic stories, engaging
              visuals, and powerful content that captures attention and leaves
              a lasting impression.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => scrollToId("portfolio")}
              >
                View Portfolio <ArrowRight size={17} />
              </button>

              <button
                className="btn btn-ghost"
                onClick={() => scrollToId("services")}
              >
                Our Services <ArrowRight size={17} />
              </button>

              <button
                className="showreel"
                onClick={() => scrollToId("portfolio")}
              >
                <span>
                  <Play size={14} fill="currentColor" />
                </span>
                Watch Showreel
              </button>
            </div>

            <div className="hero-socials">
              <span>FOLLOW US</span>
              <Instagram size={16} />
              <Youtube size={16} />
              <Linkedin size={16} />
              <MessageCircle size={16} />
            </div>
          </div>

          <div className="hero-orbit-label">
            <div className="orbit-dot" />
            <span>EDIT</span>
            <b>•</b>
            <span>CREATE</span>
            <b>•</b>
            <span>INSPIRE</span>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="stats section-pad">
          {[
            ["500+", "Projects Completed"],
            ["200+", "Happy Clients"],
            ["5+", "Years Experience"],
            ["100%", "Client Satisfaction"],
          ].map(([number, label]) => (
            <motion.div className="stat" key={label} whileHover={{ y: -5 }}>
              <strong>{number}</strong>
              <span>{label}</span>
            </motion.div>
          ))}
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="section section-pad about-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ABOUT LUCKY FX STUDIO</span>
              <h2>
                We Don't Just Edit.
                <br />
                <em>We Create Impact.</em>
              </h2>
            </div>

            <p>
              Lucky FX Studio transforms raw footage into cinematic stories,
              powerful visuals and memorable brand experiences through editing,
              motion graphics and visual storytelling.
            </p>
          </div>

          <div className="about-3d-layout">
            <div className="about-3d-visual">
              <div className="about-glow about-glow-one" />
              <div className="about-glow about-glow-two" />

              <div className="about-orbit orbit-one" />
              <div className="about-orbit orbit-two" />
              <div className="about-orbit orbit-three" />

              <div className="about-image-card">
                <img
                  src="/assets/reference-home.jpeg"
                  alt="Lucky FX Studio creative workspace"
                />
                <div className="about-image-overlay" />
                <div className="about-image-content">
                  <span>LUCKY FX</span>
                  <strong>CREATIVE STUDIO</strong>
                  <small>EDIT • CREATE • INSPIRE</small>
                </div>
              </div>

              <div className="about-floating-badge">
                <div className="badge-icon">LF</div>
                <div>
                  <strong>Lucky FX</strong>
                  <span>Studio</span>
                </div>
              </div>

              <div className="about-experience-card">
                <span className="experience-number">05+</span>
                <div>
                  <strong>Years</strong>
                  <small>Creative Experience</small>
                </div>
              </div>
            </div>

            <div className="about-content-3d">
              <span className="about-mini-label">OUR STORY</span>

              <h3>
                Turning ordinary footage into
                <span> extraordinary visuals.</span>
              </h3>

              <p>
                Lucky FX Studio is a creative video editing and visual
                production studio focused on helping creators, brands and
                businesses tell better stories.
              </p>

              <p>
                From Real Estate videos and Wedding Films to Motion Graphics,
                Commercial Ads, YouTube content and Social Media Reels — every
                project is crafted with creativity, precision and purpose.
              </p>

              <div className="mission-vision-3d">
                <div className="mv-card">
                  <div className="mv-number">01</div>
                  <span>OUR MISSION</span>
                  <h4>Make ideas look unforgettable.</h4>
                  <p>
                    Create high-quality visual content that captures attention
                    and communicates powerful stories.
                  </p>
                </div>

                <div className="mv-card">
                  <div className="mv-number">02</div>
                  <span>OUR VISION</span>
                  <h4>Become a trusted creative partner.</h4>
                  <p>
                    Deliver professional editing, innovative visual design and
                    exceptional experiences for every client.
                  </p>
                </div>
              </div>

              <div className="about-highlights">
                <div>
                  <strong>01</strong>
                  <span>Creative Storytelling</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>Premium Visuals</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>Client Focused</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="section section-pad services-section">
          <div className="section-heading center">
            <span className="eyebrow">WHAT WE DO</span>
            <h2>
              Services That Make <em>Ideas Move.</em>
            </h2>
            <p>
              Professional video editing and visual design solutions for
              creators, brands, businesses and individuals.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => {
              const Icon = icons[service.icon] || Sparkles;

              return (
                <motion.article
                  className="service-card"
                  key={service.no}
                  whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                >
                  <div className={`service-icon ${service.accent || "blue"}`}>
                    <Icon size={25} />
                  </div>

                  <span className="service-no">{service.no}</span>

                  <h3>{service.title}</h3>
                  <p>{service.short}</p>

                  <button onClick={() => scrollToId("contact")}>
                    Explore Service <ArrowRight size={14} />
                  </button>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* ================= PORTFOLIO ================= */}
        <Portfolio />

        {/* ================= WHY US ================= */}
        <section id="why-us" className="section section-pad why-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHY LUCKY FX</span>
              <h2>
                More Than Editing.
                <br />
                <em>A Creative Partnership.</em>
              </h2>
            </div>

            <p>
              We combine creative thinking, technical expertise and
              professional communication to make every project smooth,
              memorable and impactful.
            </p>
          </div>

          <div className="why-intro">
            <div className="why-big-number">
              06
              <span>REASONS TO CHOOSE US</span>
            </div>

            <div className="why-intro-text">
              <p>
                Your footage deserves more than a basic edit. We focus on the
                details that turn good content into something people remember.
              </p>
            </div>
          </div>

          <div className="why-grid">
            {[
              ["01", "STORYTELLING", "Creative Storytelling", "We don't just cut clips together. We build a visual story with rhythm, emotion and purpose.", "✦"],
              ["02", "EFFICIENCY", "Fast Delivery", "Organized workflows and clear communication help us deliver projects efficiently without sacrificing quality.", "⚡"],
              ["03", "CREATIVITY", "Unlimited Creativity", "Every project gets a fresh creative direction instead of following a boring one-size-fits-all formula.", "∞"],
              ["04", "QUALITY", "Premium Quality", "From editing and motion design to color and sound, every detail is polished before delivery.", "◆"],
              ["05", "COMMUNICATION", "Professional Communication", "Clear updates, feedback handling and professional coordination keep the entire project stress-free.", "◌"],
              ["06", "RELATIONSHIP", "Client Satisfaction", "Our goal isn't just to finish a project. It's to create work our clients feel genuinely proud to share.", "♥"],
            ].map(([no, label, title, text, icon], index) => (
              <article
                className={`why-card ${index === 0 ? "why-card-featured" : ""} ${index === 5 ? "why-card-highlight" : ""}`}
                key={no}
              >
                <div className="why-card-top">
                  <span className="why-number">{no}</span>
                  <div className="why-icon">{icon}</div>
                </div>

                <div className="why-card-content">
                  <span className="why-label">{label}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

                <div className="why-card-line" />
                <span className="why-arrow">↗</span>
              </article>
            ))}
          </div>

          <div className="why-bottom">
            <div className="why-bottom-orb" />
            <div>
              <span>THE LUCKY FX STANDARD</span>
              <h3>
                Your vision. <em>Our creativity.</em>
              </h3>
            </div>

            <a href="#contact">
              Let's Work Together <span>→</span>
            </a>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section id="process" className="section section-pad process-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HOW WE WORK</span>
              <h2>
                From Raw Footage
                <br />
                <em>To Final Story.</em>
              </h2>
            </div>

            <p>
              A simple, transparent and creative process designed to turn your
              vision into polished visual content without unnecessary
              complexity.
            </p>
          </div>

          <div className="process-stage">
            <div className="process-line">
              <div className="process-line-progress" />
            </div>

            {[
              ["01", "START", "Discuss", "We understand your project, goals, style, audience and creative direction before touching the footage.", "BRIEF", "↗"],
              ["02", "DIRECTION", "Plan", "We create the editing direction, structure, references and visual approach that will shape the final piece.", "STRATEGY", "◇"],
              ["03", "CREATION", "Edit", "This is where the story comes alive through editing, motion graphics, color grading, sound design and visual effects.", "CREATE", "✦"],
              ["04", "REFINEMENT", "Review", "You review the first version, share your feedback and we refine the details until everything feels right.", "REFINE", "◌"],
              ["05", "FINAL", "Deliver", "Your finished project is exported in the required format and delivered ready for publishing, marketing or sharing.", "DONE", "✓"],
            ].map(([no, label, title, text, keyword, icon], index) => (
              <article
                className={`process-card ${index === 2 ? "process-card-active" : ""}`}
                key={no}
              >
                <div className="process-step-top">
                  <span>{no}</span>
                  <div className="process-step-icon">{icon}</div>
                </div>

                <div className="process-orb" />

                <span className="process-label">{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>

                <div className="process-keyword">{keyword}</div>
              </article>
            ))}
          </div>

          <div className="process-bottom">
            <div className="process-bottom-number">05</div>
            <div className="process-bottom-copy">
              <span>ONE SIMPLE PROMISE</span>
              <h3>
                Clear process. <em>Better results.</em>
              </h3>
            </div>
            <a href="#contact">
              Start Your Project <span>→</span>
            </a>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section
          id="testimonials"
          className="section section-pad testimonials-section"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">CLIENT EXPERIENCES</span>
              <h2>
                Stories From
                <br />
                <em>Our Clients.</em>
              </h2>
            </div>

            <p>
              Great creative work is built through trust, communication and
              collaboration. Real client reviews will be added here as they
              arrive.
            </p>
          </div>

          <div className="testimonials-stage">
            <div className="testimonial-quote-mark">“</div>

            <article className="testimonial-main-card">
              <div className="testimonial-top">
                <div className="testimonial-stars">★★★★★</div>
                <span className="testimonial-index">01 / 03</span>
              </div>

              <div className="testimonial-content">
                <blockquote>
                  “Your real client feedback will appear here — replacing this
                  demo review.”
                </blockquote>

                <p>
                  This section is intentionally designed as a preview until
                  the studio receives verified client testimonials.
                </p>
              </div>

              <div className="testimonial-client">
                <div className="client-avatar">LF</div>
                <div>
                  <strong>Client Review</strong>
                  <span>Real testimonial coming soon</span>
                </div>
              </div>
            </article>

            <div className="testimonial-side">
              <article className="testimonial-mini-card">
                <div className="testimonial-mini-top">
                  <span>02</span>
                  <div className="mini-stars">★★★★★</div>
                </div>
                <p>Verified client feedback will be displayed here.</p>
                <div className="mini-client">
                  <span>Client Feedback</span>
                  <small>Coming soon</small>
                </div>
              </article>

              <article className="testimonial-mini-card testimonial-mini-purple">
                <div className="testimonial-mini-top">
                  <span>03</span>
                  <div className="mini-stars">★★★★★</div>
                </div>
                <p>Real project experience will replace this preview card.</p>
                <div className="mini-client">
                  <span>Client Feedback</span>
                  <small>Coming soon</small>
                </div>
              </article>
            </div>
          </div>

          <div className="testimonial-trust">
            <div>
              <strong>★★★★★</strong>
              <span>Creative Quality</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Client Focused</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>Creative Possibilities</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Trusted Studio</span>
            </div>
          </div>
        </section>

        {/* ================= INSIGHTS ================= */}
        <section id="insights" className="section section-pad insights-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CREATIVE INSIGHTS</span>
              <h2>
                Learn. Create. <em>Improve.</em>
              </h2>
            </div>

            <p>
              Practical editing knowledge, creative ideas and visual
              storytelling insights for creators, brands and businesses.
            </p>
          </div>

          <div className="insights-grid">
            {[
              ["01", "VIDEO EDITING", "10 Video Editing Techniques Every Creator Should Know", "Discover practical editing techniques that can make videos cleaner, more engaging and more professional.", PlaySquare],
              ["02", "MOTION GRAPHICS", "Motion Graphics: A Beginner's Guide", "Learn how motion, typography and visual effects can create stronger first impressions.", Sparkles],
              ["03", "COLOR GRADING", "Color Grading vs Color Correction", "Understand the difference between correction and grading and how both shape the final visual experience.", Palette],
            ].map(([no, category, title, text, Icon]) => (
              <motion.article
                className="insight-card"
                key={no}
                whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              >
                <div className="insight-number">{no}</div>
                <div className="insight-icon">
                  <Icon size={24} />
                </div>

                <span className="insight-category-text">{category}</span>
                <h3>{title}</h3>
                <p>{text}</p>

                <div className="insight-footer">
                  <span>Coming Soon</span>
                  <ArrowRight size={17} />
                </div>
              </motion.article>
            ))}
          </div>

          <div className="insights-cta">
            <div>
              <span className="eyebrow">KEEP EXPLORING</span>
              <h3>
                More Creative Ideas
                <br />
                Coming Soon.
              </h3>
              <p>
                Articles, editing tips and studio knowledge will be published
                here once the content library is ready.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => scrollToId("contact")}
            >
              Suggest a Topic <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="section section-pad faq-section">
          <div className="section-heading center">
            <span className="eyebrow">FAQ</span>
            <h2>
              Questions, <em>Answered.</em>
            </h2>
          </div>

          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div
                className={`faq-item ${faq === index ? "open" : ""}`}
                key={question}
              >
                <button
                  onClick={() =>
                    setFaq((current) => (current === index ? null : index))
                  }
                >
                  <span>{question}</span>
                  <ChevronDown size={19} />
                </button>

                <AnimatePresence initial={false}>
                  {faq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="section section-pad contact-section">
          <div className="contact-card">
            <div className="contact-copy">
              <span className="eyebrow">START A PROJECT</span>
              <h2>
                Let's Create Something <em>Amazing Together.</em>
              </h2>

              <p>
                Tell us about your project and let's turn your vision into
                powerful visuals.
              </p>

              <div className="contact-details">
                <a href="tel:+919888262216">
                  <MessageCircle size={18} />
                  <span>
                    <small>PHONE / WHATSAPP</small>
                    +91 98882 62216
                  </span>
                </a>

                <a href="mailto:luckyfxstudiowork@gmail.com">
                  <Mail size={18} />
                  <span>
                    <small>EMAIL</small>
                    luckyfxstudiowork@gmail.com
                  </span>
                </a>

                <div>
                  <MapPin size={18} />
                  <span>
                    <small>LOCATION</small>
                    India • Remote Worldwide
                  </span>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <input required placeholder="Full Name" />
                <input required type="email" placeholder="Email Address" />
              </div>

              <div className="field-row">
                <input placeholder="Phone / WhatsApp" />
                <select defaultValue="">
                  <option value="" disabled>
                    Service Required
                  </option>
                  {services.map((service) => (
                    <option key={service.no}>{service.title}</option>
                  ))}
                </select>
              </div>

              <textarea
                required
                placeholder="Project details, deadline, reference and requirements..."
                rows="6"
              />

              <div className="field-row">
                <input placeholder="Expected Delivery Date" />
                <input placeholder="Budget Range" />
              </div>

              <button className="btn btn-primary" type="submit">
                {sent ? "Inquiry Ready ✓" : "Send Project Inquiry"}
                <Send size={16} />
              </button>

              {sent && (
                <p className="form-note">
                  Thanks! This demo form is ready for backend/email integration
                  later.
                </p>
              )}
            </form>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="final-cta">
          <div>
            <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
            <h2>
              Let's make your footage <em>unforgettable.</em>
            </h2>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => scrollToId("contact")}
          >
            Get a Quote <ArrowRight size={17} />
          </button>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-brand">
          <img src="/assets/lucky-fx-logo.jpeg" alt="Lucky FX Studio" />
          <h3>
            LUCKY <b>FX</b>
          </h3>
          <p>Transforming Footage Into Powerful Stories & Visuals.</p>

          <div className="footer-socials">
            <Instagram size={17} />
            <Youtube size={17} />
            <Linkedin size={17} />
            <MessageCircle size={17} />
          </div>
        </div>

        <div>
          <h4>QUICK LINKS</h4>
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => scrollToId(id)}>
              {label}
            </button>
          ))}
        </div>

        <div>
          <h4>OUR SERVICES</h4>
          {services.slice(0, 6).map((service) => (
            <button
              key={service.no}
              onClick={() => scrollToId("services")}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div>
          <h4>CONTACT INFO</h4>
          <a href="tel:+919888262216">+91 98882 62216</a>
          <a href="mailto:luckyfxstudiowork@gmail.com">
            luckyfxstudiowork@gmail.com
          </a>
          <span>India • Remote</span>
        </div>

        <div className="copyright">
          © 2026 Lucky FX Studio. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
