import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ExternalLink } from "lucide-react";
import Reveal from "../components/Reveal";
import { getGuide, guides } from "../data/guides";
import { WHATSAPP_NUMBER } from "../lib/whatsapp";

function Section({ b }) {
  switch (b.tip) {
    case "paragraf":
      return (
        <p className="mt-6 text-[17px] leading-[1.85] text-[#1A1A1A]/85 font-light">
          {b.metin}
        </p>
      );
    case "baslik":
      return (
        <h2 className="font-serif mt-14 text-3xl md:text-4xl text-[#0F1B2D] leading-tight">
          {b.metin}
        </h2>
      );
    case "altbaslik":
      return (
        <h3 className="mt-8 text-xl font-semibold text-[#0F1B2D]">{b.metin}</h3>
      );
    case "uyari":
      return (
        <div className="mt-8 border-l-2 border-[#C75B39] bg-[#C75B39]/5 px-6 py-5">
          <p className="text-[15.5px] leading-[1.75] text-[#1A1A1A]/85">{b.metin}</p>
        </div>
      );
    case "liste":
      return (
        <ul className="mt-6 space-y-3">
          {b.ogeler.map((o, i) => (
            <li key={i} className="flex gap-3 text-[16px] leading-[1.7] text-[#1A1A1A]/85">
              <span className="text-[#C75B39] mt-[2px]">—</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      );
    case "adimlar":
      return (
        <ol className="mt-8 space-y-6">
          {b.ogeler.map((o, i) => (
            <li key={i} className="flex gap-5">
              <span className="font-serif text-2xl text-[#C75B39] leading-none mt-1 w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-semibold text-[#0F1B2D] text-[16.5px]">
                  {o.baslik}
                </div>
                <p className="mt-1 text-[15.5px] leading-[1.7] text-[#1A1A1A]/80">
                  {o.metin}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "ipucu":
      return (
        <div className="mt-10">
          <div className="overline text-[#C75B39]">{b.baslik}</div>
          <ul className="mt-5 space-y-4">
            {b.ogeler.map((o, i) => (
              <li
                key={i}
                className="border-t border-[#0F1B2D]/10 pt-4 text-[15.5px] leading-[1.7] text-[#1A1A1A]/85"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      );
    case "sss":
      return (
        <div className="mt-14">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0F1B2D] leading-tight">
            {b.baslik}
          </h2>
          <div className="mt-6 divide-y divide-[#0F1B2D]/10">
            {b.ogeler.map((o, i) => (
              <div key={i} className="py-5">
                <div className="font-semibold text-[#0F1B2D] text-[16.5px]">
                  {o.soru}
                </div>
                <p className="mt-2 text-[15.5px] leading-[1.7] text-[#1A1A1A]/80">
                  {o.cevap}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    case "kaynaklar":
      return (
        <div className="mt-14">
          <div className="overline">{b.baslik}</div>
          <ul className="mt-5 space-y-3">
            {b.ogeler.map((o, i) => (
              <li key={i}>
                <a
                  href={o.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[15px] text-[#0F1B2D] hover:text-[#C75B39] transition"
                >
                  <ExternalLink size={14} strokeWidth={1.5} className="text-[#C75B39]" />
                  {o.etiket}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-[#5A5A5A] italic">
            Ücretler, tarihler ve prosedürler kurumlar tarafından değiştirilebilir.
            İşleme başlamadan önce ilgili resmi sayfayı mutlaka kontrol et.
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getGuide(slug);

  if (!post) {
    return (
      <main className="container-ev section">
        <div className="max-w-2xl">
          <div className="overline">Rehber bulunamadı</div>
          <h1 className="font-serif mt-6 text-4xl text-[#0F1B2D]">
            Aradığın rehber mevcut değil.
          </h1>
          <Link to="/blog" className="ev-link-underline mt-8 inline-flex">
            Yazılara dön
          </Link>
        </div>
      </main>
    );
  }

  const related = guides.filter((g) => g.slug !== post.slug).slice(0, 3);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <main>
      <article className="section">
        <div className="container-ev max-w-3xl">
          <Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#5A5A5A] hover:text-[#C75B39]"
            >
              <ArrowLeft size={14} strokeWidth={1.5} /> Yazılara dön
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="overline mt-8">{post.kategori}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif mt-5 text-4xl md:text-5xl leading-[1.1] text-[#0F1B2D]">
              {post.baslik}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg text-[#5A5A5A] leading-relaxed">{post.ozet}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center gap-4 text-[12px] tracking-[0.14em] uppercase text-[#5A5A5A]">
              <span>{post.okumaSuresi} okuma</span>
              <span className="w-1 h-1 rounded-full bg-[#5A5A5A]/40" />
              <span>Son güncelleme: {post.guncelleme}</span>
            </div>
          </Reveal>

          {/* Giriş paragrafları */}
          <Reveal delay={0.25}>
            <div className="mt-12">
              {post.giris.map((p, i) => (
                <p
                  key={i}
                  className="text-[17px] leading-[1.85] text-[#1A1A1A]/85 font-light mb-6"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Gövde bölümleri */}
          <div>
            {post.bolumler.map((b, i) => (
              <Section key={i} b={b} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 ev-card p-10 md:p-12">
            <div className="overline text-[#C75B39]">EduVinci</div>
            <h3 className="font-serif mt-4 text-2xl md:text-3xl text-[#0F1B2D] leading-tight">
              Bu süreçte yardıma mı ihtiyacın var? Yanındayız.
            </h3>
            <p className="mt-4 text-[15px] text-[#5A5A5A] leading-relaxed max-w-xl">
              Belgelerini birlikte kontrol edelim, randevu ve takvimi senin için
              planlayalım. EduVinci olarak İtalya'daki her adımda yanındayız.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ev-btn-accent inline-flex"
              >
                WhatsApp <ArrowUpRight size={16} strokeWidth={1.5} />
              </a>
              <Link to="/iletisim" className="ev-btn-secondary inline-flex">
                İletişim formu
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Benzer rehberler */}
      {related.length > 0 && (
        <section className="section pt-0">
          <div className="container-ev max-w-3xl">
            <div className="overline">Benzer rehberler</div>
            <div className="mt-6 divide-y divide-[#0F1B2D]/10">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  to={`/blog/${g.slug}`}
                  className="flex items-center justify-between gap-4 py-5 group"
                >
                  <span className="font-serif text-lg text-[#0F1B2D] group-hover:text-[#C75B39] transition">
                    {g.baslik}
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#C75B39] shrink-0"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
