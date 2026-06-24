import React, { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, GraduationCap, ExternalLink, BookOpen } from "lucide-react";
import { isPlaceholder, universityTypeLabel } from "../../data/italyData";

function ProgramCard({ p }) {
  if (!p || !p.name) return null;
  const meta = [];
  if (!isPlaceholder(p.faculty)) meta.push(p.faculty);
  if (p.durationYears) meta.push(`${p.durationYears} yıl`);
  if (!isPlaceholder(p.language)) meta.push(p.language);
  const hasAdmission = !isPlaceholder(p.admissionType);
  return (
    <div className="ev-card p-5">
      <div className="font-serif text-lg text-[#0F1B2D] leading-snug">{p.name}</div>
      {meta.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] tracking-[0.12em] uppercase text-[#5A5A5A]">
          {meta.map((m, i) => (
            <span key={i} className="border border-[#0F1B2D]/15 px-2 py-1">{m}</span>
          ))}
        </div>
      )}
      {hasAdmission && (
        <div className="mt-3 inline-flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase text-[#C75B39] border border-[#C75B39]/40 px-2 py-1 bg-[#C75B39]/5">
          {p.admissionType}
        </div>
      )}
      {p.officialPageUrl && !isPlaceholder(p.officialPageUrl) && (
        <a
          href={p.officialPageUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-[12px] tracking-[0.12em] uppercase text-[#C75B39]"
        >
          Program sayfası <ExternalLink size={12} strokeWidth={1.25} />
        </a>
      )}
    </div>
  );
}

function ProgramColumn({ title, programs, emptyLabel }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#0F1B2D]/10 pb-3">
        <GraduationCap size={20} strokeWidth={1} className="text-[#C75B39]" />
        <h4 className="font-serif text-xl md:text-2xl text-[#0F1B2D]">{title}</h4>
        <span className="ml-auto text-[11px] tracking-[0.18em] uppercase text-[#5A5A5A]">
          {programs?.length || 0}
        </span>
      </div>
      <div className="space-y-3" data-testid={`programs-${title.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`}>
        {(!programs || programs.length === 0) ? (
          <div className="p-5 border border-dashed border-[#0F1B2D]/15 text-[13px] text-[#5A5A5A]">
            {emptyLabel}
          </div>
        ) : (
          programs.map((p, i) => <ProgramCard key={p.id || i} p={p} />)
        )}
      </div>
    </div>
  );
}

export default function UniversityModal({ open, university, onClose, levelFilter = "all" }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const heroOk = university && university.heroImageUrl && !isPlaceholder(university.heroImageUrl);

  const showBachelor = levelFilter === "all" || levelFilter === "bachelor";
  const showMaster = levelFilter === "all" || levelFilter === "master";

  const bPrograms = useMemo(
    () => (university?.bachelorPrograms || []).filter((p) => p && p.name),
    [university]
  );
  const mPrograms = useMemo(
    () => (university?.masterPrograms || []).filter((p) => p && p.name),
    [university]
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && university && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-stretch md:items-center md:justify-center bg-[#0F1B2D]/55 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${university.name} program detayı`}
          data-testid="university-modal"
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#F7F5F0] w-full md:w-[min(1100px,94vw)] max-h-[100vh] md:max-h-[92vh] flex flex-col"
          >
            {/* Dark header */}
            <div className="bg-[#0F1B2D] text-[#F7F5F0] px-6 md:px-10 py-6 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-[11px] tracking-[0.22em] uppercase text-[#C75B39]">Üniversite</div>
                <h3 className="mt-2 font-serif text-2xl md:text-4xl leading-tight">{university.name}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className={`text-[10px] tracking-[0.18em] uppercase px-2 py-1 border ${
                    university.type === "state"
                      ? "border-[#F7F5F0] text-[#F7F5F0]"
                      : university.type === "private"
                      ? "border-[#C75B39] text-[#C75B39]"
                      : "border-[#F7F5F0]/50 text-[#F7F5F0]/80"
                  }`}>
                    {universityTypeLabel(university.type).toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] tracking-[0.06em] text-[#F7F5F0]/80">
                    <MapPin size={14} strokeWidth={1.25} className="text-[#C75B39]" />
                    {university.city}
                  </span>
                  {!isPlaceholder(university.founded) && (
                    <span className="text-[11px] tracking-[0.18em] uppercase text-[#F7F5F0]/60">
                      Kuruluş {university.founded}
                    </span>
                  )}
                  {university.website && !isPlaceholder(university.website) && (
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[12px] tracking-[0.06em] uppercase text-[#F7F5F0] hover:text-[#C75B39]"
                    >
                      Resmi site <ExternalLink size={12} strokeWidth={1.25} />
                    </a>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Modalı kapat"
                data-testid="university-modal-close"
                className="p-2 hover:bg-[#F7F5F0]/10 transition shrink-0"
              >
                <X size={22} strokeWidth={1.25} />
              </button>
            </div>

            {/* Hero */}
            <div className="relative w-full aspect-[16/5] bg-[#0F1B2D]/5 overflow-hidden">
              {heroOk ? (
                <img src={university.heroImageUrl} alt={university.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[11px] tracking-[0.22em] uppercase text-[#5A5A5A]">
                  Görsel yakında eklenecek
                </div>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 grid md:grid-cols-2 gap-10">
              {showBachelor ? (
                <ProgramColumn
                  title="Lisans Programları"
                  programs={bPrograms}
                  emptyLabel="Programlar yakında eklenecek"
                />
              ) : (
                <div />
              )}
              {showMaster ? (
                <ProgramColumn
                  title="Yüksek Lisans Programları"
                  programs={mPrograms}
                  emptyLabel="Programlar yakında eklenecek"
                />
              ) : (
                <div />
              )}

              {/* Honest footer */}
              <div className="md:col-span-2 ev-divider pt-6 grid sm:grid-cols-3 gap-4 text-[12px] text-[#5A5A5A]">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} strokeWidth={1.25} className="text-[#C75B39]" />
                  <span>
                    Sıralamalar:{" "}
                    <strong className="text-[#0F1B2D] font-medium">
                      {isPlaceholder(university?.rankings?.qs) && isPlaceholder(university?.rankings?.the)
                        ? "Bilgi güncelleniyor"
                        : `QS: ${isPlaceholder(university?.rankings?.qs) ? "—" : university.rankings.qs} · THE: ${isPlaceholder(university?.rankings?.the) ? "—" : university.rankings.the}`}
                    </strong>
                  </span>
                </div>
                <div>
                  Harç aralığı:{" "}
                  <strong className="text-[#0F1B2D] font-medium">
                    {isPlaceholder(university?.tuitionRangeEurPerYear?.min) &&
                    isPlaceholder(university?.tuitionRangeEurPerYear?.max)
                      ? "Bilgi güncelleniyor"
                      : `${university.tuitionRangeEurPerYear.min}–${university.tuitionRangeEurPerYear.max} € / yıl`}
                  </strong>
                </div>
                <div>
                  Son güncelleme:{" "}
                  <strong className="text-[#0F1B2D] font-medium">
                    {isPlaceholder(university.lastVerified) ? "Bilgi güncelleniyor" : university.lastVerified}
                  </strong>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
