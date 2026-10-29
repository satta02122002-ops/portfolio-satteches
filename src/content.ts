/**
 * Single source of truth for every word and number on the site.
 * Edit this file to change copy; components only render what is here.
 * Every number is taken from docs/BLUEPRINT.md (which is taken from the CV).
 */

export type Pillar = "freight" | "warehouse" | "sap" | "customs";

export const site = {
  url: "https://satteches.com",
  name: "Sattanathan Chandran",
  initials: "SC",
  title: "Sattanathan Chandran | Logistics Coordinator, Dubai (Freight, Customs, SAP)",
  description:
    "Logistics coordinator in JAFZA, Dubai. 99.8% inventory accuracy, zero customs holds on Mirsal 2, SAP S/4HANA, and self-built automation. Open to senior logistics roles.",
  role: "Logistics Coordinator",
  employer: "ISS Global Forwarding UAE LLC",
  location: "JAFZA, Dubai",
  target: "Open to senior logistics roles in the UAE",
  /** Date the "zero customs holds" claim was last verified. Update when needed. */
  asOf: "Oct 2026",
  replyTime: "within one working day",
  cvPdf: "/Sattanathan-Chandran-CV.pdf",
  photo: "/images/sattanathan-chandran.webp",
  keywords: [
    "logistics coordinator Dubai",
    "freight forwarding JAFZA",
    "Mirsal 2 customs clearance",
    "SAP MM WM inventory controller",
    "3PL warehouse operations UAE",
  ],
};

export const contact = {
  email: "sattanathan.chandran@gmail.com",
  linkedin: "https://www.linkedin.com/in/sat-logistics",
  linkedinLabel: "linkedin.com/in/sat-logistics",
  github: "https://github.com/satta02122002-ops",
  githubLabel: "satta02122002-ops",
  // TODO: add your WhatsApp number in international format without spaces or "+", e.g. "9715XXXXXXXX".
  // While empty, every WhatsApp button is hidden.
  whatsapp: "",
};

