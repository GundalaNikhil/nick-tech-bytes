"use client";

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-gray-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-sm sm:text-base text-gray-400">
            &copy; 2023 NICK TECH BYTES. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
