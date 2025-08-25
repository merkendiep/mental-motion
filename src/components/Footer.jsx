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
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="fill-current hover:text-blue-400 transition-colors"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
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
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="fill-current hover:text-blue-600 transition-colors"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
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
