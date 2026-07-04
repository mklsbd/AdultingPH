import { ChecklistState, VaultDocument, UserProfile } from "./types";

const CHECKLIST_KEY = "adultingph:checklist";
const VAULT_KEY = "adultingph:vault";
const PROFILE_KEY = "adultingph:profile";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getChecklist(): ChecklistState {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(CHECKLIST_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setChecklistItem(agencyId: string, done: boolean): ChecklistState {
  const current = getChecklist();
  const updated = { ...current, [agencyId]: done };
  window.localStorage.setItem(CHECKLIST_KEY, JSON.stringify(updated));
  return updated;
}

export function getVaultDocuments(): VaultDocument[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(VAULT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addVaultDocument(doc: VaultDocument): VaultDocument[] {
  const current = getVaultDocuments();
  const updated = [doc, ...current];
  window.localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteVaultDocument(id: string): VaultDocument[] {
  const current = getVaultDocuments();
  const updated = current.filter((d) => d.id !== id);
  window.localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
  return updated;
}

export function getProfile(): UserProfile | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearAllLocalData(): void {
  window.localStorage.removeItem(CHECKLIST_KEY);
  window.localStorage.removeItem(VAULT_KEY);
  window.localStorage.removeItem(PROFILE_KEY);
}
