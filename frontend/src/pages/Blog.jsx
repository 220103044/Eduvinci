import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { fetchBlogPosts } from "../lib/api";
import Reveal from "../components/Reveal";

export default function Blog() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tümü");
  const categories = t("blog.categories");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchBlogPosts()
      .then((data) => { if (mounted) setPosts(data); })
      .catch(() => { if (mounted) setPosts([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const visible = useMemo(() => {
    const allLabel = categories[0];
    if (filter === allLabel) return posts;
    return posts.filter((p) => p.category_tr === filter || p.category_en === filter);
  }, [posts, filter, categories]);

  return (
    <main>
      <section className="section">
        <div className="container-ev grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
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
          <div className="flex flex-wrap gap-2 mb-12" data-testid="blog-categories">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-[12px] tracking-[0.12em] uppercase px-4 py-2 border transition ${
                  filter === c
                    ? "bg-[#0F1B2D] text-[#F7F5F0] border-[#0F1B2D]"
                    : "border-[#0F1B2D]/20 text-[#0F1B2D] hover:bg-[#0F1B2D]/5"
                }`}
                data-testid={`blog-category-${c}`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-[14px] text-[#5A5A5A]">Loading…</div>
          ) : visible.length === 0 ? (
            <div className="text-[14px] text-[#5A5A5A]">No posts yet.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5" data-testid="blog-list">
              {visible.map((p, i) => (
                <Reveal key={p.slug} delay={0.03 * i}>
                  <Link to={`/blog/${p.slug}`} className="ev-card block h-full overflow-hidden" data-testid={`blog-card-${p.slug}`}>
                    <div className="aspect-[5/3] w-full overflow-hidden">
                      <img src={p.cover_image} alt={lang === "tr" ? p.title_tr : p.title_en} className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]" />
                    </div>
                    <div className="p-8">
                      <div className="overline">{lang === "tr" ? p.category_tr : p.category_en}</div>
                      <h3 className="mt-3 font-serif text-2xl text-[#0F1B2D] leading-tight">
                        {lang === "tr" ? p.title_tr : p.title_en}
                      </h3>
                      <p className="mt-3 text-[14.5px] text-[#5A5A5A] leading-relaxed line-clamp-3">
                        {lang === "tr" ? p.excerpt_tr : p.excerpt_en}
                      </p>
                      <div className="mt-6 flex items-center justify-between text-[12px] tracking-[0.14em] uppercase text-[#0F1B2D]/70">
                        <span>{p.read_minutes} {t("blog.readMin")}</span>
                        <span className="inline-flex items-center gap-1 text-[#C75B39]">
                          {t("common.readMore")} <ArrowUpRight size={14} strokeWidth={1.5} />
                        </span>
                      </div>
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
