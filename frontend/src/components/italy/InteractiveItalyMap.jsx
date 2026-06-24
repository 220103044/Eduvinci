import React, { useMemo, useState } from "react";
import { regions, regionsById, allCities, allUniversities } from "../../data/italyData";
import ItalyMap from "./ItalyMap";
import RegionPanel from "./RegionPanel";
import UniversityModal from "./UniversityModal";
import FilterBar from "./FilterBar";

const DEFAULT_FILTERS = { level: "all", type: "all", city: "all", q: "" };

function programMatchesQuery(programs, q) {
  if (!q) return false;
  return (programs || []).some(
    (p) => p && p.name && p.name.toLowerCase().includes(q)
  );
}

export default function InteractiveItalyMap() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [modalUni, setModalUni] = useState(null);

  // Apply filters across all universities
  const filteredUniversities = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return allUniversities.filter((u) => {
      if (filters.type !== "all" && u.type !== filters.type) return false;
      if (filters.city !== "all" && u.city !== filters.city) return false;
      if (q) {
        const inName =
          u.name?.toLowerCase().includes(q) ||
          u.nameEn?.toLowerCase().includes(q) ||
          u.shortName?.toLowerCase?.().includes(q) ||
          u.city?.toLowerCase().includes(q);
        const inProgram =
          programMatchesQuery(u.bachelorPrograms, q) ||
          programMatchesQuery(u.masterPrograms, q);
        if (!inName && !inProgram) return false;
      }
      // education level filter currently affects which programs are displayed,
      // not which universities match (since program data is mostly empty).
      return true;
    });
  }, [filters]);

  // Per-region counts and dimming sets
  const { regionCounts, dimmedRegionIds } = useMemo(() => {
    const counts = {};
    for (const u of filteredUniversities) {
      counts[u.regionId] = (counts[u.regionId] || 0) + 1;
    }
    const dimmed = new Set(
      regions.filter((r) => !counts[r.id]).map((r) => r.id)
    );
    return { regionCounts: counts, dimmedRegionIds: dimmed };
  }, [filteredUniversities]);

  const selectedRegion = selectedRegionId ? regionsById[selectedRegionId] : null;
  const universitiesInSelectedRegion = useMemo(() => {
    if (!selectedRegionId) return [];
    return filteredUniversities.filter((u) => u.regionId === selectedRegionId);
  }, [selectedRegionId, filteredUniversities]);

  const onRegionClick = (regionId) => {
    setSelectedRegionId(regionId);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // On mobile, scroll to panel
      setTimeout(() => {
        document.getElementById("region-panel-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  return (
    <div className="space-y-8">
      <FilterBar
        value={filters}
        onChange={setFilters}
        cities={allCities}
        resultCount={filteredUniversities.length}
        totalCount={allUniversities.length}
      />

      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="md:col-span-7" data-testid="italy-map-container">
          <div className="border border-[#0F1B2D]/10 bg-[#F7F5F0] p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="overline">İnteraktif Harita</div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-[#5A5A5A]">
                Bölgeye tıklayın
              </div>
            </div>
            <ItalyMap
              onRegionClick={onRegionClick}
              selectedRegionId={selectedRegionId}
              regionCounts={regionCounts}
              dimmedRegionIds={dimmedRegionIds}
            />
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] tracking-[0.06em] text-[#5A5A5A]">
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-[#E9E2D5] border border-[#0F1B2D]/30" />
                Üniversite bulunan bölge
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-[#C75B39]" />
                Seçili bölge
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-[#EFEAE0] border border-[#0F1B2D]/15 opacity-60" />
                Filtreye uymayan
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 min-h-[400px]" id="region-panel-anchor">
          {selectedRegion ? (
            <RegionPanel
              region={selectedRegion}
              universities={universitiesInSelectedRegion}
              totalUniversitiesInRegion={(regionsById[selectedRegionId]?.universities || []).length}
              onClose={() => setSelectedRegionId(null)}
              onUniversityClick={(u) => setModalUni(u)}
            />
          ) : (
            <div className="border border-dashed border-[#0F1B2D]/15 p-8 md:p-10 h-full">
              <div className="overline">Nasıl kullanılır</div>
              <h4 className="mt-4 font-serif text-2xl md:text-3xl text-[#0F1B2D] leading-tight">
                Bir bölge seçin, üniversiteleri keşfedin.
              </h4>
              <p className="mt-5 text-[14.5px] text-[#5A5A5A] leading-relaxed">
                Haritadan bir İtalya bölgesine tıklayın. Bölgedeki üniversiteler ve İngilizce
                programları detaylı şekilde açılır. Üst kısımdan eğitim seviyesi, üniversite tipi,
                şehir veya program adı üzerinden filtreleyebilirsiniz.
              </p>
              <ul className="mt-6 space-y-3 text-[13.5px] text-[#0F1B2D]">
                <li className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-[#C75B39]">01</span>
                  <span>Filtre çubuğu ile aramanızı daraltın.</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-[#C75B39]">02</span>
                  <span>İlgilendiğiniz bölgeye tıklayın.</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-[#C75B39]">03</span>
                  <span>Üniversite kartına tıklayarak programları görün.</span>
                </li>
              </ul>
              <p className="mt-8 text-[11px] tracking-[0.18em] uppercase text-[#5A5A5A]">
                Veriler düzenli olarak güncellenmektedir.
              </p>
            </div>
          )}
        </div>
      </div>

      <UniversityModal
        open={!!modalUni}
        university={modalUni}
        onClose={() => setModalUni(null)}
        levelFilter={filters.level}
      />
    </div>
  );
}
