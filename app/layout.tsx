import './globals.css';
import BottomNav from '../components/BottomNav'; 
import Header from '../components/Header'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-white min-h-screen flex flex-col">
        {/* Desktop Header - z-50 ensures it stays on top */}
        <div className="hidden md:block relative z-50">
           <Header />
        </div>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 w-full z-50">
          <BottomNav />
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm bg-black/50 mt-12 pb-24 md:pb-8">
           <div className="flex flex-col items-center gap-4">
             {/* Enforce strict sizing on the logo to prevent giant layout break */}
             <div className="w-16 h-4 relative">
                <img 
                  src="/tmdb/tmdb.svg" 
                  alt="TMDB" 
                  className="w-full h-full object-contain opacity-70" 
                />
             </div>
             <p>© 2024 StreamExplorer. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
           </div>
        </footer>
      </body>
    </html>
  );
}