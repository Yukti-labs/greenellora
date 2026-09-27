import { servicePages } from "./services";

export type NavLink = {
  label: string;
  href: string;
};

export type NavDropdown = {
  label: string;
  children: NavLink[];
};

export type NavItem = NavLink | NavDropdown;

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}

export function getFlatNavLinks(): NavLink[] {
  return siteConfig.nav.flatMap((item) => (isNavDropdown(item) ? item.children : [item]));
}

export { serviceOfferings } from "./services";

// Function to fetch active services from API
export async function getActiveServices(): Promise<NavLink[]> {
  try {
    const res = await fetch("/api/service-types", { cache: "no-store" });
    const data = await res.json();
    if (data.success && data.data) {
      return data.data.map((service: any) => ({
        label: service.navLabel,
        href: `/services/${service.slug}`, // Link to individual service page
      }));
    }
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }
  // Fallback to static services if API fails
  return servicePages.map((page) => ({
    label: page.navLabel,
    href: page.href,
  }));
}

export const siteConfig = {
  name: "Green Ellora",
  title: "Green Ellora | Premium Organic & Agro Exports from India",
  description:
    "Green Ellora exports premium-grade organic spices, superfoods, herbal products, and agro commodities from India. Certified quality, custom packaging, and reliable worldwide logistics for global buyers and distributors.",
  url: "https://www.greenellora.com",
  email: "hello@greenellora.com",
  phone: "+91 7350073404",
  location: "India",
  keywords: [
    "Green Ellora",
    "organic spices exporter India",
    "Indian agro exports",
    "organic products exporter",
    "superfoods export India",
    "herbal products export",
    "turmeric exporter India",
    "bulk organic spices supplier",
    "private label spices India",
    "certified organic food export",
  ],
  nav: [
    { label: "Home", href: "/" },
    {
      label: "Services",
      children: servicePages.map((page) => ({
        label: page.navLabel,
        href: page.href,
      })),
    },
    { label: "Videos", href: "/videos" },
    { label: "Why Us", href: "/#why-us" },
    { label: "Markets", href: "/#markets" },
    { label: "Contact", href: "/#contact" },
  ] satisfies NavItem[],
};

export const trustPillars = [
  {
    title: "Secure Trade",
    description: "Transparent contracts, accurate documentation, and end-to-end communication at every stage of your order.",
  },
  {
    title: "Certified Quality",
    description: "All products are lab-tested for purity, moisture, and contaminants to meet international food safety and import regulations.",
  },
  {
    title: "Custom Packaging",
    description: "Retail pouches, bulk bags, private label, or branded packs - we tailor packaging to your market and SKU requirements.",
  },
  {
    title: "Global Shipping",
    description: "Seamless logistics coordination with timely dispatch, accurate shipping documents, and smooth customs clearance.",
  },
];

export const highlights = [
  "Organically grown and traceable from Indian farms",
  "FSSAI, APEDA and phytosanitary compliant exports",
  "Private label and custom packaging available",
  "Consistent quality across every repeat order",
];

export const productCategories = [
  {
    title: "Spices & Condiments",
    description:
      "Hand-selected, carefully cleaned and graded Indian spices with authentic aroma, natural colour, and consistent quality for retail and food industry buyers worldwide.",
    points: ["Turmeric (finger & powder)", "Red chilli & paprika", "Coriander & cumin", "Black pepper & cardamom"],
  },
  {
    title: "Organic Superfoods",
    description:
      "Certified organic, nutrient-dense ingredients sourced directly from Indian farms and processed without synthetic additives - ideal for health and wellness retail channels.",
    points: ["Moringa leaf powder", "Amla & ashwagandha", "Flaxseeds & chia seeds", "Dried herbs & botanicals"],
  },
  {
    title: "Cereals, Pulses & Grains",
    description:
      "Premium-grade organic staples and commodity grains sourced from certified Indian farms with full traceability and export-compliant quality documentation.",
    points: ["Basmati & non-basmati rice", "Red & green lentils", "Chickpeas & black beans", "Millet & quinoa varieties"],
  },
  {
    title: "Herbal & Wellness Products",
    description:
      "Traditional Indian herbal ingredients and formulated wellness products for nutraceutical, cosmetic, and herbal supplement manufacturers globally.",
    points: ["Ayurvedic herbs & extracts", "Essential & carrier oils", "Dried flowers & botanicals", "Custom blends & private label"],
  },
];

export const whyChooseUs = [
  {
    title: "Farm-to-Export Traceability",
    description:
      "Every batch is traceable back to its origin farm. We work directly with certified growers to ensure purity, ethical sourcing, and full supply-chain transparency.",
  },
  {
    title: "Advanced Processing & Testing",
    description:
      "Cleaning, grading, moisture control, and laboratory testing for microbial, pesticide residue, and heavy metal levels - every lot is export-ready before dispatch.",
  },
  {
    title: "Export Compliance Made Easy",
    description:
      "We handle FSSAI certification, phytosanitary certificates, COA, MSDS, and all destination-country documentation so your import process is smooth and stress-free.",
  },
  {
    title: "Long-Term Trade Partnership",
    description:
      "We offer competitive pricing, consistent lead times, and dedicated account communication - designed for buyers who value reliability over a single transaction.",
  },
];

export const metrics = [
  { value: "20+", label: "countries served worldwide" },
  { value: "50+", label: "organic & agro product SKUs" },
  { value: "100%", label: "lab-tested before every shipment" },
  { value: "24/7", label: "dedicated buyer support" },
];

export const markets = [
  "United States & Canada",
  "United Kingdom & Europe",
  "Middle East & Gulf",
  "South East Asia",
  "Australia & New Zealand",
  "Africa & Indian Ocean",
];

export const certifications = [
  "FSSAI Certified",
  "APEDA Registered",
  "USDA Organic",
  "ISO Quality",
  "Export Documentation",
];

export const coreServices = [
  {
    title: "Product Sourcing",
    description: "We help you find high-quality, verified Indian organic products suited to your market needs.",
    imageKey: "honey" as const,
  },
  {
    title: "Custom Packaging",
    description: "Tailored packaging solutions for safe and appealing presentation of goods during transit.",
    imageKey: "jaggury" as const,
  },
  {
    title: "Logistics & Shipping",
    description: "End-to-end logistics and shipping support to ensure timely and cost-effective delivery worldwide.",
    imageKey: "chana" as const,
  },
];

export const trustPoints = [
  "APEDA Registered Exporter",
  "Quality Checked & Verified Products",
  "Transparent Sourcing Process",
  "Competitive Pricing & On-Time Delivery",
  "24×7 Customer Support",
];

export const exportProcess = [
  "Inquiry & Requirement",
  "Product Sourcing",
  "Quality Assurance",
  "Documentation & Logistics",
  "Delivery & Support",
];

export const testimonials = [
  {
    quote: "Reliable sourcing partner! Everything was handled smoothly from sample to shipment.",
    author: "Dubai Buyer",
  },
  {
    quote: "Their organic product quality is top-notch and delivery was on time.",
    author: "Oman Client",
  },
  {
    quote: "Professional communication and great export documentation support.",
    author: "European Importer",
  },
];

export const categoryImages = {
  spices: "haladi",
  superfoods: "honey",
  cereals: "chana",
  herbal: "tea",
} as const;
