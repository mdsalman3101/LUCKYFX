import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";

export default function HeroMedia() {
  const { items, loading } = usePortfolio();
  const media = items.find((item) => item.hero_media);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -24]);
  const scale = useTransform(scrollY, [0, 700], [1, reduced ? 1 : 1.035]);
  const opacity = useTransform(scrollY, [0, 750], [1, 0.72]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    const video = videoRef.current;
    if (!video) return;
    const sync = () => document.hidden ? video.pause() : video.play().catch(() => {});
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { document.removeEventListener("visibilitychange", sync); video.pause(); };
  }, [media?.id]);

  return <motion.div className={`hero-media ${!media || failed ? "hero-media-fallback" : ""}`} style={{ y, scale, opacity }}
    initial={{ opacity: 0, clipPath: "inset(8% 8% 8% 8% round 28px)" }} animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" }} transition={{ duration: .9, delay: .35 }} aria-label="Lucky FX cinematic showcase">
    {media && !failed && (media.media_type === "video"
      ? <video ref={videoRef} src={media.media_url} poster={media.poster_url || undefined} muted loop playsInline preload="metadata" onError={() => setFailed(true)} />
      : <motion.img src={media.media_url} alt={media.title || "Lucky FX featured work"} onError={() => setFailed(true)} animate={reduced ? undefined : { scale: [1, 1.035, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />)}
    {(!media || failed) && <div className="hero-cinema-fallback"><div className="film-frame"/><span>LUCKY FX</span><strong>{loading ? "LOADING SHOWCASE" : "CINEMATIC VISUAL STORYTELLING"}</strong></div>}
    <div className="hero-media-overlay"/><div className="hero-hud"><span className="rec">● REC</span><span>4K</span><span>24 FPS</span></div>
  </motion.div>;
}
