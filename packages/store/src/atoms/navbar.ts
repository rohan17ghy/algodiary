import { atom } from "recoil";

export const activeSectionAtom = atom({
  key: "activeSection",
  default: "dashboard",
});

export const activeTabAtom = atom({
  key: "activeTab",
  default: "all",
});

export const isNavOpenAtom = atom({
  key: "isNavOpen",
  default: false,
});

export const intendedSectionAtom = atom({
  key: "intendedSection",
  default: "",
});
