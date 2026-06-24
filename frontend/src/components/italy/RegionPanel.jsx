import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ArrowUpRight, Building2 } from "lucide-react";
import { formatNumber, isPlaceholder, universityTypeLabel } from "../../data/italyData";

function StatCard({ label, value }) {
  return (
    <div className="border border-[#0F1B2D]/10 p-4 bg-white">
      <div className="text-[10px] tracking-[0.18em] uppercase text-[#5A5A5A]">{label}</div>
      <div className="mt-2 font-serif text-2xl text-[#0F1B2D]">{value}</div>
    </div>
  );
}

export default function RegionPanel({
  region,
  universities,
  onClose,
  onUniversityClick,
  totalUniversitiesInRegion,
}) {
  const matchCount = universities.length;
  const open = !!region;

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="region-panel"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-[#0F1B2D]/10 h-full overflow-y-auto"
          data-testid="region-panel"
        >
          <div className="p-6 md:p-8 border-b border-[#0F1B2D]/10 flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-[#C75B39]">Bölge</div>
              <h3 className="mt-2 font-serif text-3xl md:text-4xl text-[#0F1B2D] leading-tight">
                {region.name}
              </h3>
              <div className="mt-1 text-[12px] text-[#5A5A5A]">{region.nameEn}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Paneli kapat"
              data-testid="region-panel-close"
              className="p-2 hover:bg-[#0F1B2D]/5 transition"
            >
              <X size={20} strokeWidth={1.25} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="bg-[#0F1B2D] text-[#F7F5F0] px-5 py-4 text-[13px] tracking-[0.06em] uppercase">
              Bu bölgede{" "}
              <span className="text-[#C75B39] font-medium">{totalUniversitiesInRegion}</span>{" "}
              üniversite bulunuyor
              {matchCount !== totalUniversitiesInRegion && (
                <span className="block mt-1 text-[11px] tracking-[0.18em] text-[#F7F5F0]/70 normal-case">
                  Filtreye uygun: {matchCount}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Başkent" value={isPlaceholder(region.capital) ? "—" : region.capital} />
              <StatCard label="Üniversite" value={String(totalUniversitiesInRegion)} />
              <StatCard label="Alan (km²)" value={formatNumber(region.areaKm2)} />
              <StatCard label="Nüfus" value={formatNumber(region.population)} />
            </div>

            <div>
              <div className="overline">Bölgedeki Üniversiteler</div>
              <ul className="mt-5 space-y-3" data-testid="region-universities-list">
                {universities.length === 0 && (
                  <li className="text-[13px] text-[#5A5A5A]">Filtreye uygun üniversite yok.</li>
                )}
                {universities.map((u) => (
                  <li key={u.id}>
                    <button
                      type="button"
                      onClick={() => onUniversityClick(u)}
                      data-testid={`region-university-${u.id}`}
                      className="w-full text-left ev-card p-5 group flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="font-serif text-xl text-[#0F1B2D] leading-tight">{u.name}</div>
                        <div className="mt-2 flex items-center gap-2 text-[12px] text-[#5A5A5A]">
                          <MapPin size={13} strokeWidth={1.25} className="text-[#C75B39]" />
                          <span>{u.city}</span>
                        </div>
                        <div className="mt-3 inline-flex items-center gap-2">
                          <span className={`text-[10px] tracking-[0.18em] uppercase px-2 py-1 border ${
                            u.type === "state"
                              ? "border-[#0F1B2D] text-[#0F1B2D]"
                              : u.type === "private"
                              ? "border-[#C75B39] text-[#C75B39]"
                              : "border-[#8A9A8E] text-[#5A5A5A]"
                          }`}>
                            {universityTypeLabel(u.type)}
                          </span>
                          {!isPlaceholder(u.shortName) && (
                            <span className="text-[11px] tracking-[0.15em] uppercase text-[#5A5A5A] flex items-center gap-1">
                              <Building2 size={12} strokeWidth={1.25} />
                              {u.shortName}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.25}
                        className="text-[#0F1B2D]/40 group-hover:text-[#C75B39] transition-colors"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
