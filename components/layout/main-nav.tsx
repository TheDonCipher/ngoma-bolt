"use client";

    import Link from "next/link";
    import { usePathname } from "next/navigation";
    import { ConnectWalletButton } from "@/components/web3/connect-wallet-button";
    import { Button } from "@/components/ui/button";
    import { Music } from "lucide-react";
    import { cn } from "@/lib/utils";
    import { useAddress } from "@thirdweb-dev/react";

    const routes = [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/explore",
        label: "Explore",
      },
      {
        href: "/news",
        label: "News",
      },
    ];

    const dashboardRoutes = [
      {
        href: "/dashboard/artist",
        label: "Artist Dashboard",
        role: "ARTIST",
      },
      {
        href: "/dashboard/fan",
        label: "Fan Dashboard",
        role: "FAN",
      },
      {
        href: "/dashboard/admin",
        label: "Admin Dashboard",
        role: "ADMIN",
      },
    ];

    export function MainNav() {
      const pathname = usePathname();
      const address = useAddress();

      return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-amber-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-black/5">
          <div className="container flex h-20 items-center px-6">
            <Link 
              href="/" 
              className="group flex items-center gap-3 mr-8 transition-all duration-300 hover:scale-105"
            >
              <Music className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 font-display group-hover:from-amber-200 group-hover:to-pink-200 transition-all duration-300">Ngoma</span>
            </Link>

            <nav className="flex items-center gap-6 flex-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "relative text-base font-medium transition-all duration-300 hover:text-white hover:scale-105 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-amber-200 after:to-pink-200 after:transition-all after:duration-300 hover:after:w-full",
                    pathname === route.href
                      ? "text-white after:w-full"
                      : "text-white/70"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {dashboardRoutes.map((route) => (
                <Button
                  key={route.href}
                  variant="outline"
                  className="relative overflow-hidden bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105 hover:border-white/40 before:absolute before:inset-0 before:bg-gradient-to-r before:from-amber-500/20 before:via-purple-500/20 before:to-pink-500/20 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300"
                  asChild
                >
                  <Link href={route.href}>
                    <span className="relative z-10">{route.label}</span>
                  </Link>
                </Button>
              ))}
              <ConnectWalletButton />
            </div>
          </div>
        </header>
      );
    }
