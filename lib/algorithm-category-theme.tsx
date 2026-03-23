import {
  ChecklistIcon,
  CodeSquareIcon,
  OrganizationIcon,
  ProjectIcon,
  PulseIcon,
  ReplyIcon,
  SearchIcon,
  ShieldCheckIcon,
  StackIcon,
} from "@primer/octicons-react";
import type { JSX } from "react";

type CategoryVisual = {
  displayName: string;
  icon: JSX.Element;
  iconWrap: string;
  badge: string;
  cardAccent: string;
  chevronWrap: string;
  cardHover: string;
  sidebarHeading: string;
  sidebarActive: string;
  sidebarHover: string;
};

const DEFAULT_VISUAL: CategoryVisual = {
  displayName: "Altele",
  icon: <ProjectIcon size={14} />,
  iconWrap: "bg-slate-500 text-white shadow-slate-100",
  badge: "bg-slate-100 text-slate-700",
  cardAccent: "group-hover:text-slate-700",
  chevronWrap: "group-hover:bg-slate-100 group-hover:text-slate-700",
  cardHover: "hover:border-slate-300 hover:shadow-slate-100/40",
  sidebarHeading: "text-slate-600",
  sidebarActive: "bg-slate-100 text-slate-700 ring-slate-200",
  sidebarHover: "hover:bg-slate-100 hover:text-slate-800",
};

