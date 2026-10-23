import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { guides, categories } from "../data/guides";

export default function Blog() {
  const [active, setActive] = useState("Tümü");

  const visible = useMemo(() => {
    if (active === "Tümü") return guides;
    return guides.filter((g) => g.kategori === active);
  }, [active]);

  return (
    <main>
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-9">
            <Reveal>
              <div className="overline">Blog</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif mt-6 text-5xl md:text-7xl leading-[1.05] tracking-tight text-[#0F1B2D]">
                İtalya'da öğrenci olmanın adım adım rehberi
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[#5A5A5A] max-w-2xl">
                Vizeden residenza'ya, EDISU bursundan sınav dönemlerine: Torino'da
                okuyan Türk öğrenciler için resmi kaynaklarla hazırlanmış rehberler.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-ev">
          {/* Kategori filtresi */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`text-[12px] tracking-[0.12em] uppercase px-4 py-2 border transition ${
                    active === c
                      ? "bg-[#0F1B2D] text-[#F7F5F0] border-[#0F1B2D]"
                      : "border-[#0F1B2D]/20 text-[#0F1B2D] hover:bg-[#0F1B2D]/5"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Rehber kartları */}
          {visible.length === 0 ? (
            <div className="text-[14px] text-[#5A5A5A]">
              Bu kategoride henüz rehber yok.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {visible.map((g, i) => (
                <Reveal key={g.slug} delay={0.03 * i}>
                  <Link
                    to={`/blog/${g.slug}`}
                    className="ev-card block h-full p-8"
                  >
                    <div className="overline">{g.kategori}</div>
                    <h3 className="mt-3 font-serif text-2xl text-[#0F1B2D] leading-tight">
                      {g.baslik}
                    </h3>
                    <p className="mt-3 text-[14.5px] text-[#5A5A5A] leading-relaxed line-clamp-3">
                      {g.ozet}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-[12px] tracking-[0.14em] uppercase text-[#0F1B2D]/70">
                      <span>{g.okumaSuresi} okuma</span>
                      <span className="inline-flex items-center gap-1 text-[#C75B39]">
                        Oku <ArrowUpRight size={14} strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
