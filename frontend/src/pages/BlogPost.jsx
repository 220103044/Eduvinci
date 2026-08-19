import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";

export default function BlogPost() {
  const { t } = useLang();
  return (
    <main className="container-ev section">
      <div className="max-w-2xl">
        <div className="overline">Yakında</div>
        <h1 className="font-serif mt-6 text-4xl md:text-5xl text-[#0F1B2D] leading-tight">
          Bu yazı henüz yayında değil.
        </h1>
        <p className="mt-6 text-[15px] text-[#5A5A5A] leading-relaxed">
          Blog içeriklerimiz çok yakında yayınlanacak.
        </p>
        <Link to="/blog" className="ev-link-underline mt-8 inline-flex">
          {t("common.backToBlog")}
        </Link>
      </div>
    </main>
  );
}
