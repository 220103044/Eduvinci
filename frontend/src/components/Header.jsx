import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { NAV } from "../constants/testIds";

const NavItem = ({ to, label, testid, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    data-testid={testid}
    className={({ isActive }) =>
      `text-[13px] tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-300 ${
        isActive ? "text-[#C75B39]" : "text-[#0F1B2D] hover:text-[#C75B39]"
      }`
    }
  >
    {label}
  </NavLink>
);

export default function Header() {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/hakkimizda", label: t("nav.about"), testid: NAV.about },
    { to: "/hizmetler", label: t("nav.services"), testid: NAV.services },
    { to: "/italyada-egitim", label: t("nav.italy"), testid: NAV.italy },
    { to: "/basari-hikayeleri", label: t("nav.stories"), testid: NAV.stories },
    { to: "/webinar", label: t("nav.webinar"), testid: NAV.webinar },
    { to: "/blog", label: t("nav.blog"), testid: NAV.blog },
    { to: "/iletisim", label: t("nav.contact"), testid: NAV.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "bg-[#F7F5F0]/90 border-b border-[#0F1B2D]/10 py-2" : "bg-[#F7F5F0]/70 py-4"
      }`}
    >
      <div className="container-ev flex items-center justify-between gap-6">
        <Link to="/" data-testid={NAV.brand} className="flex items-baseline gap-2 shrink-0">
          <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#0F1B2D]">EDUVINCI</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={toggle}
            data-testid={NAV.langToggle}
            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#0F1B2D] hover:text-[#C75B39] transition-colors"
            aria-label="Toggle language"
          >
            <span className={lang === "tr" ? "text-[#C75B39]" : ""}>TR</span>
            <span className="opacity-30">/</span>
            <span className={lang === "en" ? "text-[#C75B39]" : ""}>EN</span>
          </button>

          <Link
            to="/iletisim"
            data-testid={NAV.primaryCta}
            className="hidden lg:inline-flex ev-btn-primary"
          >
            {t("nav.primaryCta")} <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>

          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setOpen(true)}
            data-testid={NAV.mobileMenuOpen}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.25} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#F7F5F0]">
          <div className="container-ev flex items-center justify-between py-4 border-b border-[#0F1B2D]/10">
            <span className="font-serif text-2xl">EDUVINCI</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              data-testid={NAV.mobileMenuClose}
              aria-label="Close menu"
              className="p-2"
            >
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>
          <div className="container-ev flex flex-col gap-6 pt-10 pb-12">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`${l.testid}-mobile`}
                className="font-serif text-3xl text-[#0F1B2D]"
              >
                {l.label}
              </Link>
            ))}
            <div className="ev-divider pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={toggle}
                className="text-[12px] tracking-[0.18em] uppercase"
                data-testid={`${NAV.langToggle}-mobile`}
              >
                <span className={lang === "tr" ? "text-[#C75B39]" : ""}>TR</span>
                <span className="opacity-30 mx-2">/</span>
                <span className={lang === "en" ? "text-[#C75B39]" : ""}>EN</span>
              </button>
              <Link
                to="/iletisim"
                onClick={() => setOpen(false)}
                className="ev-btn-primary"
              >
                {t("nav.primaryCta")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