export const whatsappLink = (text = "Hi Sattanathan, I saw your portfolio at satteches.com.") =>
  contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}` : null;

export const waybill = {
  full: "SATTANATHAN CHANDRAN · DXB / JAFZA · STATUS: OPEN TO SENIOR LOGISTICS ROLES",
  short: "DXB / JAFZA · OPEN TO SENIOR ROLES",
};

export const hero = {
  eyebrow: "Logistics Coordinator · JAFZA, Dubai",
  h1: "I make freight, customs and warehouse operations faster and more accurate.",
  sub: "6 years across freight forwarding, 3PL warehousing and UAE customs clearance, with SAP S/4HANA and self-built automation. Open to senior logistics roles in the UAE.",
  trust: ["Mirsal 2", "SAP S/4HANA MM & WM", "JAFZA", "FMCG, retail/fashion, e-commerce"],
  headline: [
    { value: "99.8%", label: "inventory accuracy" },
    { value: "3 hrs → 20 min", label: "daily stock clearance" },
    { value: "Zero", label: "customs holds" },
  ],
};

export type Proof = {
  /** Numeric part animated by the counter; null for non-numeric values. */
  to: number | null;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  display: string;
  label: string;
  stamp: "ACCURATE" | "ON TIME" | "CLEARED";
  pillars: Pillar[];
};

export const proof: Proof[] = [
  {
    to: 99.8,
    decimals: 1,
    suffix: "%",
    display: "99.8%",
    label: "Inventory accuracy by count and value (2023). Management discontinued the wall-to-wall count.",
    stamp: "ACCURATE",
    pillars: ["warehouse", "sap"],
  },
  {
    to: 20,
    prefix: "3 hrs → ",
    suffix: " min",
    display: "3 hrs → 20 min",
    label: "Daily negative-stock clearance, 89% faster, with an Excel VBA macro.",
    stamp: "ON TIME",
    pillars: ["sap", "warehouse"],
  },
  {
    to: null,
    display: "Zero",
    label: `Customs-hold incidents on Mirsal 2 clearances, as of ${site.asOf}.`,
    stamp: "CLEARED",
    pillars: ["customs", "freight"],
  },
  {
    to: 99,
    suffix: "%+",
    display: "99%+",
    label: "WMS-to-physical stock accuracy, with 15% fewer discrepancies.",
    stamp: "ACCURATE",
    pillars: ["warehouse", "freight"],
  },
  {
    to: 98,
    suffix: "%",
    display: "98%",
    label: "On-time material delivery to production cells.",
    stamp: "ON TIME",
    pillars: ["warehouse"],
  },
  {
    to: 20,
    suffix: "%",
    display: "20%",
    label: "Picking time saved through a 5S location redesign.",
    stamp: "ON TIME",
    pillars: ["warehouse"],
  },
];

export const pillars = [
  {
    title: "UAE freight and customs",
    body: "Sea, air and road coordination, Mirsal 2 clearances, zero customs holds to date.",
  },
  {
    title: "Warehouse and inventory accuracy",
    body: "99.8% inventory accuracy, 99%+ WMS-to-physical accuracy, SAP S/4HANA MM and WM.",
  },
  {
    title: "Automation mindset",
    body: "Excel VBA, Power BI and Power Automate, self-taught, with two internal awards for efficiency gains.",
  },
];

export const about = {
  heading: "Accurate on the floor, compliant at the border, always looking for a faster way.",
  body: "I'm a logistics professional based in JAFZA, Dubai, with 6 years across freight forwarding, 3PL warehouse operations, UAE customs clearance and manufacturing material flow. I started on the floor of a rail manufacturer, where accuracy and speed came from process, not luck. Today I coordinate sea, air and road freight for FMCG, retail/fashion and e-commerce clients. I'm self-taught in Excel VBA, Power BI and Power Automate, and I use them to remove manual work. I'm looking for a senior role where accuracy, speed and smart automation drive results.",
  facts: [
    { k: "Languages", v: "English, Tamil, Malayalam, Hindi" },
    { k: "Based in", v: "Dubai, UAE" },
    { k: "Visa", v: "UAE resident visa (active)" },
    { k: "Education", v: "Diploma in Mechanical Engineering, First Class with Distinction" },
  ],
};

export type Role = {
  id: string;
  code: string;
  title: string;
  company: string;
  place: string;
  dates: string;
  summary?: string;
  bullets: string[];
  current?: boolean;
};

export const experience: Role[] = [
  {
    id: "iss",
    code: "DXB · FREIGHT",
    title: "Logistics Coordinator",
    company: "ISS Global Forwarding UAE LLC",
    place: "JAFZA, Dubai",
    dates: "Mar 2024 – present",
    current: true,
    summary:
      "Freight forwarding and contract-logistics provider: sea, air, land, customs clearance, warehousing and value-added services.",
    bullets: [
      "Coordinate end-to-end sea, air and road shipments for regional and overseas clients in FMCG, retail/fashion and e-commerce, working daily with customers, vendors, carriers and internal teams.",
      "Clear import and export cargo through Mirsal 2 (commercial invoices, packing lists, Bills of Entry, Certificates of Origin, ASN / GRN), with zero customs-hold incidents to date.",
      "Negotiate rates with shipping lines, airlines and trucking vendors. Lead weekly reviews with brokers, carriers and warehouse teams, and act as the escalation point for exceptions and demurrage risk.",
      "Run value-added services (picking, packing, sorting, labelling, kitting) with FIFO batch allocation, keeping WMS and physical stock aligned to 99%+ and cutting discrepancies by 15%.",
      "Built an Excel billing tracker for monthly storage and VAS invoices that improved accuracy and removed the month-end bottleneck.",
      "Fire Safety and Emergency First Aid Volunteer, supporting drills and emergency preparedness.",
    ],
  },
  {
    id: "alstom-sap",
    code: "CJB · SAP / INVENTORY",
    title: "SAP MM & WM Key User / Inventory Controller",
    company: "Alstom Transport India",
    place: "Coimbatore",
    dates: "Nov 2021 – Oct 2023",
    summary:
      "Global rolling-stock manufacturer: material flow for concurrent metro and rail projects, from goods receipt to kitting and line feeding.",
    bullets: [
      "Raised inventory accuracy from 99.5% (2022) to 99.8% (2023) through daily ABCD cycle counting, which led management to discontinue the wall-to-wall count.",
      "Automated daily negative-stock clearance with an Excel VBA macro built with the SAP team: about 3 hours down to 20 minutes (roughly 89%). Won the GSI Excellence Award.",
      "Managed material master data, bin allocation and storage locations in SAP S/4HANA for 12,000+ materials.",
      "Monitored negative-stock and COGI clearance and tracked productivity in Delmia Apriso and MES. Co-led weekly SQCD (Safety, Quality, Cost, Delivery) reviews with the Warehouse Manager and Production Leads.",
      "Led the “Lion Hearts” engagement programme as Team Leader (Jul to Oct 2023), covering 300+ employees across 13 teams, and trained new joiners on SAP transactions and warehouse SOPs.",
    ],
  },
  {
    id: "alstom-wh",
    code: "CJB · WAREHOUSE",
    title: "Warehouse Associate",
    company: "Alstom Transport India",
    place: "Coimbatore",
    dates: "Jul 2020 – Oct 2021",
    bullets: [
      "Delivered 98% on-time material supply to production cells through accurate picking lists, project-specific kitting and proactive shortage follow-up.",
      "Cut picking time by 20% by reorganising destination locations under 5S, earning the 5S Initiative Award.",
      "Held 99.5% inventory accuracy with cycle counting and 5-Why root-cause analysis.",
      "Handled receiving, put-away, staging, picking and kitting for sub-assembly line supply.",
    ],
  },
];

/** Final, open milestone on the route timeline. */
export const nextStop = {
  code: "NEXT · UAE",
  title: "Senior logistics role",
  body: "Freight forwarding, 3PL or contract logistics in the UAE.",
};

export type CaseStudy = {
  id: string;
  title: string;
  problem: string;
  action: string;
  result: string;
  tools: string[];
  stamp: Proof["stamp"];
  pillars: Pillar[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "negative-stock",
    title: "From 3 hours to 20 minutes: automating negative-stock clearance",
    problem: "Clearing negative stock in SAP took about 3 hours of manual work every day.",
    // TODO: add one line on how the macro works (what it reads and what it outputs).
    action: "Built an Excel VBA macro with the SAP team to automate the daily clearance.",
    result: "About 20 minutes per day, roughly 89% faster. Earned the GSI Excellence Award.",
    tools: ["Excel VBA", "SAP S/4HANA"],
    stamp: "ON TIME",
    pillars: ["sap", "warehouse"],
  },
  {
    id: "inventory-accuracy",
    title: "99.8% inventory accuracy without the wall-to-wall count",
    problem:
      "Inventory accuracy was 99.5% in 2022, and a full wall-to-wall count was still being used to verify stock.",
    // TODO: optionally add how A-class items were prioritised.
    action:
      "Ran daily ABCD cycle counting across 12,000+ materials, and managed material master data, bin allocation and storage locations in SAP S/4HANA.",
    result: "99.8% accuracy by count and value in 2023. Management discontinued the wall-to-wall count.",
    tools: ["SAP S/4HANA MM & WM", "ABCD classification", "Cycle counting"],
    stamp: "ACCURATE",
    pillars: ["warehouse", "sap"],
  },
  {
    id: "zero-holds",
    title: "Zero customs holds on Mirsal 2",
    problem: "Customs holds delay cargo, add demurrage risk and damage client trust.",
    // TODO: optionally add your own pre-submission checks (e.g. HS code and value consistency).
    action:
      "Prepare each clearance with commercial invoices, packing lists, Bills of Entry and Certificates of Origin, and run weekly reviews with brokers, carriers and the warehouse team.",
    result: `Zero customs-hold incidents on Mirsal 2 clearances, as of ${site.asOf}.`,
    tools: ["Mirsal 2", "HS Codes", "Incoterms 2020", "JAFZA procedures"],
    stamp: "CLEARED",
    pillars: ["customs", "freight"],
  },
  {
    id: "5s-picking",
    title: "20% faster picking with a 5S location redesign",
    problem: "Supplying production cells on time depended on fast, accurate picking.",
    action: "Reorganised destination locations under 5S and kept picking lists and project-specific kitting accurate.",
    result: "20% less picking time, 98% on-time material delivery to production cells, and the 5S Initiative Award.",
    tools: ["5S", "Kaizen", "Kitting", "5-Why root-cause analysis"],
    stamp: "ON TIME",
    pillars: ["warehouse"],
  },
];

export const skills: { group: string; pillars: Pillar[]; items: string[] }[] = [
  {
    group: "Freight and customs",
    pillars: ["freight", "customs"],
    items: [
      "Sea, air and road freight",
      "Mirsal 2",
      "Bill of Entry, COO, ASN / GRN",
      "HS Codes",
      "Incoterms 2020",
      "JAFZA / DAFZA / free zones",
      "Rate negotiation",
      "Demurrage control",
    ],
  },
  {
    group: "Warehouse and inventory",
    pillars: ["warehouse"],
    items: [
      "3PL operations",
      "VAS (pick-pack, kitting, labelling)",
      "FIFO",
      "ABCD classification",
      "Cycle counting",
      "Bin and material master control",
    ],
  },
  {
    group: "ERP and WMS",
    pillars: ["sap", "warehouse"],
    items: [
      "SAP S/4HANA MM & WM",
      "MIGO, MB1A/B/C, MB52, MB5B, MMBE",
      "MI01/04/07, LT03, LM07",
      "IQ WMS",
      "Delmia Apriso",
      "MES",
    ],
  },
  {
    group: "Data and automation",
    pillars: ["sap"],
    items: ["Advanced Excel", "Excel VBA", "Power BI", "Qlik Sense", "Power Automate", "KPI dashboards"],
  },
  {
    group: "Process and quality",
    pillars: ["warehouse"],
    items: ["5S", "Kaizen", "Lean Six Sigma", "5-Why", "JIT / Kanban", "SQCD reviews"],
  },
  { group: "Office", pillars: [], items: ["Microsoft 365", "Google Workspace"] },
];

export const certifications = [
  { name: "SAP S/4HANA – Enterprise Resource Planning", issuer: "Udemy" },
  { name: "Learning SAP MM", issuer: "LinkedIn Learning" },
  { name: "Supply Chain & Operations Management", issuer: "LinkedIn Learning, CSCMP-endorsed" },
  { name: "International Logistics – Global Trade Management", issuer: "LinkedIn Learning" },
  { name: "Lean Six Sigma – Process Improvement", issuer: "PMI" },
  { name: "Supply Chain Foundations – Project Management", issuer: "NASBA" },
  { name: "Career Essentials in Data Analysis", issuer: "Microsoft" },
  { name: "ABCD Classification – Inventory Management", issuer: "Alstom, internal" },
];

export const education = {
  name: "Diploma in Mechanical Engineering",
  school: "Government Polytechnic College, Tuticorin",
  date: "April 2020",
  grade: "First Class with Distinction",
};

export const awards = [
  { name: "GSI Excellence Award", context: "Alstom · negative-stock clearance automation" },
  { name: "5S Initiative Award", context: "Alstom · picking location redesign" },
];

export const contactCopy = {
  heading: "Hiring for a logistics, freight or warehouse role in the UAE?",
  body: `Send me the role and I'll reply ${site.replyTime}. I'm open to senior positions in freight forwarding, 3PL and contract logistics.`,
  success: `Thanks, got it. I'll reply ${site.replyTime}.`,
};

