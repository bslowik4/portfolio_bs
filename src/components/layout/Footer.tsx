export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-center text-sm font-medium text-muted-foreground">Contact me now!</p>
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Bartłomiej Słowik
        </p>
      </div>
    </footer>
  );
}