const VISUALS: Record<string, CategoryVisual> = {
  backtracking: {
    displayName: "Backtracking",
    icon: <ReplyIcon size={14} />,
    iconWrap: "bg-amber-500 text-white shadow-amber-100",
    badge: "bg-amber-100 text-amber-800",
    cardAccent: "group-hover:text-amber-600",
    chevronWrap: "group-hover:bg-amber-50 group-hover:text-amber-600",
    cardHover: "hover:border-amber-200 hover:shadow-amber-100/40",
    sidebarHeading: "text-amber-700",
    sidebarActive: "bg-amber-50 text-amber-700 ring-amber-200",
    sidebarHover: "hover:bg-amber-50/70 hover:text-amber-700",
  },
  sortare: {
    displayName: "Sortare",
    icon: <StackIcon size={14} />,
    iconWrap: "bg-rose-500 text-white shadow-rose-100",
    badge: "bg-rose-100 text-rose-800",
    cardAccent: "group-hover:text-rose-600",
    chevronWrap: "group-hover:bg-rose-50 group-hover:text-rose-600",
    cardHover: "hover:border-rose-200 hover:shadow-rose-100/40",
    sidebarHeading: "text-rose-600",
    sidebarActive: "bg-rose-50 text-rose-700 ring-rose-200",
    sidebarHover: "hover:bg-rose-50/70 hover:text-rose-700",
  },
  cautare: {
    displayName: "Cautare",
    icon: <SearchIcon size={14} />,
    iconWrap: "bg-cyan-500 text-white shadow-cyan-100",
    badge: "bg-cyan-100 text-cyan-800",
    cardAccent: "group-hover:text-cyan-600",
    chevronWrap: "group-hover:bg-cyan-50 group-hover:text-cyan-600",
    cardHover: "hover:border-cyan-200 hover:shadow-cyan-100/40",
    sidebarHeading: "text-cyan-600",
    sidebarActive: "bg-cyan-50 text-cyan-700 ring-cyan-200",
    sidebarHover: "hover:bg-cyan-50/70 hover:text-cyan-700",
  },
  grafuri: {
    displayName: "Grafuri",
    icon: <OrganizationIcon size={14} />,
    iconWrap: "bg-indigo-500 text-white shadow-indigo-100",
    badge: "bg-indigo-100 text-indigo-800",
    cardAccent: "group-hover:text-indigo-600",
    chevronWrap: "group-hover:bg-indigo-50 group-hover:text-indigo-600",
    cardHover: "hover:border-indigo-200 hover:shadow-indigo-100/40",
    sidebarHeading: "text-indigo-600",
    sidebarActive: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    sidebarHover: "hover:bg-indigo-50/70 hover:text-indigo-700",
  },
  matematica: {
    displayName: "Matematica",
    icon: <PulseIcon size={14} />,
    iconWrap: "bg-lime-500 text-white shadow-lime-100",
    badge: "bg-lime-100 text-lime-800",
    cardAccent: "group-hover:text-lime-700",
    chevronWrap: "group-hover:bg-lime-50 group-hover:text-lime-700",
    cardHover: "hover:border-lime-200 hover:shadow-lime-100/40",
    sidebarHeading: "text-lime-700",
    sidebarActive: "bg-lime-50 text-lime-700 ring-lime-200",
    sidebarHover: "hover:bg-lime-50/70 hover:text-lime-700",
  },
  programare_dinamica: {
    displayName: "Programare Dinamica",
    icon: <CodeSquareIcon size={14} />,
    iconWrap: "bg-emerald-500 text-white shadow-emerald-100",
    badge: "bg-emerald-100 text-emerald-800",
    cardAccent: "group-hover:text-emerald-600",
    chevronWrap: "group-hover:bg-emerald-50 group-hover:text-emerald-600",
    cardHover: "hover:border-emerald-200 hover:shadow-emerald-100/40",
    sidebarHeading: "text-emerald-700",
    sidebarActive: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    sidebarHover: "hover:bg-emerald-50/70 hover:text-emerald-700",
  },
  cifrare: {
    displayName: "Criptografie",
    icon: <ShieldCheckIcon size={14} />,
    iconWrap: "bg-fuchsia-500 text-white shadow-fuchsia-100",
    badge: "bg-fuchsia-100 text-fuchsia-800",
    cardAccent: "group-hover:text-fuchsia-600",
    chevronWrap: "group-hover:bg-fuchsia-50 group-hover:text-fuchsia-600",
    cardHover: "hover:border-fuchsia-200 hover:shadow-fuchsia-100/40",
    sidebarHeading: "text-fuchsia-700",
    sidebarActive: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
    sidebarHover: "hover:bg-fuchsia-50/70 hover:text-fuchsia-700",
  },
  structuri_de_date: {
    displayName: "Structuri de Date",
    icon: <ChecklistIcon size={14} />,
    iconWrap: "bg-sky-500 text-white shadow-sky-100",
    badge: "bg-sky-100 text-sky-800",
    cardAccent: "group-hover:text-sky-600",
    chevronWrap: "group-hover:bg-sky-50 group-hover:text-sky-600",
    cardHover: "hover:border-sky-200 hover:shadow-sky-100/40",
    sidebarHeading: "text-sky-700",
    sidebarActive: "bg-sky-50 text-sky-700 ring-sky-200",
    sidebarHover: "hover:bg-sky-50/70 hover:text-sky-700",
  },
  manipulare_de_biti: {
    displayName: "Manipulare de Biti",
    icon: <ProjectIcon size={14} />,
    iconWrap: "bg-violet-500 text-white shadow-violet-100",
    badge: "bg-violet-100 text-violet-800",
    cardAccent: "group-hover:text-violet-600",
    chevronWrap: "group-hover:bg-violet-50 group-hover:text-violet-600",
    cardHover: "hover:border-violet-200 hover:shadow-violet-100/40",
    sidebarHeading: "text-violet-700",
    sidebarActive: "bg-violet-50 text-violet-700 ring-violet-200",
    sidebarHover: "hover:bg-violet-50/70 hover:text-violet-700",
  },
  diverse: {
    displayName: "Diverse",
    icon: <ProjectIcon size={14} />,
    iconWrap: "bg-orange-500 text-white shadow-orange-100",
    badge: "bg-orange-100 text-orange-800",
    cardAccent: "group-hover:text-orange-600",
    chevronWrap: "group-hover:bg-orange-50 group-hover:text-orange-600",
    cardHover: "hover:border-orange-200 hover:shadow-orange-100/40",
    sidebarHeading: "text-orange-700",
    sidebarActive: "bg-orange-50 text-orange-700 ring-orange-200",
    sidebarHover: "hover:bg-orange-50/70 hover:text-orange-700",
  },
};

const ALIASES: Record<string, string> = {
  sorts: "sortare",
  search: "cautare",
  graph: "grafuri",
  maths: "matematica",
  dynamic_programming: "programare_dinamica",
  ciphers: "cifrare",
  data_structures: "structuri_de_date",
  bit_manipulation: "manipulare_de_biti",
  other: "diverse",
  altele: "diverse",
  "căutare": "cautare",
  "matematică": "matematica",
  "manipulare_de_biți": "manipulare_de_biti",
};

function stripDiacritics(value: string) {
  return value
    .replace(/[ăâ]/g, "a")
    .replace(/[î]/g, "i")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .replace(/[ĂÂ]/g, "A")
    .replace(/[Î]/g, "I")
    .replace(/[ȘŞ]/g, "S")
    .replace(/[ȚŢ]/g, "T");
}

export function normalizeCategoryKey(category: string) {
  const raw = stripDiacritics(category || "")
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, "_");

  return ALIASES[raw] || raw;
}

export function getCategoryVisual(category: string) {
  const key = normalizeCategoryKey(category);
  return VISUALS[key] || DEFAULT_VISUAL;
}

export function getCategoryDisplayName(category: string) {
  return getCategoryVisual(category).displayName;
}
