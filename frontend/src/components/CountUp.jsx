import React, { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

export default function CountUp({ to = 100, duration = 1.6, suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setVal(to);   // animasyon bitince kesin hedef değere sabitle
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, done]);

  // Güvenlik ağı: inView hiç tetiklenmezse bile 1.2 sn sonra hedef sayıyı göster
  useEffect(() => {
    const t = setTimeout(() => {
      setVal((v) => (v === 0 ? to : v));
    }, 1200);
    return () => clearTimeout(t);
  }, [to]);

  return (
    <motion.span ref={ref} className={className}>
      {val}
      {suffix}
    </motion.span>
  );
}
