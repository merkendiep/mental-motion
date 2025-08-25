import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 px-6 py-12">
      {/* Sponsors Section */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col items-center">
        <div className="text-sm uppercase tracking-widest text-gray-400 mb-4">
          Medemogelijk gemaakt door
        </div>
        <div className="flex flex-wrap gap-6 justify-center items-center w-full">
          {/* Sponsor logos */}
          <div className="h-16 w-40 flex items-center justify-center">
            <img
              src="/images/partners/PowerPeers.png"
              alt="PowerPeers"
              className="max-h-16 max-w-40 object-contain filter brightness-90 hover:brightness-100 transition-all duration-200"
            />
          </div>
          <div className="h-16 w-40 flex items-center justify-center">
            <img
              src="/images/partners/dockNL.jpg"
              alt="Dock"
              className="max-h-16 max-w-40 object-contain filter brightness-90 hover:brightness-100 transition-all duration-200"
            />
          </div>
          <div className="h-16 w-40 flex items-center justify-center">
            <img
              src="/images/partners/oranje-fonds.png"
              alt="Oranje Fonds"
              className="max-h-16 max-w-40 object-contain filter brightness-90 hover:brightness-100 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-gray-800 pt-10">
        {/* Services */}
        <nav className="flex flex-col gap-2">
          <h6 className="footer-title text-lg font-semibold mb-2">Services</h6>
          <a href="/#peer-support-section" className="link link-hover">
            Peer support
          </a>
          <a href="/#studieruimtes-section" className="link link-hover">
            Studieruimtes
          </a>
          <a href="/#brainstormen-section" className="link link-hover">
            Brainstormen
          </a>
          <a href="/#nieuwe-initiatieven-section" className="link link-hover">
            Nieuwe initiatieven
          </a>
          <a href="/calendar" className="link link-hover">
            Evenementen
          </a>
        </nav>

        {/* Company */}
        <nav className="flex flex-col gap-2">
          <h6 className="footer-title text-lg font-semibold mb-2">Bedrijf</h6>
          <a href="/about" className="link link-hover">
            Over ons
          </a>
          <a href="/de-peer" className="link link-hover">
            De Peer
          </a>
          <a href="/contact" className="link link-hover">
            Contact
          </a>
          <a href="/partners" className="link link-hover">
            Samenwerking
          </a>
        </nav>

        {/* Social Media */}
        <div>
          <h6 className="footer-title text-lg font-semibold mb-2">
            Social media
          </h6>
          <div className="flex gap-4 mb-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="fill-current hover:text-red-500 transition-colors"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="fill-current hover:text-pink-500 transition-colors"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="fill-current hover:text-blue-500 transition-colors"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h6 className="footer-title text-lg font-semibold mb-2">
            Nieuwsbrief
          </h6>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-400 mb-1">
              Blijf op de hoogte van nieuws en evenementen
            </span>
            <a
              href="/newsletter"
              className="inline-block bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 hover:from-primary hover:to-emerald-600 transition-all duration-200 text-center border-2 border-primary/60"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.69 0.0948 171.09) 0%, #10b981 100%)",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                Abonneer op de nieuwsbrief
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Mental Motion. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
