import { atom } from "recoil";

export const isFormDirtyAtom = atom({
  key: "isFormDirty",
  default: false,
});

export const showLeaveConfirmDialogAtom = atom({
  key: "showLeaveConfirmDialog",
  default: false,
});

export const showDeleteConfirmAtom = atom({
  key: "showDeleteConfirm",
  default: false,
});
