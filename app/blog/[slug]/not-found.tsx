import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="relative z-10">
            {/* Icon */}
            <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Blog post niet gevonden
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 mb-2 leading-relaxed">
              Het lijkt erop dat deze blog post niet bestaat of niet meer
              beschikbaar is.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Neem contact met ons op als je denkt dat dit een fout is.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Terug naar blog
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Contact opnemen
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-3">
                Misschien vind je dit wel interessant:
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <Link
                  href="/blog"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Alle blog posts
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Homepage
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/about"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Over ons
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
