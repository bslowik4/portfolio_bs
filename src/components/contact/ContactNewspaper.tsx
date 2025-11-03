export default function ContactNewspaper() {
  const info = {
    name: 'Bartłomiej Słowik',
    email: 'bslowik4@gmail.com',
    phone: '+48 667 600 391',
    location: 'Kraków, Poland',
    github: 'https://github.com/bslowik4',
    repo: 'https://github.com/bslowik4/portfolio_bs',
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div
          className="bg-white shadow-lg p-4 sm:p-8 md:p-12 overflow-hidden"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 2px)',
          }}
        >
          <div className="text-center mb-12 border-b-4 border-t-4 border-double border-gray-900 py-6">
            <div className="text-xs font-bold text-gray-600 tracking-widest mb-2">
              CONTACT DIRECTORY
            </div>
            <h1 className="font-bold text-gray-900 mb-2 break-words px-2">
              <span
                className="inline-block"
                style={{
                  fontFamily: 'Times New Roman, Times, serif',
                  fontSize: 'clamp(1.5rem, 8vw, 3.75rem)',
                  letterSpacing: 'clamp(0em, 0.5vw, 0.05em)',
                }}
              >
                CONTACT
              </span>
            </h1>
            <div className="text-sm text-gray-600 tracking-wide">EST. 2025 • KRAKÓW EDITION</div>
          </div>

          <div className="space-y-8">
            <div className="pb-6 border-b-2 border-dashed border-gray-300">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-bold text-gray-500 flex-shrink-0">■</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase">E-Mail</h2>
              </div>
              <div className="pl-6">
                <a
                  href={`mailto:${info.email}`}
                  className="text-lg text-gray-700 hover:text-gray-900 underline break-all"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  {info.email}
                </a>
              </div>
            </div>

            <div className="pb-6 border-b-2 border-dashed border-gray-300">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-bold text-gray-500 flex-shrink-0">■</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase">
                  Phone Number
                </h2>
              </div>
              <div className="pl-6">
                <span
                  className="text-lg text-gray-700"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  {info.phone}
                </span>
              </div>
            </div>

            <div className="pb-6 border-b-2 border-dashed border-gray-300">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-bold text-gray-500 flex-shrink-0">■</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase">Location</h2>
              </div>
              <div className="pl-6">
                <p className="text-lg text-gray-700">{info.location}</p>
              </div>
            </div>

            <div className="pb-6">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-bold text-gray-500 flex-shrink-0">■</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase">Networks</h2>
              </div>
              <div className="pl-6 space-y-2">
                <a
                  href={info.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg text-gray-700 hover:text-gray-900 underline"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  GitHub
                </a>
                <a
                  href={info.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg text-gray-700 hover:text-gray-900 underline"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-4 border-double border-gray-900 text-center">
            <p
              className="text-sm text-gray-600 italic px-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Inquiries welcomed for professional opportunities, technical collaborations, and
              business correspondence.
            </p>
            <div className="mt-4 text-xs text-gray-500">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
          </div>
        </div>
      </div>
    </div>
  );
}
