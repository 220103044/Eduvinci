import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { fetchBlogPost } from "../lib/api";
import Reveal from "../components/Reveal";

export default function BlogPost() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchBlogPost(slug).then(setPost).catch(() => setPost(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <main className="container-ev section">Loading…</main>;
  if (!post) {
    return (
      <main className="container-ev section">
        <p>Not found.</p>
        <Link to="/blog" className="ev-link-underline mt-6 inline-flex">{t("common.backToBlog")}</Link>
      </main>
    );
  }

  const title = lang === "tr" ? post.title_tr : post.title_en;
  const body = lang === "tr" ? post.body_tr : post.body_en;
  const category = lang === "tr" ? post.category_tr : post.category_en;

  return (
    <main>
      <article className="section">
        <div className="container-ev max-w-3xl">
          <Reveal>
            <Link to="/blog" className="text-[12px] tracking-[0.18em] uppercase text-[#5A5A5A] hover:text-[#C75B39]">{t("common.backToBlog")}</Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="overline mt-8">{category}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif mt-5 text-4xl md:text-6xl leading-[1.05] text-[#0F1B2D]">{title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 text-[12px] tracking-[0.18em] uppercase text-[#5A5A5A]">
              {post.read_minutes} {t("blog.readMin")}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <img src={post.cover_image} alt={title} className="mt-10 w-full h-[480px] object-cover" />
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-12 prose prose-lg max-w-none">
              {body.split("\n\n").map((para, i) => (
                <p key={i} className="text-[17px] leading-[1.85] text-[#1A1A1A]/85 font-light mb-6 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
          <div className="ev-divider mt-16 pt-6 flex items-center justify-between">
            <Link to="/blog" className="ev-link-underline">{t("common.backToBlog")}</Link>
            <Link to="/iletisim" className="ev-btn-primary">{t("nav.primaryCta")}</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
