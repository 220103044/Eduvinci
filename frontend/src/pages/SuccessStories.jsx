import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Quote } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";
import { testimonials } from "../data/testimonials";

export default function SuccessStories() {
  const { t } = useLang();
  return (
    <main>
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <Reveal><div className="overline">{t("stories.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif mt-6 text-5xl md:text-7xl leading-[1.05] tracking-tight text-[#0F1B2D]">
                {t("stories.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[#5A5A5A] max-w-xl">{t("stories.sub")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-ev grid md:grid-cols-3 gap-5" data-testid="stories-grid">
          {testimonials.map((s, i) => (
            <Reveal key={s.id} delay={0.04 * i}>
              <article
                className="ev-card p-8 h-full flex flex-col"
                data-testid={`story-card-${s.id}`}
              >
                <Quote size={26} strokeWidth={1} className="text-[#C75B39]" />
                <p className="mt-6 font-serif text-[22px] text-[#0F1B2D] leading-snug flex-1">
                  &ldquo;{s.quote}&rdquo;
                </p>
                <div className="mt-8 ev-divider pt-4 flex items-center justify-between gap-3 text-[13px] text-[#0F1B2D]">
                  <span className="font-medium" data-testid={`story-name-${s.id}`}>{s.name}</span>
                  <span
                    className="text-[10px] tracking-[0.18em] uppercase text-[#C75B39] text-right"
                    data-testid={`story-university-${s.id}`}
                  >
                    {s.university}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-[#0F1B2D] text-[#F7F5F0]">
        <div className="container-ev grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <div className="overline text-[#C75B39]">{t("finalCta.overline")}</div>
            <h2 className="font-serif mt-5 text-4xl md:text-5xl leading-tight">{t("finalCta.title")}</h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link to="/iletisim" className="ev-btn-accent">
              {t("nav.primaryCta")} <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
