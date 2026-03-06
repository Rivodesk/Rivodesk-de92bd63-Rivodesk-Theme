import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Store
          </Link>

          {/* Menu Links */}
          <div className="flex gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/product"
              className="text-gray-700 hover:text-gray-900 transition font-medium"
            >
              Product
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-gray-900 transition font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 transition font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
