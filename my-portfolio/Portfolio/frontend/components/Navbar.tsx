"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { config, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const sortedNav = [...config.navigation].sort((a: any, b: any) => a.order - b.order);
  
  // Convert standard paths to hash links for one-page layout except /admin
  const navItems = sortedNav.map((item: any) => ({
    name: item.name,
    href: item.path === '/' ? 'home' : item.path.replace('/', '')
  }));

  // Append Admin
  navItems.push({ name: 'ADMIN LOGIN', href: '/admin' });

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-industrial-900/90 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-industrial-cyan font-bold text-xl tracking-tighter hover:text-white transition-colors uppercase flex items-center gap-2">
          {config.assets.logo_url ? (
            <img src={config.assets.logo_url} alt="Logo" className="h-8 object-contain" />
          ) : (
            config.branding.venture_name
          )}
        </Link>
        <div className="hidden lg:flex items-center text-xs font-medium tracking-widest text-white/70 overflow-x-auto">
          {navItems.map((item, i) => {
            const href = item.href.startsWith('/') ? item.href : (isHome ? `#${item.href}` : `/#${item.href}`);
            return (
              <span key={item.name} className="flex items-center">
                <Link 
                  href={href} 
                  className={`hover:text-industrial-cyan transition-colors whitespace-nowrap ${item.name.includes('ADMIN') ? 'text-industrial-cyan/80 font-bold' : ''}`}
                >
                  {i + 1}. {item.name}
                </Link>
                {i < navItems.length - 1 && <span className="mx-4 text-white/20 select-none">|</span>}
              </span>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
