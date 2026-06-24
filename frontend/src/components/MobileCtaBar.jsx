import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { STICKY_CTA } from "../constants/testIds";

export default function MobileCtaBar() {
  const { t } = useLang();
  return (
    <div className="sticky-cta" data-testid={STICKY_CTA}>
      <Link to="/iletisim" className="ev-btn-primary w-full justify-center">
        {t("nav.primaryCta")} <ArrowUpRight size={16} strokeWidth={1.5} />
      </Link>
    </div>
  );
}
