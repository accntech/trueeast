/* Single source of truth — every figure here is drawn from the official
   TRUE EAST ENERGY CORP. company profile. Nothing is invented. */

export const company = {
  name: "True East Energy Corp.",
  shortName: "True East",
  tagline: "Power that rises in the East.",
  sec: "202406015446-02",
  founded: 2024,
  type: "Stock Corporation — power generation, transmission & distribution",
  philgeps: true,
  leader: {
    name: "Engr. Vincent Vir M. Agbayani",
    role: "Principal Electrical Engineer & Founder",
    credential: "Registered Electrical Engineer · Mapúa University",
    experience: 14,
  },
  office: {
    line1: "GF VMA Admin. Bldg",
    line2: "Strong Republic Nautical Highway",
    city: "Bongabong",
    province: "Oriental Mindoro",
    country: "Philippines",
    region: "PH-MDR",
    geo: { lat: 12.6319908, lng: 121.4974872 },
  },
  email: "trueeastenergy@gmail.com",
  phone: "+63 917 586 9175",
} as const;

/* Verifiable headline figures. ~551 kWp across the 15 finished projects that
   state a capacity; 250.04 kWp across the two ongoing flagships. */
export const stats = [
  {
    value: 550,
    suffix: "+",
    unit: "kWp",
    label: "Solar capacity commissioned",
  },
  { value: 17, suffix: "", unit: "projects", label: "Installations completed" },
  { value: 14, suffix: "", unit: "years", label: "Engineering leadership" },
  {
    value: 250,
    suffix: "",
    unit: "kWp",
    label: "In construction for LGU & hospital",
  },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const ORIGIN = "https://trueeastenergy.ph";
