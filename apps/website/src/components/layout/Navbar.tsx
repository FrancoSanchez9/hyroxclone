import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Drawer } from "vaul";
import { Menu, X } from "lucide-react";
import { navItems, topRightLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import logoSrc from "@/assets/image02.png";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
        scrolled && "shadow-lg shadow-black/60",
      )}
      style={
        scrolled
          ? {
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              backgroundColor: "rgba(6,6,8,0.92)",
            }
          : undefined
      }
    >
      <div
        className="hidden md:flex items-center justify-end px-8 py-2 gap-6"
        style={{ backgroundColor: "#0f0f14", borderBottom: "1px solid #2a2a3a" }}
      >
        {topRightLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-xs text-white/60 hover:text-[#a855f7] uppercase tracking-widest font-medium transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <nav
        className="flex items-center justify-between px-6 md:px-8 h-16"
        style={{
          backgroundColor: scrolled ? "transparent" : "#060608",
          borderBottom: "1px solid #2a2a3a",
        }}
      >
        <Link to="/" className="flex items-center">
          <img src={logoSrc} alt="runluv" className="h-7 w-auto brightness-[1.1]" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "/"}
              className="relative px-3 py-2 text-sm text-white/70 hover:text-[#a855f7] transition-colors duration-150 uppercase tracking-wide font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <a
            href="#contacto"
            className="px-5 py-2 text-sm font-bold uppercase tracking-widest text-white bg-[#a855f7] transition-[transform,background-color,opacity] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:bg-[#9333ea]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.12em",
              fontSize: "1rem",
            }}
          >
            Agenda una reunión
          </a>
        </div>

        <Drawer.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Drawer.Trigger asChild>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-white/70 hover:text-[#a855f7] transition-colors duration-150"
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/70 z-40" />
            <Drawer.Content
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl outline-none"
              style={{
                backgroundColor: "#0f0f14",
                border: "1px solid #2a2a3a",
                maxHeight: "90dvh",
              }}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              <div className="flex items-center justify-between px-6 py-3 border-b border-[#2a2a3a]">
                <img src={logoSrc} alt="runluv" className="h-6 w-auto" />
                <Drawer.Close asChild>
                  <button
                    className="flex items-center justify-center w-9 h-9 text-white/60 hover:text-[#a855f7] transition-colors duration-150"
                    aria-label="Cerrar menú"
                  >
                    <X size={20} />
                  </button>
                </Drawer.Close>
              </div>

              <div className="overflow-y-auto flex-1 pb-safe">
                {navItems.map((item) => (
                  <Drawer.Close key={item.label} asChild>
                    <a
                      href={item.href ?? "/"}
                      className="block px-6 py-4 text-base text-white/70 hover:text-[#a855f7] uppercase tracking-wide font-medium transition-colors duration-150 border-b border-[#2a2a3a]"
                    >
                      {item.label}
                    </a>
                  </Drawer.Close>
                ))}

                <div className="px-6 pt-6 pb-8 flex flex-col gap-3">
                  {topRightLinks.map((link) => (
                    <Drawer.Close key={link.label} asChild>
                      <Link
                        to={link.href}
                        className="text-xs text-white/60 hover:text-[#a855f7] uppercase tracking-widest transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </Drawer.Close>
                  ))}
                  <Drawer.Close asChild>
                    <a
                      href="#contacto"
                      className="mt-3 px-5 py-3 text-center font-bold uppercase tracking-widest text-white bg-[#a855f7] transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:bg-[#9333ea]"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}
                    >
                      Agenda una reunión
                    </a>
                  </Drawer.Close>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </nav>
    </header>
  );
}
