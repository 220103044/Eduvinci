import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";

export default function About() {
  const { t } = useLang();
  const values = t("about.values");
  const founders = t("about.founders");
  return (
    <main>
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <Reveal><div className="overline">{t("about.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif mt-6 text-5xl md:text-7xl leading-[1.05] tracking-tight text-[#0F1B2D]">
                {t("about.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg text-[#1A1A1A]/85 leading-relaxed font-light">
                {t("about.intro")}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <img
                src="https://images.pexels.com/photos/36505473/pexels-photo-36505473.jpeg"
                alt="Turin street"
                className="w-full h-[460px] object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="ev-divider" />

      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal><div className="overline">{t("about.whyItalyTitle")}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif mt-5 text-4xl md:text-5xl leading-[1.1] text-[#0F1B2D]">
                {t("about.whyItalyTitle")}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg text-[#1A1A1A]/80 leading-relaxed font-light">
                {t("about.whyItaly")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="ev-divider" />

      <section className="section">
        <div className="container-ev">
          <Reveal><div className="overline">{t("about.valuesTitle")}</div></Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-px bg-[#0F1B2D]/10">
            {values.map((v, i) => (
              <Reveal key={v.k} delay={0.04 * i}>
                <div className="bg-[#F7F5F0] p-8">
                  <div className="font-serif text-3xl text-[#0F1B2D]">{v.k}</div>
                  <p className="mt-3 text-[15px] text-[#5A5A5A] leading-relaxed">{v.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="ev-divider" />

      <section className="section">
        <div className="container-ev">
          <Reveal><div className="overline">{t("about.foundersTitle")}</div></Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-10">
            {founders.map((f) => (
              <Reveal key={f.name}>
                <div className="ev-card p-8">
                  <div className="aspect-[4/5] w-full bg-[#0F1B2D]/5 mb-6 flex items-center justify-center">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-[#5A5A5A]">[GÖRSEL — {f.name}]</span>
                  </div>
                  <div className="font-serif text-3xl text-[#0F1B2D]">{f.name}</div>
                  <div className="mt-1 text-[12px] tracking-[0.15em] uppercase text-[#C75B39]">{f.role}</div>
                  <p className="mt-5 text-[15px] text-[#5A5A5A]">{f.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <Link to="/iletisim" className="ev-btn-primary">
              {t("nav.primaryCta")} <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
