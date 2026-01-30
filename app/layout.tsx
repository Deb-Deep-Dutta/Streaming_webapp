import './globals.css';
import BottomNav from '../components/BottomNav'; // Your existing component
import Header from '../components/Header'; // We will create a Desktop Header

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-white min-h-screen flex flex-col">
        {/* Desktop Header (Hidden on mobile) */}
        <div className="hidden md:block fixed top-0 w-full z-50">
           <Header />
        </div>

        {/* Main Content - Flex Grow pushes footer down */}
        <main className="flex-grow pb-16 md:pb-0 md:pt-16">
          {children}
        </main>

        {/* Mobile Bottom Nav (Hidden on Desktop) */}
        <div className="md:hidden fixed bottom-0 w-full z-50">
          <BottomNav />
        </div>

        {/* Footer (Always at bottom) */}
        <footer className="py-8 text-center text-gray-500 text-sm bg-black/50">
           <p>© 2024 StreamExplorer. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </footer>
      </body>
    </html>
  );
}