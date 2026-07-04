export type AgencyId = "sss" | "nbi" | "philhealth" | "pagibig" | "bir";

export interface AgencyStep {
  step: number;
  text: string;
}

export interface Agency {
  id: AgencyId;
  name: string;
  fullName: string;
  description: string;
  url: string;
  colorFrom: string;
  colorTo: string;
  steps: AgencyStep[];
  requirements: string[];
  freeUnderRA11261: boolean;
}

export interface ChecklistState {
  [key: string]: boolean;
}

export interface VaultDocument {
  id: string;
  agencyId: AgencyId | "other";
  label: string;
  fileName: string;
  mimeType: string;
  dataUrl: string;
  uploadedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  region: string;
  province: string;
  city: string;
  onboardingComplete: boolean;
}

export interface RegionOffice {
  agencyId: AgencyId;
  officeName: string;
  address: string;
}

export interface PHLocation {
  region: string;
  provinces: {
    name: string;
    cities: string[];
  }[];
}
