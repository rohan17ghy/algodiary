"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  accountsAtom,
  accountToDeleteAtom,
  activeSectionAtom,
  intendedSectionAtom,
  isNavOpenAtom,
  showAddAccountAtom,
  showDeleteConfirmAtom,
  showLeaveConfirmDialogAtom,
} from "@algodiary/store";
import { useRecoilState } from "recoil";
import { isFormDirtyAtom } from "@algodiary/store";

export const Alert = () => {
  const [showLeaveConfirmDialog, setShowLeaveConfirmDialog] = useRecoilState(
    showLeaveConfirmDialogAtom
  );
  const [intendedSection, setIntendedSection] =
    useRecoilState(intendedSectionAtom);
  const [activeSection, setActiveSection] = useRecoilState(activeSectionAtom);
  const [showAddAccount, setShowAddAccount] =
    useRecoilState(showAddAccountAtom);
  const [isFormDirty, setIsFormDirty] = useRecoilState(isFormDirtyAtom);
  const [isNavOpen, setIsNavOpen] = useRecoilState(isNavOpenAtom);
  const [showDeleteConfirm, setShowDeleteConfirm] = useRecoilState(
    showDeleteConfirmAtom
  );
  const [accountToDelete, setAccountToDelete] = useRecoilState<number | null>(
    accountToDeleteAtom
  );
  const [accounts, setAccounts] = useRecoilState(accountsAtom);

  const handleConfirmNavigation = () => {
    setShowLeaveConfirmDialog(false);
    setActiveSection(intendedSection);
    setIsNavOpen(false);
    if (intendedSection === "accounts") {
      setShowAddAccount(false);
    }
    setIsFormDirty(false);
  };

  const confirmDeleteAccount = () => {
    if (accountToDelete) {
      setAccounts(accounts.filter((account) => account.id !== accountToDelete));
      setShowDeleteConfirm(false);
      setAccountToDelete(null);
    }
  };

  return (
    <>
      <AlertDialog
        open={showLeaveConfirmDialog}
        onOpenChange={setShowLeaveConfirmDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes in the Add Account form. Are you sure you
              want to leave? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLeaveConfirmDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmNavigation}>
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this account? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAccount}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
