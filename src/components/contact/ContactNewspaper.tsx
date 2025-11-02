export default function ContactNewspaper() {
  const info = {
    name: 'Bartłomiej Słowik',
    email: 'bslowik4@gmail.com',
    phone: '+48 667 600 391',
    location: 'Kraków, Poland',
    github: 'https://github.com/bslowik4',
    repo: 'https://github.com/bslowik4/portfolio_bs',
  };

  const newspaperLines = {
    backgroundImage:
      'repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 2px)',
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg p-8 sm:p-12" style={newspaperLines}>
          <div className="text-center mb-12 border-b-4 border-t-4 border-double border-gray-900 py-6">
            <div className="text-xs font-bold text-gray-600 tracking-widest mb-2">
              CONTACT DIRECTORY
            </div>
            <h1
              className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Times New Roman', Times, serif", letterSpacing: '0.05em' }}
            >
              CORRESPONDENCE
            </h1>
            <div className="text-sm text-gray-600 tracking-wide">EST. 2025 • KRAKÓW EDITION</div>
          </div>

          <div className="space-y-8">
            {/* Email section */}
            <div className="pb-6 border-b-2 border-dashed border-gray-300">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-bold text-gray-500 tracking-widest">■</span>
                <h2
                  className="text-2xl font-bold text-gray-900 uppercase"
                  style={{ letterSpacing: '0.1em' }}
                >
                  E-Mail
                </h2>
              </div>
              <div className="pl-6">
                <a
                  href={`mailto:${info.email}`}
                  className="text-lg text-gray-700 hover:text-gray-900 underline decoration-2 transition-colors"
                  style={{ fontFamily: "'Courier New', monospace", lineHeight: '1.8' }}
                >
                  {info.email}
                </a>
              </div>
            </div>

            {/* Phone section */}
            <div className="pb-6 border-b-2 border-dashed border-gray-300">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-bold text-gray-500 tracking-widest">■</span>
                <h2
                  className="text-2xl font-bold text-gray-900 uppercase"
                  style={{ letterSpacing: '0.1em' }}
                >
                  Phone Number
                </h2>
              </div>
              <div className="pl-6">
                <span
                  className="text-lg text-gray-700"
                  style={{ fontFamily: "'Courier New', monospace", lineHeight: '1.8' }}
                >
                  {info.phone}
                </span>
              </div>
            </div>
            <div className="pb-6 border-b-2 border-dashed border-gray-300">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-bold text-gray-500 tracking-widest">■</span>
                <h2
                  className="text-2xl font-bold text-gray-900 uppercase"
                  style={{ letterSpacing: '0.1em' }}
                >
                  Location
                </h2>
              </div>
              <div className="pl-6">
                <p
                  className="text-lg text-gray-700"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif", lineHeight: '1.8' }}
                >
                  {info.location}
                </p>
              </div>
            </div>

            <div className="pb-6">
              <div className="flex items-baseline gap-3 mb-3">
                <div
                  className="text-xs font-bold text-gray-500 tracking-widest"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  ■
                </div>
                <h2
                  className="text-2xl font-bold text-gray-900 uppercase tracking-wider"
                  style={{ fontFamily: "'Times New Roman', Times, serif", letterSpacing: '0.1em' }}
                >
                  Networks
                </h2>
              </div>
              <div className="pl-6 space-y-3">
                <a
                  href={info.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg text-gray-700 hover:text-gray-900 underline decoration-2 transition-colors"
                  style={{ fontFamily: "'Courier New', monospace", lineHeight: '1.8' }}
                >
                  GitHub
                </a>
                <a
                  href={info.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg text-gray-700 hover:text-gray-900 underline decoration-2 transition-colors"
                  style={{ fontFamily: "'Courier New', monospace", lineHeight: '1.8' }}
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t-4 border-double border-gray-900 text-center">
            <p
              className="text-sm text-gray-600 italic tracking-wide"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", lineHeight: '1.8' }}
            >
              Inquiries welcomed for professional opportunities, technical collaborations, and
              business correspondence.
            </p>
            <div className="mt-4 text-xs text-gray-500 tracking-widest">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
