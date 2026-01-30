// app/layout.tsx
import './globals.css';
import BottomNav from '../components/BottomNav'; 
import Header from '../components/Header'; 
import TmdbAttribution from '../components/TmdbAttribution'; // Ensure this component exists or inline it

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-white min-h-screen flex flex-col">
        {/* Desktop Header */}
        <div className="hidden md:block">
           <Header />
        </div>

        {/* Main Content - Pushes Footer Down */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 w-full z-50">
          <BottomNav />
        </div>

        {/* Footer - Fixed at bottom of page flow */}
        <footer className="py-8 text-center text-gray-500 text-sm bg-black/50 mt-12 pb-24 md:pb-8">
           <div className="flex flex-col items-center gap-4">
             {/* TMDB Logo - Ensure file exists in public/tmdb/tmdb.svg */}
             <img src="/tmdb/tmdb.svg" alt="TMDB" className="h-4 w-auto opacity-70" />
             <p>© 2024 StreamExplorer. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
           </div>
        </footer>
      </body>
    </html>
  );
}