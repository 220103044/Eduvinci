import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";
import InteractiveItalyMap from "../components/italy/InteractiveItalyMap";

export default function ItalyEducation() {
  const { t } = useLang();
  const exams = t("italy.exams.items");
  const dsu = t("italy.dsu");
  const process = t("italy.process");

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="hero-image-wrap">
          <img
            src="https://images.pexels.com/photos/14453954/pexels-photo-14453954.jpeg"
            alt="Library"
            className="w-full h-[80vh] object-cover opacity-[0.25]"
          />
        </div>
        <div className="container-ev relative pt-24 pb-20 md:pt-32 md:pb-28">
          <Reveal><div className="overline">{t("italy.overline")}</div></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-serif mt-6 text-5xl md:text-7xl leading-[1.04] tracking-tight text-[#0F1B2D] max-w-5xl">
              {t("italy.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-[#1A1A1A]/80 max-w-2xl">{t("italy.sub")}</p>
          </Reveal>
        </div>
      </section>

      {/* EXAMS */}
      <section className="section">
        <div className="container-ev">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0F1B2D]">{t("italy.exams.title")}</h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-px bg-[#0F1B2D]/10">
            {exams.map((e, i) => (
              <Reveal key={e.k} delay={0.04 * i}>
                <div className="bg-[#F7F5F0] p-8 h-full">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-5xl text-[#C75B39]">{e.k}</span>
                  </div>
                  <p className="mt-4 text-[15px] text-[#5A5A5A] leading-relaxed">{e.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="ev-divider" />

      {/* UNIVERSITIES — INTERACTIVE MAP */}
      <section className="section" id="universities">
        <div className="container-ev">
          <Reveal><div className="overline">{t("italy.sections.unis")}</div></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif mt-5 text-4xl md:text-5xl text-[#0F1B2D]">
              {t("italy.map.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[15px] text-[#5A5A5A] leading-relaxed">
              {t("italy.map.sub")}
            </p>
          </Reveal>

          <div className="mt-12">
            <InteractiveItalyMap />
          </div>

          <p className="mt-8 text-[11px] tracking-[0.18em] uppercase text-[#5A5A5A]">
            {t("italy.map.disclaimer")}
          </p>
        </div>
      </section>

      <div className="ev-divider" />

      {/* DSU */}
      <section className="section" id="scholarships">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal><div className="overline">{t("italy.sections.scholarships")}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif mt-5 text-4xl md:text-5xl text-[#0F1B2D]">{dsu.title}</h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg text-[#1A1A1A]/80 leading-relaxed font-light">{dsu.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-4">
                {dsu.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-[#0F1B2D]">
                    <CheckCircle2 size={18} strokeWidth={1.25} className="mt-1 text-[#C75B39]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-[#F1ECE2]" id="process">
        <div className="container-ev">
          <Reveal><div className="overline">{t("italy.sections.process")}</div></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif mt-5 text-4xl md:text-5xl text-[#0F1B2D]">{process.title}</h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-6 gap-0 border-t border-[#0F1B2D]/15">
            {process.steps.map((s, i) => (
              <Reveal key={s.k} delay={0.04 * i}>
                <div className={`p-8 border-b border-[#0F1B2D]/15 ${i < 5 ? "md:border-r md:border-[#0F1B2D]/15" : ""}`}>
                  <div className="font-serif text-3xl text-[#C75B39]">{s.k}</div>
                  <div className="mt-3 font-serif text-2xl text-[#0F1B2D]">{s.t}</div>
                  <p className="mt-2 text-[13.5px] text-[#5A5A5A]">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/iletisim" className="ev-btn-primary">
              {t("nav.primaryCta")} <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
