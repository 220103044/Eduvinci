import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight, Compass, ClipboardCheck, GraduationCap, FileSearch, Plane, Home as HomeIcon, BookOpen,
} from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";
import Ribbon from "../components/Ribbon";
import CountUp from "../components/CountUp";
import ConsultationForm from "../components/ConsultationForm";
import { HOME } from "../constants/testIds";
import { testimonials } from "../data/testimonials";

const SERVICE_ICONS = [Compass, GraduationCap, ClipboardCheck, FileSearch, Plane, BookOpen, HomeIcon];

export default function Home() {
  const { t } = useLang();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const services = t("servicesShort.items");
  const whyItems = t("why.items");
  const storiesPh = testimonials.slice(0, 3);
  const stats = t("stats.items");
  const pills = t("hero.pills");
  const ribbonWords = ["Italy-only", "IMAT · TIL · ARCHED", "Universitaly", "DSU", "Torino · Milano · Bologna", "Process-driven"];

  return (
    <main data-testid={HOME.hero}>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div style={{ y: imgY }} className="hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1520440229-6469a149ac59?auto=format&fit=crop&w=2400&q=80"
            alt="Milan Cathedral"
            className="w-full h-[110vh] object-cover opacity-[0.22]"
          />
        </motion.div>

        <div className="container-ev relative pt-24 pb-24 md:pt-32 md:pb-28">
          <Reveal>
            <div className="overline">{t("hero.overline")}</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-serif mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight text-[#0F1B2D] max-w-5xl">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[#1A1A1A]/80 leading-relaxed font-light">
              {t("hero.sub")}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/iletisim" className="ev-btn-primary" data-testid={HOME.heroCtaConsult}>
                {t("hero.ctaPrimary")} <ArrowUpRight size={16} strokeWidth={1.5} />
              </Link>
              <Link to="/webinar" className="ev-btn-secondary" data-testid={HOME.heroCtaWebinar}>
                {t("hero.ctaSecondary")} <ArrowUpRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-16 flex flex-wrap gap-3" data-testid="hero-pills">
              {pills.map((p) => (
                <span key={p} className="ev-pill">{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Ribbon words={ribbonWords} />

      {/* WHY */}
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal><div className="overline">{t("why.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif mt-5 text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#0F1B2D]">
                {t("why.title")}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-[#0F1B2D]/10">
            {whyItems.map((it, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="bg-[#F7F5F0] p-8 h-full">
                  <div className="font-serif text-[44px] leading-none text-[#C75B39]">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-6 font-serif text-2xl text-[#0F1B2D]">{it.title}</h3>
                  <p className="mt-3 text-[15px] text-[#5A5A5A] leading-relaxed">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="ev-divider" />

      {/* SERVICES SUMMARY */}
      <section className="section">
        <div className="container-ev">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <Reveal><div className="overline">{t("servicesShort.overline")}</div></Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-serif mt-5 text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#0F1B2D]">
                  {t("servicesShort.title")}
                </h2>
              </Reveal>
            </div>
            <Link to="/hizmetler" className="ev-link-underline">
              {t("servicesShort.cta")} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <Reveal key={s.title} delay={0.04 * i}>
                  <Link to="/hizmetler" className="ev-card block p-8 h-full">
                    <Icon size={28} strokeWidth={1} className="text-[#C75B39]" />
                    <h3 className="mt-6 font-serif text-[26px] leading-tight text-[#0F1B2D]">{s.title}</h3>
                    <p className="mt-3 text-[14.5px] text-[#5A5A5A] leading-relaxed">{s.body}</p>
                    <div className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#0F1B2D]">
                      {t("common.learnMore")} <ArrowUpRight size={14} strokeWidth={1.5} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0F1B2D] text-[#F7F5F0]">
        <div className="container-ev py-20 md:py-24">
          <Reveal><div className="overline text-[#C75B39]">{t("stats.overline")}</div></Reveal>
          <div className="mt-12 grid md:grid-cols-4 gap-10 md:gap-6">
            {stats.map((s, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="border-t border-[#F7F5F0]/20 pt-6">
                  <div className="font-serif text-5xl md:text-6xl text-[#F7F5F0] flex items-baseline gap-1">
                    {/* numeric placeholder count-up */}
                    <CountUp to={[120, 240, 8, 6][i]} duration={1.8} />
                    <span className="text-[#C75B39] text-3xl">+</span>
                  </div>
                  <div className="mt-3 text-[13px] tracking-[0.05em] text-[#F7F5F0]/70 max-w-[18rem]">{s.label}</div>
                  <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#C75B39]/80">{s.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES TEASER */}
      <section className="section">
        <div className="container-ev">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Reveal><div className="overline">{t("storiesTeaser.overline")}</div></Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-serif mt-5 text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#0F1B2D]">
                  {t("storiesTeaser.title")}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-[15px] text-[#5A5A5A] max-w-xl">{t("storiesTeaser.sub")}</p>
              </Reveal>
            </div>
            <Link to="/basari-hikayeleri" className="ev-link-underline">
              {t("storiesTeaser.cta")} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {storiesPh.map((p, i) => (
              <Reveal key={p.id} delay={0.05 * i}>
                <article
                  className="ev-card p-8 h-full flex flex-col"
                  data-testid={`home-story-${p.id}`}
                >
                  <div className="overline">{p.university}</div>
                  <p className="mt-5 font-serif text-[22px] leading-snug text-[#0F1B2D] flex-1">&ldquo;{p.quote}&rdquo;</p>
                  <div className="mt-8 ev-divider pt-4 text-[13px] text-[#0F1B2D] flex items-center justify-between">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#C75B39]">Öğrenci</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WEBINAR TEASER */}
      <section className="section bg-[#F1ECE2]">
        <div className="container-ev grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <Reveal><div className="overline">{t("webinarTeaser.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif mt-5 text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#0F1B2D]">
                {t("webinarTeaser.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] text-[#5A5A5A] max-w-xl">{t("webinarTeaser.sub")}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 text-[12px] tracking-[0.18em] uppercase text-[#0F1B2D]">{t("webinarTeaser.meta")}</div>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <Reveal delay={0.1}>
              <Link to="/webinar" className="ev-btn-accent">
                {t("webinarTeaser.cta")} <ArrowUpRight size={16} strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal><div className="overline">{t("finalCta.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif mt-5 text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#0F1B2D]">
                {t("finalCta.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] text-[#5A5A5A] max-w-md">{t("finalCta.sub")}</p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="bg-white p-8 md:p-10 border border-[#0F1B2D]/10">
                <ConsultationForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
