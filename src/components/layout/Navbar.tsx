import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors"
          >
            Portfolio
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/#projects"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Projects
            </Link>
            <Link
              href="/skills"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Skills
            </Link>
            <Link
              href="/contact"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
