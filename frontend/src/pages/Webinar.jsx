import React from "react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";
import WebinarForm from "../components/WebinarForm";

export default function Webinar() {
  const { t } = useLang();
  return (
    <main>
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <Reveal><div className="overline">{t("webinar.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif mt-6 text-5xl md:text-7xl leading-[1.05] tracking-tight text-[#0F1B2D]">
                {t("webinar.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[#5A5A5A] max-w-xl">{t("webinar.sub")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-ev grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="ev-card p-10 h-full">
              <div className="overline">{t("webinar.past.title")}</div>
              <h3 className="mt-5 font-serif text-3xl text-[#0F1B2D]">{t("webinar.past.name")}</h3>
              <p className="mt-4 text-[15px] text-[#5A5A5A]">{t("webinar.past.speaker")}</p>
              <div className="mt-6 text-[12px] tracking-[0.18em] uppercase text-[#0F1B2D]/70">{t("webinar.past.meta")}</div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="ev-card p-10 h-full bg-[#0F1B2D] border-[#0F1B2D] text-[#F7F5F0]">
              <div className="overline text-[#C75B39]">{t("webinar.upcoming.title")}</div>
              <h3 className="mt-5 font-serif text-3xl text-[#F7F5F0]">{t("webinar.upcoming.name")}</h3>
              <div className="mt-6 text-[12px] tracking-[0.18em] uppercase text-[#F7F5F0]/70">{t("webinar.upcoming.meta")}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl text-[#0F1B2D] leading-[1.05]">{t("webinar.formTitle")}</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-[15px] text-[#5A5A5A] max-w-md">{t("webinar.formSub")}</p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="bg-white p-8 md:p-10 border border-[#0F1B2D]/10">
                <WebinarForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