/** "I'm hiring for..." selector options. */
export const hiringFor: { id: Pillar; label: string; pitch: string }[] = [
  {
    id: "freight",
    label: "Freight",
    pitch: "Sea, air and road coordination for FMCG, retail/fashion and e-commerce, with rate negotiation and demurrage control.",
  },
  {
    id: "customs",
    label: "Customs",
    pitch: `Mirsal 2 import and export clearances with zero customs holds, as of ${site.asOf}.`,
  },
  {
    id: "warehouse",
    label: "Warehouse",
    pitch: "99.8% inventory accuracy, 99%+ WMS-to-physical accuracy and 20% faster picking through 5S.",
  },
  {
    id: "sap",
    label: "SAP",
    pitch: "SAP S/4HANA MM & WM key user for 12,000+ materials, plus a VBA macro that cut a 3-hour task to 20 minutes.",
  },
];

/** Section labels in manifest style. */
export const sections = {
  hero: { n: "01", label: "Hero" },
  proof: { n: "02", label: "Proof" },
  about: { n: "03", label: "About" },
  experience: { n: "04", label: "Experience" },
  cases: { n: "05", label: "Case studies" },
  skills: { n: "06", label: "Skills & systems" },
  tools: { n: "07", label: "Tools I built" },
  certs: { n: "08", label: "Certifications" },
  contact: { n: "09", label: "Contact" },
};

export const footer = `© 2026 Sattanathan Chandran · Dubai, UAE`;
