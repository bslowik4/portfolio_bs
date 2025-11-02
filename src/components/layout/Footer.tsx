import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-center text-sm font-medium text-slate-600">
          <Link href="/contact" className="hover:text-slate-900 transition-colors underline">
            Contact me now!
          </Link>
        </p>
        <p className="text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Bartłomiej Słowik
        </p>
      </div>
    </footer>
  );
}
