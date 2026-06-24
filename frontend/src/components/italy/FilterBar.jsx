import React from "react";
import { Search, X } from "lucide-react";

export default function FilterBar({
  value,
  onChange,
  cities,
  resultCount,
  totalCount,
}) {
  const set = (patch) => onChange({ ...value, ...patch });
  const reset = () =>
    onChange({ level: "all", type: "all", city: "all", q: "" });

  return (
    <div className="border border-[#0F1B2D]/10 bg-white p-5 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-3">
          <label className="ev-label">Eğitim seviyesi</label>
          <select
            className="ev-select"
            value={value.level}
            onChange={(e) => set({ level: e.target.value })}
            data-testid="map-filter-level"
          >
            <option value="all">Tümü</option>
            <option value="bachelor">Lisans</option>
            <option value="master">Yüksek Lisans</option>
          </select>
        </div>
        <div className="md:col-span-3">
          <label className="ev-label">Üniversite tipi</label>
          <select
            className="ev-select"
            value={value.type}
            onChange={(e) => set({ type: e.target.value })}
            data-testid="map-filter-type"
          >
            <option value="all">Tümü</option>
            <option value="state">Devlet</option>
            <option value="private">Özel</option>
            <option value="special">Özel Statü</option>
          </select>
        </div>
        <div className="md:col-span-3">
          <label className="ev-label">Şehir</label>
          <select
            className="ev-select"
            value={value.city}
            onChange={(e) => set({ city: e.target.value })}
            data-testid="map-filter-city"
          >
            <option value="all">Tümü</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-3">
          <label className="ev-label">Arama</label>
          <div className="relative flex items-center">
            <Search size={14} strokeWidth={1.25} className="absolute left-0 text-[#5A5A5A]" />
            <input
              type="text"
              value={value.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Program veya üniversite"
              className="ev-input pl-6"
              data-testid="map-filter-search"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 ev-divider pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[12px] tracking-[0.06em] text-[#5A5A5A]">
          <span className="text-[#0F1B2D] font-medium">{resultCount}</span> /{" "}
          {totalCount} üniversite filtreye uyuyor
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1 text-[11px] tracking-[0.18em] uppercase text-[#5A5A5A] hover:text-[#C75B39] transition"
          data-testid="map-filter-reset"
        >
          <X size={12} strokeWidth={1.25} /> Filtreleri sıfırla
        </button>
      </div>
    </div>
  );
}
