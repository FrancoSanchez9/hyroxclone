import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Drawer } from "vaul";
import { m, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, topRightLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import logoSrc from "@/assets/logo-mark.png";
import { ACCENT } from "@/lib/theme";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname: currentPath } = useLocation();

  // Scroll-progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Action buttons hide only at the very top of the home hero; visible everywhere else.
  const hideActions = currentPath === "/" && !scrolled;

  // On the home page, clicking the logo while scrolled returns to top instead of
  // reloading the route.
  const handleLogoClick = (e: React.MouseEvent) => {
    if (currentPath === "/" && window.scrollY > 0) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <m.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
        style={{ scaleX: progress, background: ACCENT }}
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-[background-color,box-shadow,border-color] duration-200",
          scrolled && "shadow-lg shadow-black/60",
        )}
        style={
          scrolled
            ? {
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                backgroundColor: "rgba(0,0,0,0.92)",
              }
            : undefined
        }
      >
        {/* Main nav */}
        <nav
          className="flex items-center justify-between px-6 md:px-10 h-20"
          style={{
            backgroundColor: scrolled ? "transparent" : "#000",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <Link to="/" onClick={handleLogoClick} className="flex items-center shrink-0">
            <img
              src={logoSrc}
              alt="RunLuv"
              width={413}
              height={119}
              className="h-10 w-auto brightness-[1.1]"
              loading="eager"
            />
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = item.href
                ? currentPath === item.href || currentPath.startsWith(item.href + "/")
                : false;
              return (
                <Link
                  key={item.label}
                  to={item.href ?? "/"}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm transition-colors duration-150 uppercase tracking-wide font-semibold focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2",
                    isActive
                      ? "text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-white"
                      : "text-white/60 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action buttons — hidden only at the top of the home hero */}
          <m.div
            className="hidden md:flex items-center gap-2"
            animate={{ opacity: hideActions ? 0 : 1, y: hideActions ? -8 : 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            style={{ pointerEvents: hideActions ? "none" : "auto" }}
            aria-hidden={hideActions}
          >
            <Link
              to="/tu-nivel"
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-rl-accent border border-rl-accent/50 transition-[background-color,border-color,transform] duration-[160ms] ease-out-strong hover:bg-rl-accent/10 hover:border-rl-accent active:scale-[0.96]"
            >
              Tu reto
            </Link>
            <Link
              to="/ranking"
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 border border-white/25 transition-[background-color,border-color,color,transform] duration-[160ms] ease-out-strong hover:border-white hover:text-white active:scale-[0.96]"
            >
              Ranking
            </Link>
            <Link
              to="/eventos"
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-black bg-rl-accent transition-[filter,transform] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96]"
              style={{ boxShadow: "0 0 24px rgba(212,255,0,0.25)" }}
            >
              Inscripciones
            </Link>
          </m.div>

          <Drawer.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Drawer.Trigger asChild>
              <button
                type="button"
                className="md:hidden flex items-center justify-center w-11 h-11 text-white/70 hover:text-[#ffffff] transition-colors duration-150"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/70 z-40" />
              <Drawer.Content
                className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl outline-none"
                style={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  maxHeight: "90dvh",
                }}
              >
                <div className="flex justify-center pt-3 pb-1">
                  <div className="h-1 w-10 rounded-full bg-white/20" />
                </div>

                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                  <img
                    src={logoSrc}
                    alt="RunLuv"
                    width={413}
                    height={119}
                    className="h-8 w-auto brightness-[1.1]"
                    loading="lazy"
                  />
                  <Drawer.Close asChild>
                    <button
                      type="button"
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      className="flex items-center justify-center w-10 h-10 text-white/60 hover:text-[#ffffff] transition-colors duration-150"
                      aria-label="Close menu"
                    >
                      <X size={20} />
                    </button>
                  </Drawer.Close>
                </div>

                <div className="overflow-y-auto flex-1 pb-safe">
                  {navItems.map((item) => (
                    <Drawer.Close key={item.label} asChild>
                      <Link
                        to={item.href ?? "/"}
                        className="block px-6 py-4 text-base text-white/70 hover:text-[#ffffff] uppercase tracking-wide font-semibold transition-colors duration-150 border-b border-white/10"
                      >
                        {item.label}
                      </Link>
                    </Drawer.Close>
                  ))}

                  <div className="px-6 pt-6 pb-8 flex flex-col gap-3">
                    {topRightLinks.map((link, i) => (
                      <Drawer.Close key={link.label} asChild>
                        <Link
                          to={link.href}
                          className={cn(
                            "px-5 py-3 text-center text-sm font-bold uppercase tracking-widest transition-[filter,background-color,border-color] duration-[160ms] active:scale-[0.96]",
                            i === 1
                              ? "bg-rl-accent text-black hover:brightness-95"
                              : "border border-rl-accent/50 text-rl-accent hover:bg-rl-accent/10",
                          )}
                        >
                          {link.label}
                        </Link>
                      </Drawer.Close>
                    ))}
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </nav>
      </header>
    </>
  );
}
