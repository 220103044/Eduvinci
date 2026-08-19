import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";

export default function Blog() {
  const { t } = useLang();

  return (
    <main>
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <Reveal><div className="overline">{t("blog.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif mt-6 text-5xl md:text-7xl leading-[1.05] tracking-tight text-[#0F1B2D]">
                {t("blog.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[#5A5A5A] max-w-xl">{t("blog.sub")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-ev">
          <Reveal>
            <div className="ev-card p-16 md:p-24 text-center">
              <div className="overline">Yakında</div>
              <h2 className="font-serif mt-6 text-3xl md:text-5xl text-[#0F1B2D] leading-tight">
                Blog içeriklerimiz çok yakında burada.
              </h2>
              <p className="mt-6 text-[15px] text-[#5A5A5A] max-w-lg mx-auto leading-relaxed">
                İtalya'da üniversite başvuruları, vize süreçleri, burslar ve
                öğrenci hayatına dair rehber yazılarımızı hazırlıyoruz. O zamana
                kadar sorularınız için bize ulaşabilirsiniz.
              </p>
              <div className="mt-10">
                <Link to="/iletisim" className="ev-btn-accent inline-flex">
                  {t("nav.primaryCta")}
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
