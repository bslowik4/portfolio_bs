import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-foreground hover:text-accent transition-colors"
          >
            Portfolio
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/skills"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skills
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
