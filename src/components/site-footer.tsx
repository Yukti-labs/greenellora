import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#why-us" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#services" },
  { label: "Contact Us", href: "/#contact" },
];

const ourProducts = [
  { label: "Herbs & Spices", href: "/#services" },
  { label: "Medicinal Herbs", href: "/#services" },
  { label: "Honey", href: "/#services" },
  { label: "Seeds", href: "/#services" },
  { label: "Custom Products", href: "/#services" },
];

const certifications = [
  "FSSAI Certified",
  "APEDA Registered",
  "ISO 9001:2015",
  "Organic Certified",
  "Phytosanitary Compliant",
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">

        {/* Col 1 – Brand */}
        <div className="footer-brand-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="brand-logo footer-brand-logo">GE</span>
            <p className="text-lg font-serif font-bold text-white">{siteConfig.name}</p>
          </div>
          <p className="footer-brand-desc">
            Your trusted partner in premium herbs, spices &amp; natural products exports from India to the world.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook" className="footer-social-btn"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="footer-social-btn"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="footer-social-btn"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="WhatsApp" className="footer-social-btn">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Col 2 – Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-link-list">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 – Our Products */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Our Products</h4>
          <ul className="footer-link-list">
            {ourProducts.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 – Certifications */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Certifications</h4>
          <ul className="footer-link-list">
            {certifications.map((c) => (
              <li key={c} className="footer-link">{c}</li>
            ))}
          </ul>
        </div>

        {/* Col 5 – Contact */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Contact Us</h4>
          <ul className="footer-link-list footer-contact-list">
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="footer-contact-item">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="footer-contact-item">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <span className="footer-contact-item items-start">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Chandol, Buldhana, Maharashtra — 443106.</span>
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="page-shell footer-bottom-inner">
          <p>© {new Date().getFullYear()} Green Ellora. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/#" className="footer-bottom-link">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="/#" className="footer-bottom-link">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
