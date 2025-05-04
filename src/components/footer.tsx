'use client';

import {
  Linkedin,
  Twitter,
  Github,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Mocky
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            AI-powered interview prep crafted from real job listings.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:underline">Home</Link></li>
            <li><Link href="/#" className="text-gray-600 dark:text-gray-400 hover:underline">Features</Link></li>
            <li><Link href="/#" className="text-gray-600 dark:text-gray-400 hover:underline">Pricing</Link></li>
            <li><Link href="/#" className="text-gray-600 dark:text-gray-400 hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Connect with us
          </h3>
          <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Twitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 dark:hover:text-white">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-600 py-4 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Mocky. All rights reserved.
      </div>
    </footer>
  );
}
