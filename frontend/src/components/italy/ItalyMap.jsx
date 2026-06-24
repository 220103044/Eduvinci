import React, { useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature as topoFeature } from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import { REGION_ID_BY_ISTAT } from "../../data/italyData";

/**
 * Italy regions SVG map. Stateless — emits region id callbacks.
 *
 * Props:
 *  - onRegionClick(regionId)
 *  - selectedRegionId
 *  - regionCounts: { [regionId]: number }  // university match count after filters
 *  - dimmedRegionIds: Set<string>          // regions to dim because 0 matches
 *  - hoveredRegionId / setHoveredRegionId
 */
export default function ItalyMap({
  onRegionClick,
  selectedRegionId,
  regionCounts = {},
  dimmedRegionIds,
  onHover,
}) {
  const [topology, setTopology] = useState(null);
  const [error, setError] = useState(null);
  const wrapRef = useRef(null);
  const [hover, setHover] = useState({ id: null, x: 0, y: 0, name: "", count: 0 });

  useEffect(() => {
    let active = true;
    fetch("/maps/italy-regions.topo.json")
      .then((r) => r.json())
      .then((data) => { if (active) setTopology(data); })
      .catch((e) => { if (active) setError(e.message); });
    return () => { active = false; };
  }, []);

  const { features, pathFor, width, height } = useMemo(() => {
    if (!topology) return { features: [], pathFor: () => "", width: 600, height: 720 };
    const fc = topoFeature(topology, topology.objects.regions);
    const W = 600;
    const H = 720;
    const projection = geoMercator().fitSize([W - 24, H - 24], fc);
    const path = geoPath(projection);
    return { features: fc.features, pathFor: path, width: W, height: H };
  }, [topology]);

  const onMove = (e, id, name, count) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHover({ id, x: e.clientX - rect.left, y: e.clientY - rect.top, name, count });
    onHover?.(id);
  };
  const onLeave = () => { setHover({ id: null, x: 0, y: 0, name: "", count: 0 }); onHover?.(null); };

  return (
    <div ref={wrapRef} className="relative w-full">
      {error && (
        <div className="text-[12px] text-[#5A5A5A] p-3 border border-[#0F1B2D]/10">Harita yüklenemedi.</div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="İtalya bölge haritası"
        className="w-full h-auto select-none"
      >
        <defs>
          <filter id="ev-region-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F1B2D" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* light backdrop */}
        <rect x="0" y="0" width={width} height={height} fill="transparent" />

        {features.map((f) => {
          const istat = f.properties?.reg_istat_code_num;
          const regionId = REGION_ID_BY_ISTAT[istat];
          if (!regionId) return null;
          const isSelected = selectedRegionId === regionId;
          const isDimmed = dimmedRegionIds?.has(regionId);
          const count = regionCounts[regionId] ?? 0;

          let fill = "#E9E2D5";
          let stroke = "rgba(15,27,45,0.35)";
          let opacity = 1;
          if (isDimmed) {
            fill = "#EFEAE0";
            opacity = 0.55;
          }
          if (hover.id === regionId) {
            fill = "#F2C7B5";
          }
          if (isSelected) {
            fill = "#C75B39";
            stroke = "#0F1B2D";
          }

          return (
            <path
              key={regionId}
              d={pathFor(f)}
              fill={fill}
              stroke={stroke}
              strokeWidth={isSelected ? 1.4 : 0.8}
              opacity={opacity}
              style={{ cursor: "pointer", transition: "fill 200ms ease, opacity 200ms ease" }}
              role="button"
              tabIndex={0}
              aria-label={`${f.properties.reg_name} bölgesi, ${count} üniversite`}
              data-testid={`italy-region-${regionId}`}
              onMouseMove={(e) => onMove(e, regionId, f.properties.reg_name, count)}
              onMouseLeave={onLeave}
              onClick={() => onRegionClick?.(regionId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onRegionClick?.(regionId);
                }
              }}
              filter={isSelected ? "url(#ev-region-shadow)" : undefined}
            />
          );
        })}
      </svg>

      <AnimatePresence>
        {hover.id && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-10 px-3 py-2 bg-[#0F1B2D] text-[#F7F5F0] text-[12px] tracking-wide rounded-sm shadow-lg"
            style={{ left: hover.x + 14, top: hover.y + 14 }}
          >
            <div className="font-medium uppercase tracking-[0.12em] text-[11px]">{hover.name}</div>
            <div className="text-[11px] text-[#F7F5F0]/75">
              {hover.count} üniversite
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
