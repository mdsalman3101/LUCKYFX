import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DEFAULT_CATEGORIES, usePortfolio } from "../hooks/usePortfolio";

function ProjectCard({ project, featured, onOpen, index }) {
  const videoRef = useRef(null);
  const start = () => videoRef.current?.play().catch(() => {});
  const stop = () => videoRef.current?.pause();
  return <motion.article className={`portfolio-card ${featured ? "portfolio-featured" : ""}`}
    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .12 }}
    transition={{ duration: .55, delay: Math.min(index * .06, .3) }} onMouseEnter={start} onMouseLeave={stop} onClick={() => onOpen(project)}>
    <div className="portfolio-image">
      {project.media_type === "video" ? <video ref={videoRef} muted loop playsInline preload="none" poster={project.poster_url || undefined} src={project.media_url} />
        : <img src={project.media_url} alt={project.title} loading="lazy" />}
      <div className="portfolio-overlay"><div className="play-button">▶</div><span>{project.media_type === "video" ? "WATCH PROJECT" : "VIEW PROJECT"}</span></div>
      <div className="project-number">{String(index + 1).padStart(2, "0")}</div><div className="project-category">{project.category}</div>
    </div>
    <div className="portfolio-info"><h3>{project.title}</h3><p>{project.description}</p>
      <div className="project-tags">{(project.tags || []).map(tag => <span key={tag}>{tag}</span>)}</div>
      <button type="button" className="project-link">{project.media_type === "video" ? "Watch Project" : "Explore Project"} <span>↗</span></button>
    </div>
  </motion.article>;
}

function MediaShowcase({ items, onOpen }) {
  const [active, setActive] = useState(0); const [paused, setPaused] = useState(false); const videoRef = useRef(null);
  const current = items[active];
  useEffect(() => { if (active >= items.length) setActive(0); }, [items.length, active]);
  useEffect(() => {
    if (!current || paused || document.hidden) return;
    const video = videoRef.current;
    if (video) { video.currentTime = 0; video.play().catch(() => {}); }
    const duration = current.media_type === "video" && video?.duration && video.duration < 5 ? video.duration * 1000 : 5000;
    const timer = setTimeout(() => setActive(v => (v + 1) % items.length), Math.max(duration, 1000));
    return () => { clearTimeout(timer); video?.pause(); };
  }, [active, current, items.length, paused]);
  useEffect(() => { const visibility = () => setPaused(document.hidden); document.addEventListener("visibilitychange", visibility); return () => document.removeEventListener("visibilitychange", visibility); }, []);
  if (!items.length) return <div className="media-showcase empty"><span>OUR LATEST WORK</span><h3>Latest Work Coming Soon</h3></div>;
  const move = delta => setActive(v => (v + delta + items.length) % items.length);
  return <div className="media-showcase" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
    <AnimatePresence mode="wait"><motion.button type="button" className="showcase-stage" key={current.id} onClick={() => onOpen(current)} initial={{ opacity: 0, scale: 1.015 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>
      {current.media_type === "video" ? <video ref={videoRef} src={current.media_url} poster={current.poster_url || undefined} muted playsInline preload="metadata" /> : <img src={current.media_url} alt={current.title} />}
      <span className="showcase-caption">{current.title}</span>
    </motion.button></AnimatePresence>
    {items.length > 1 && <div className="showcase-controls"><button onClick={() => move(-1)} aria-label="Previous work">←</button><div>{items.map((item, i) => <button key={item.id} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`Show ${item.title}`} />)}</div><button onClick={() => move(1)} aria-label="Next work">→</button></div>}
  </div>;
}

export default function Portfolio() {
  const { items, loading, error } = usePortfolio(); const [activeFilter, setActiveFilter] = useState("All"); const [selected, setSelected] = useState(null);
  const categories = ["All", ...new Set([...DEFAULT_CATEGORIES, ...items.map(x => x.category).filter(Boolean)])];
  const filtered = activeFilter === "All" ? items : items.filter(x => x.category === activeFilter);
  useEffect(() => { if (!selected) return; const old = document.body.style.overflow; document.body.style.overflow = "hidden"; const key = e => e.key === "Escape" && setSelected(null); addEventListener("keydown", key); return () => { document.body.style.overflow = old; removeEventListener("keydown", key); }; }, [selected]);
  return <><section id="portfolio" className="portfolio-section">
    <div className="section-heading"><div><span className="section-kicker">OUR WORK</span><h2>Creative Work.<span> Powerful Results.</span></h2><p>Explore cinematic edits, motion graphics, commercials and visual stories created by Lucky FX Studio.</p></div><div className="portfolio-count"><strong>{String(filtered.length).padStart(2,"0")}</strong><span>PROJECTS</span></div></div>
    <MediaShowcase items={items} onOpen={setSelected} />
    <div className="portfolio-filters">{categories.map(filter => <button type="button" key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
    {loading ? <div className="portfolio-status">Loading latest work…</div> : error ? <div className="portfolio-status">Portfolio is temporarily unavailable.</div> : filtered.length ? <div className="portfolio-grid">{filtered.map((project,index) => <ProjectCard key={project.id} project={project} featured={project.featured || index === 0} index={index} onOpen={setSelected} />)}</div> : <div className="portfolio-empty"><h3>Latest Work Coming Soon</h3><p>New projects will appear here shortly.</p></div>}
    <div className="portfolio-cta"><div><span>HAVE A PROJECT IN MIND?</span><h3>Let's create something unforgettable.</h3></div><a href="#contact">Start Your Project <span>→</span></a></div>
  </section>
  {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="project-modal" onClick={e => e.stopPropagation()}><button type="button" className="modal-close" onClick={() => setSelected(null)}>×</button><div className="modal-image">{selected.media_type === "video" ? <video src={selected.media_url} poster={selected.poster_url || undefined} controls autoPlay playsInline preload="metadata" /> : <img src={selected.media_url} alt={selected.title} />}</div><div className="modal-details"><span className="modal-category">{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p><div className="modal-tags">{(selected.tags || []).map(tag => <span key={tag}>{tag}</span>)}</div><button type="button" className="modal-cta" onClick={() => { setSelected(null); setTimeout(() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}),100); }}>Start Similar Project →</button></div></div></div>}
  </>;
}
