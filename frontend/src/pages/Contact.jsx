import React from "react";
import { Mail, Phone, MessageCircle, Instagram, MapPin } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  const { t } = useLang();
  const faq = t("faq.items");
  return (
    <main>
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <Reveal><div className="overline">{t("contact.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif mt-6 text-5xl md:text-7xl leading-[1.05] text-[#0F1B2D]">
                {t("contact.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[#5A5A5A] max-w-xl">{t("contact.sub")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <div className="overline">{t("contact.formTitle")}</div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-8 bg-white p-8 md:p-10 border border-[#0F1B2D]/10">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal>
              <div className="overline">{t("contact.directTitle")}</div>
            </Reveal>

            <div className="mt-8 space-y-6">
              <Reveal delay={0.05}>
                <a
                  href="https://wa.me/905325800656"
                  target="_blank"
                  rel="noreferrer"
                  className="ev-btn-accent w-full justify-center"
                  data-testid="whatsapp-cta"
                >
                  <MessageCircle size={16} strokeWidth={1.5} /> {t("contact.whatsappCta")}
                </a>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="ev-card p-7">
                  <div className="space-y-4 text-[15px] text-[#0F1B2D]">
                    <a href="mailto:eduvincitaly@gmail.com" className="flex items-center gap-3 hover:text-[#C75B39]" data-testid="contact-email">
                      <Mail size={18} strokeWidth={1.25} className="text-[#C75B39]" />
                      <span>eduvincitaly@gmail.com</span>
                    </a>
                    <a href="tel:+905325800656" className="flex items-center gap-3 hover:text-[#C75B39]" data-testid="contact-phone-tr">
                      <Phone size={18} strokeWidth={1.25} className="text-[#C75B39]" />
                      <span>+90 532 580 06 56</span>
                    </a>
                    <a href="tel:+393514293029" className="flex items-center gap-3 hover:text-[#C75B39]" data-testid="contact-phone-it">
                      <Phone size={18} strokeWidth={1.25} className="text-[#C75B39]" />
                      <span>+39 351 429 3029</span>
                    </a>
                    <a href="https://instagram.com/eduvinci" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#C75B39]" data-testid="contact-instagram">
                      <Instagram size={18} strokeWidth={1.25} className="text-[#C75B39]" />
                      <span>@eduvinci</span>
                    </a>
                    <div className="ev-divider pt-4 flex items-start gap-3 text-[#5A5A5A]">
                      <MapPin size={18} strokeWidth={1.25} className="text-[#C75B39] mt-0.5" />
                      <div>
                        <div className="text-[11px] tracking-[0.18em] uppercase text-[#0F1B2D]">{t("contact.cityLabel")}</div>
                        <div className="mt-1 text-[14px]">{t("contact.city")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#F1ECE2]">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal><div className="overline">{t("faq.overline")}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-serif text-4xl md:text-5xl leading-[1.05] text-[#0F1B2D]">
                {t("faq.title")}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <div className="border-t border-[#0F1B2D]/15">
              {faq.map((it, i) => (
                <Reveal key={i} delay={0.04 * i}>
                  <details className="group border-b border-[#0F1B2D]/15 py-6" data-testid={`faq-item-${i}`}>
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="font-serif text-xl md:text-2xl text-[#0F1B2D] pr-8">{it.q}</span>
                      <span className="text-[#C75B39] text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-[15px] text-[#5A5A5A] leading-relaxed max-w-3xl">{it.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
