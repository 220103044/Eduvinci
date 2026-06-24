import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Compass, GraduationCap, ClipboardCheck, FileSearch, Plane, BookOpen, Home as HomeIcon,
} from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";

const ICONS = [Compass, GraduationCap, ClipboardCheck, FileSearch, Plane, BookOpen, HomeIcon];

export default function Services() {
  const { t } = useLang();
  const items = t("services.items");
  const steps = t("serviceSteps.steps");
  return (
    <main>
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <Reveal><div className="overline">{t("services.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif mt-6 text-5xl md:text-7xl leading-[1.05] tracking-tight text-[#0F1B2D]">
                {t("services.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[#5A5A5A] max-w-xl">{t("services.sub")}</p>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <div className="border border-[#0F1B2D]/10 p-8 bg-white">
                <div className="overline">{t("serviceSteps.title")}</div>
                <ol className="mt-6 space-y-4">
                  {steps.map((s, i) => (
                    <li key={i} className="flex items-baseline gap-4">
                      <span className="font-serif text-2xl text-[#C75B39] w-10">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[15px] text-[#0F1B2D]">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="ev-divider" />

      <section className="section">
        <div className="container-ev">
          <div className="grid md:grid-cols-12 gap-px bg-[#0F1B2D]/10">
            {items.map((it, i) => {
              const Icon = ICONS[i % ICONS.length];
              const span = i % 5 === 0 ? "md:col-span-8" : "md:col-span-4";
              return (
                <Reveal key={it.title} delay={0.03 * i}>
                  <div className={`${span} bg-[#F7F5F0] p-10 h-full`}>
                    <div className="flex items-start justify-between gap-6">
                      <Icon size={32} strokeWidth={1} className="text-[#C75B39]" />
                      <span className="font-serif text-3xl text-[#0F1B2D]/40">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-8 font-serif text-2xl md:text-3xl text-[#0F1B2D] leading-tight">{it.title}</h3>
                    <p className="mt-3 text-[15px] text-[#5A5A5A] leading-relaxed">{it.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#0F1B2D] text-[#F7F5F0]">
        <div className="container-ev grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <div className="overline text-[#C75B39]">{t("finalCta.overline")}</div>
            <h2 className="font-serif mt-5 text-4xl md:text-5xl leading-tight">
              {t("finalCta.title")}
            </h2>
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
