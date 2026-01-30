// components/Header.tsx
'use client';
import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo Area */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-red-600 font-bold text-2xl md:text-3xl uppercase tracking-tighter">
            StreamExplorer
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/search" className="hover:text-white transition">TV Shows</Link>
            <Link href="/search" className="hover:text-white transition">Movies</Link>
            <Link href="/search?filter=new" className="hover:text-white transition">New & Popular</Link>
          </nav>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-white">
          <Link href="/search">
            <Search className="w-6 h-6 cursor-pointer" />
          </Link>
          <Bell className="w-6 h-6 cursor-pointer hidden md:block" />
          <div className="w-8 h-8 bg-blue-600 rounded cursor-pointer flex items-center justify-center">
             <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}