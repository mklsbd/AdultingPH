import { Agency } from "@/lib/types";

export const agencies: Agency[] = [
  {
    id: "sss",
    name: "SSS",
    fullName: "Social Security System",
    description:
      "Your social security number covers retirement, sickness, disability, and death benefits. Most employers require it before your first day.",
    url: "https://member.sss.gov.ph/",
    colorFrom: "#1F3A93",
    colorTo: "#3A5FCD",
    freeUnderRA11261: true,
    requirements: [
      "One valid government ID (PSA birth certificate accepted for first-timers)",
      "Active mobile number for OTP verification",
      "Personal email address",
    ],
    steps: [
      { step: 1, text: "Open the My.SSS portal and choose the SS Number application option for individuals who don't have one yet." },
      { step: 2, text: "Fill in your personal details exactly as they appear on your ID, then submit your registrant record for verification." },
      { step: 3, text: "Check your email for the confirmation link and click it to continue the SS number application." },
      { step: 4, text: "Once approved, note your SS number and use it to create your full My.SSS online account." },
      { step: 5, text: "First-time job seekers can present a Barangay Certificate of Indigency or First Time Job Seeker certificate to process this for free under RA 11261." },
    ],
  },
  {
    id: "nbi",
    name: "NBI Clearance",
    fullName: "National Bureau of Investigation Clearance",
    description:
      "A clearance confirming you have no pending criminal record. Almost every employer in the Philippines asks for this before onboarding.",
    url: "https://clearance.nbi.gov.ph/",
    colorFrom: "#7A1F2B",
    colorTo: "#B23A48",
    freeUnderRA11261: true,
    requirements: [
      "One valid government-issued ID",
      "Barangay Certification (for the free first-time job seeker lane)",
      "Reference number from your online application",
    ],
    steps: [
      { step: 1, text: "Create an account on the NBI Clearance portal using your own email address and mobile number." },
      { step: 2, text: "Complete your personal information carefully — it must match your valid ID exactly." },
      { step: 3, text: "Select 'Employment' as your purpose and choose your preferred NBI branch and appointment slot." },
      { step: 4, text: "Bring your Barangay Certificate and mention RA 11261 at the branch to avail of the fee waiver as a first-time job seeker." },
      { step: 5, text: "Proceed with biometrics and photo capture on your appointment date, then wait for release or same-day clearance if there's no hit." },
    ],
  },
  {
    id: "philhealth",
    name: "PhilHealth",
    fullName: "Philippine Health Insurance Corporation",
    description:
      "National health coverage that helps pay for hospitalization and selected outpatient services for you and your dependents.",
    url: "https://eregister.philhealth.gov.ph/",
    colorFrom: "#0C5E4A",
    colorTo: "#1E9E77",
    freeUnderRA11261: true,
    requirements: [
      "PhilHealth Member Registration Form (PMRF)",
      "One valid government ID",
      "ID photo (digital copy for online registration)",
    ],
    steps: [
      { step: 1, text: "Go to the PhilHealth Electronic Registration System and select new member registration." },
      { step: 2, text: "Fill out the Personal Details, Contact Details, and Dependents sections of the online PMRF." },
      { step: 3, text: "Upload a clear photo of a valid ID and submit the form for verification." },
      { step: 4, text: "Wait for your PhilHealth Identification Number (PIN) to arrive by email, typically within a few working days." },
      { step: 5, text: "Registration itself is free for everyone — first-time job seekers simply present their PIN confirmation to their employer." },
    ],
  },
  {
    id: "pagibig",
    name: "Pag-IBIG / HDMF",
    fullName: "Home Development Mutual Fund",
    description:
      "A savings and housing-loan program. Employers remit a monthly contribution on your behalf once you're hired.",
    url: "https://www.pagibigfundservices.com/",
    colorFrom: "#8A4B00",
    colorTo: "#D97706",
    freeUnderRA11261: true,
    requirements: [
      "One valid government ID",
      "Active email address",
      "Mobile number for OTP verification",
    ],
    steps: [
      { step: 1, text: "Open Virtual Pag-IBIG and choose 'Create and Activate your Account Online' under registration." },
      { step: 2, text: "Provide your personal details and a valid ID, then verify your mobile number through the OTP sent to you." },
      { step: 3, text: "Set your security questions and password once your account is verified." },
      { step: 4, text: "Log in to view your Pag-IBIG Membership ID (MID) number — this is the number you give to your future employer." },
      { step: 5, text: "Membership registration carries no fee, so first-time job seekers can complete this step at no cost." },
    ],
  },
  {
    id: "bir",
    name: "BIR (TIN)",
    fullName: "Bureau of Internal Revenue — Tax Identification Number",
    description:
      "Your TIN is required for payroll, tax withholding, and most government or bank transactions once you start earning.",
    url: "https://orus.bir.gov.ph/",
    colorFrom: "#3B2E7A",
    colorTo: "#6A4FD1",
    freeUnderRA11261: true,
    requirements: [
      "One valid government-issued ID",
      "Barangay Certification indicating first-time job seeker status",
      "Accomplished BIR Form 1902 (for employees)",
    ],
    steps: [
      { step: 1, text: "Access ORUS (Online Registration and Update System) and create an account with a permanent, valid email address." },
      { step: 2, text: "Choose new registration as an individual earning purely compensation income." },
      { step: 3, text: "Complete your details and upload the required documents, including your Barangay Certificate for the RA 11261 exemption." },
      { step: 4, text: "Submit the application and wait for your Certificate of Registration and TIN confirmation." },
      { step: 5, text: "Under RA 11261, first-time job seekers pay no fee for their initial TIN issuance." },
    ],
  },
];

export const getAgencyById = (id: string) =>
  agencies.find((a) => a.id === id);
