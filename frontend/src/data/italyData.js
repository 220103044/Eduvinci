// Single data source for the interactive Italy map.
// Region IDs are sourced from /app/frontend/src/data/eduvinci_italy_seed.json
// and matched to the ISTAT region codes used in /public/maps/italy-regions.topo.json.

import seed from "./eduvinci_italy_seed.json";

export const italySeed = seed;
export const regions = seed.regions || [];

// ISTAT numeric codes used by the public TopoJSON → our seed region ids.
export const REGION_ID_BY_ISTAT = {
  1: "piemonte",
  2: "valledaosta",
  3: "lombardia",
  4: "trentinoaltoadige",
  5: "veneto",
  6: "friuliveneziagiulia",
  7: "liguria",
  8: "emiliaromagna",
  9: "toscana",
  10: "umbria",
  11: "marche",
  12: "lazio",
  13: "abruzzo",
  14: "molise",
  15: "campania",
  16: "puglia",
  17: "basilicata",
  18: "calabria",
  19: "sicilia",
  20: "sardegna",
};

export const regionsById = Object.fromEntries(regions.map((r) => [r.id, r]));

export const allUniversities = regions.flatMap((r) =>
  (r.universities || []).map((u) => ({ ...u, regionId: r.id, regionName: r.name }))
);

export const allCities = Array.from(new Set(allUniversities.map((u) => u.city))).sort((a, b) => a.localeCompare(b));

const PLACEHOLDER_VALUES = new Set(["güncellenecek", "Güncellenecek", "GÜNCELLENECEK"]);

export function isPlaceholder(v) {
  if (v === null || v === undefined) return true;
  if (typeof v === "string" && PLACEHOLDER_VALUES.has(v.trim())) return true;
  if (Array.isArray(v)) {
    if (v.length === 0) return true;
    return v.every((x) => isPlaceholder(x));
  }
  return false;
}

export function formatNumber(v) {
  if (isPlaceholder(v)) return "—";
  if (typeof v === "number") return v.toLocaleString("tr-TR");
  return v;
}

export function universityTypeLabel(type, lang = "tr") {
  const map = {
    tr: { state: "Devlet", private: "Özel", special: "Özel Statü", online: "Online" },
    en: { state: "State", private: "Private", special: "Special", online: "Online" },
  };
  return map[lang]?.[type] || (lang === "tr" ? "—" : "—");
}
