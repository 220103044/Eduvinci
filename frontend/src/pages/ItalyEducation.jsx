import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";

export default function ItalyEducation() {
  const { t } = useLang();
  const exams = t("italy.exams.items");
  const unis = t("italy.universities.list");
  const dsu = t("italy.dsu");
  const process = t("italy.process");
  const labels = t("italy.universities");

  const [city, setCity] = useState("all");
  const [field, setField] = useState("all");
  const [lang, setLangFilter] = useState("all");

  const cities = useMemo(() => Array.from(new Set(unis.map((u) => u.city))), [unis]);
  const fields = useMemo(
    () =>
      Array.from(
        new Set(
          unis.flatMap((u) => u.field.split(" · ").map((x) => x.trim()))
        )
      ),
    [unis]
  );
  const langs = useMemo(() => Array.from(new Set(unis.map((u) => u.lang))), [unis]);

  const filtered = unis.filter(
    (u) =>
      (city === "all" || u.city === city) &&
      (field === "all" || u.field.includes(field)) &&
      (lang === "all" || u.lang === lang)
  );

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

      {/* UNIVERSITIES */}
      <section className="section" id="universities">
        <div className="container-ev">
          <Reveal><div className="overline">{t("italy.sections.unis")}</div></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif mt-5 text-4xl md:text-5xl text-[#0F1B2D]">{labels.title}</h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            <div>
              <label className="ev-label">{labels.filterCity}</label>
              <select className="ev-select" value={city} onChange={(e) => setCity(e.target.value)} data-testid="filter-city">
                <option value="all">{labels.all}</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="ev-label">{labels.filterField}</label>
              <select className="ev-select" value={field} onChange={(e) => setField(e.target.value)} data-testid="filter-field">
                <option value="all">{labels.all}</option>
                {fields.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="ev-label">{labels.filterLang}</label>
              <select className="ev-select" value={lang} onChange={(e) => setLangFilter(e.target.value)} data-testid="filter-lang">
                <option value="all">{labels.all}</option>
                {langs.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5" data-testid="universities-list">
            {filtered.map((u) => (
              <Reveal key={u.name}>
                <div className="ev-card p-8 h-full">
                  <div className="font-serif text-2xl md:text-3xl text-[#0F1B2D] leading-tight">{u.name}</div>
                  <div className="mt-3 text-[12px] tracking-[0.18em] uppercase text-[#C75B39]">{u.city}</div>
                  <div className="mt-5 ev-divider pt-5 grid grid-cols-2 gap-4 text-[14px] text-[#5A5A5A]">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#0F1B2D]/60">{labels.filterField}</div>
                      <div className="mt-1">{u.field}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#0F1B2D]/60">{labels.filterLang}</div>
                      <div className="mt-1">{u.lang}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
