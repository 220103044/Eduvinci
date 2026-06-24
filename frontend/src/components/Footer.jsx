import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";

export default function Footer() {
  const { t, lang, toggle } = useLang();
  return (
    <footer className="border-t border-[#0F1B2D]/10 bg-[#F7F5F0]">
      <div className="container-ev py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-serif text-3xl tracking-tight text-[#0F1B2D]">EDUVINCI</div>
          <p className="mt-3 max-w-md text-[15px] text-[#5A5A5A] leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="text-[11px] tracking-[0.18em] uppercase border border-[#0F1B2D]/20 px-3 py-2 hover:bg-[#0F1B2D]/5 transition"
              data-testid="footer-lang-toggle"
            >
              <span className={lang === "tr" ? "text-[#C75B39]" : ""}>TR</span>
              <span className="opacity-30 mx-2">/</span>
              <span className={lang === "en" ? "text-[#C75B39]" : ""}>EN</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="overline mb-4">{t("footer.sections.explore")}</div>
          <ul className="space-y-3 text-[14px]">
            <li><Link to="/hakkimizda" className="hover:text-[#C75B39]">{t("nav.about")}</Link></li>
            <li><Link to="/italyada-egitim" className="hover:text-[#C75B39]">{t("nav.italy")}</Link></li>
            <li><Link to="/basari-hikayeleri" className="hover:text-[#C75B39]">{t("nav.stories")}</Link></li>
            <li><Link to="/webinar" className="hover:text-[#C75B39]">{t("nav.webinar")}</Link></li>
            <li><Link to="/blog" className="hover:text-[#C75B39]">{t("nav.blog")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="overline mb-4">{t("footer.sections.services")}</div>
          <ul className="space-y-3 text-[14px]">
            <li><Link to="/hizmetler" className="hover:text-[#C75B39]">IMAT · TIL · ARCHED</Link></li>
            <li><Link to="/hizmetler" className="hover:text-[#C75B39]">Universitaly</Link></li>
            <li><Link to="/hizmetler" className="hover:text-[#C75B39]">DSU</Link></li>
            <li><Link to="/hizmetler" className="hover:text-[#C75B39]">Vize</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="overline mb-4">{t("footer.sections.contact")}</div>
          <ul className="space-y-3 text-[14px]">
            <li className="flex items-center gap-2"><Mail size={14} strokeWidth={1.25} /> eduvincitaly@gmail.com</li>
            <li className="flex items-center gap-2"><Phone size={14} strokeWidth={1.25} /> +90 532 580 06 56</li>
            <li className="flex items-center gap-2"><Phone size={14} strokeWidth={1.25} /> +39 351 429 3029</li>
            <li className="flex items-center gap-2"><Instagram size={14} strokeWidth={1.25} /> @eduvinci</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#0F1B2D]/10">
        <div className="container-ev py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12px] text-[#5A5A5A]">
          <span>{t("footer.rights")}</span>
          <span className="opacity-80">{t("footer.legal")}</span>
        </div>
      </div>
    </footer>
  );
}
