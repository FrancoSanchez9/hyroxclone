import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { navItems, topRightLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import logoSrc from "@/assets/logo-mark.webp";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const { pathname: currentPath } = useLocation();

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

  const openMobileMenu = () => {
    const dialog = mobileDialogRef.current;
    if (!dialog?.open) dialog?.showModal();
    setMobileOpen(true);
  };

  const closeMobileMenu = () => {
    const dialog = mobileDialogRef.current;
    if (!dialog?.open || dialog.dataset.closing === "true") return;
    dialog.dataset.closing = "true";
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160;
    window.setTimeout(() => dialog.close(), delay);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="rl-scroll-progress fixed top-0 right-0 left-0 z-60 h-[3px] origin-left bg-rl-accent"
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-[background-color,box-shadow,border-color] duration-200",
          scrolled && "shadow-lg shadow-black/60",
        )}
        style={
          scrolled
            ? {
                backdropFilter: "blur(20px) saturate(150%)",
                WebkitBackdropFilter: "blur(20px) saturate(150%)",
                backgroundColor: "rgba(0,0,0,0.62)",
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
          <div
            className={cn(
              "hidden items-center gap-2 transition-[opacity,transform] duration-220 ease-out-strong md:flex",
              hideActions
                ? "pointer-events-none -translate-y-2 opacity-0"
                : "translate-y-0 opacity-100",
            )}
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
              className="btn-sheen px-5 py-2 text-xs font-bold uppercase tracking-widest text-black bg-rl-accent transition-[filter,transform] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96]"
              style={{ boxShadow: "0 0 24px rgba(212,255,0,0.25)" }}
            >
              Inscripciones
            </Link>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.96] md:hidden"
            aria-label="Abrir menú"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            onClick={openMobileMenu}
          >
            <Menu size={22} />
          </button>

          <dialog
            ref={mobileDialogRef}
            id="mobile-navigation"
            aria-labelledby="mobile-navigation-title"
            className="mobile-nav-dialog fixed inset-x-0 top-auto bottom-0 m-0 flex max-h-[90dvh] w-full max-w-none flex-col rounded-t-2xl border border-white/10 bg-[#0a0a0a] p-0 text-white outline-none md:hidden"
            onClose={() => {
              delete mobileDialogRef.current?.dataset.closing;
              setMobileOpen(false);
            }}
            onCancel={(event) => {
              event.preventDefault();
              closeMobileMenu();
            }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeMobileMenu();
            }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
              <h2 id="mobile-navigation-title" className="sr-only">
                Navegación principal
              </h2>
              <img
                src={logoSrc}
                alt="RunLuv"
                width={413}
                height={119}
                className="h-8 w-auto brightness-[1.1]"
                loading="lazy"
              />
              <button
                type="button"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                className="flex h-10 w-10 items-center justify-center text-white/60 transition-[color,transform] duration-150 hover:text-white active:scale-[0.96]"
                aria-label="Cerrar menú"
                onClick={closeMobileMenu}
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pb-safe">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href ?? "/"}
                  onClick={closeMobileMenu}
                  className="block min-h-14 border-b border-white/10 px-6 py-4 text-base font-semibold uppercase tracking-wide text-white/70 transition-colors duration-150 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <div className="px-6 pt-6 pb-8 flex flex-col gap-3">
                {topRightLinks.map((link, i) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "min-h-12 px-5 py-3 text-center text-sm font-bold uppercase tracking-widest transition-[filter,background-color,border-color,transform] duration-[160ms] active:scale-[0.96]",
                      i === 1
                        ? "bg-rl-accent text-black hover:brightness-95"
                        : "border border-rl-accent/50 text-rl-accent hover:bg-rl-accent/10",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </dialog>
        </nav>
      </header>
    </>
  );
}
