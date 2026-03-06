import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand & Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">My Store</h3>
            <p className="text-gray-400 text-sm mb-6">
              Uw premium online winkel met kwaliteitsproducten en uitstekende service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <a
                  href="tel:+31612345678"
                  className="hover:text-white transition"
                >
                  +31 (0)6 12 34 56 78
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href="mailto:info@mystore.nl"
                  className="hover:text-white transition"
                >
                  info@mystore.nl
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Straatnaam 123, Amsterdam</span>
              </div>
            </div>
          </div>

          {/* Collecties */}
          <div>
            <h4 className="text-white font-semibold mb-4">Collecties</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=electronics"
                  className="hover:text-white transition"
                >
                  Elektronica
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=clothing"
                  className="hover:text-white transition"
                >
                  Kleding
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=accessories"
                  className="hover:text-white transition"
                >
                  Accessoires
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home"
                  className="hover:text-white transition"
                >
                  Wonen
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Alle Producten
                </Link>
              </li>
            </ul>
          </div>

          {/* Klantenservice */}
          <div>
            <h4 className="text-white font-semibold mb-4">Klantenservice</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-white transition"
                >
                  Verzending & Retour
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white transition">
                  Bestelling Tracken
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition">
                  Maat Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Over Ons */}
          <div>
            <h4 className="text-white font-semibold mb-4">Over Ons</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Over My Store
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Carrières
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="hover:text-white transition"
                >
                  Duurzaamheid
                </Link>
              </li>
            </ul>
          </div>

          {/* Juridisch */}
          <div>
            <h4 className="text-white font-semibold mb-4">Juridisch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition"
                >
                  Privacybeleid
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition"
                >
                  Voorwaarden
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-white transition"
                >
                  Cookie Instellingen
                </Link>
              </li>
              <li>
                <Link
                  href="/compliance"
                  className="hover:text-white transition"
                >
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Socials */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4">
                Blijf op de hoogte
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Meld u aan voor onze nieuwsbrief en ontvang exclusieve aanbiedingen.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Uw e-mailadres"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition"
                >
                  Inschrijven
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-4">Volg ons</h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-600 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 hover:bg-pink-600 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-500 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} My Store. Alle rechten voorbehouden. | Powered by{' '}
            <a
              href="https://rivodesk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Rivodesk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
