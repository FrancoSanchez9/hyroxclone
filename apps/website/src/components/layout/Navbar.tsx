import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Drawer } from "vaul";
import { Menu, X } from "lucide-react";
import { navItems, topRightLinks, type NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const dropdownVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.15, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -4,
    transition: { duration: 0.1, ease: EASE },
  },
};

function DropdownMenu({ items }: { items: NavItem[] }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ transformOrigin: "top center" }}
      className="absolute top-full left-0 mt-1 min-w-[220px] rounded-sm overflow-hidden z-50"
    >
      <div className="py-2" style={{ backgroundColor: "#111111", border: "1px solid #2a2a2a" }}>
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href ?? "/"}
            className="block px-5 py-2.5 text-sm text-white/70 hover:text-[#e5f93a] hover:bg-white/5 transition-colors duration-100 uppercase tracking-wide font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function NavItemDesktop({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 80);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!item.children) {
    return (
      <Link
        to={item.href ?? "/"}
        className="relative px-3 py-2 text-sm text-white/80 hover:text-[#e5f93a] transition-colors duration-150 uppercase tracking-wide font-medium"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm uppercase tracking-wide font-medium transition-colors duration-150",
          open ? "text-[#e5f93a]" : "text-white/80 hover:text-[#e5f93a]",
        )}
      >
        {item.label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={cn("transition-transform duration-150", open ? "rotate-180" : "rotate-0")}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <AnimatePresence>{open && <DropdownMenu items={item.children} />}</AnimatePresence>
    </div>
  );
}

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
        "fixed top-0 left-0 right-0 z-40 transition-shadow duration-200",
        scrolled && "shadow-lg shadow-black/40",
      )}
      style={
        scrolled ? { backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" } : undefined
      }
    >
      <div
        className="hidden md:flex items-center justify-end px-8 py-2 gap-6"
        style={{ backgroundColor: "#111111", borderBottom: "1px solid #2a2a2a" }}
      >
        {topRightLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-xs text-white/60 hover:text-[#e5f93a] uppercase tracking-widest font-medium transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <nav
        className="flex items-center justify-between px-6 md:px-8 h-16"
        style={{ backgroundColor: "#0a0a0a", borderBottom: "1px solid #2a2a2a" }}
      >
        <Link
          to="/"
          className="text-[#e5f93a] text-3xl tracking-wider select-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          HYROX
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavItemDesktop key={item.label} item={item} />
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <Link
            to="/eventos"
            className="px-5 py-2 text-sm font-bold uppercase tracking-widest text-black bg-[#e5f93a] rounded-none transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:bg-[#d4e82e]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.12em",
              fontSize: "1rem",
            }}
          >
            Inscríbete
          </Link>
        </div>

        {/* Mobile: Vaul drawer trigger */}
        <Drawer.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Drawer.Trigger asChild>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-white/80 hover:text-[#e5f93a] transition-colors duration-150"
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 z-40" />
            <Drawer.Content
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl outline-none"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #2a2a2a",
                maxHeight: "90dvh",
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              <div className="flex items-center justify-between px-6 py-3 border-b border-[#2a2a2a]">
                <span
                  className="text-[#e5f93a] text-2xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  HYROX
                </span>
                <Drawer.Close asChild>
                  <button
                    className="flex items-center justify-center w-9 h-9 text-white/70 hover:text-[#e5f93a] transition-colors duration-150"
                    aria-label="Cerrar menú"
                  >
                    <X size={20} />
                  </button>
                </Drawer.Close>
              </div>

              <div className="overflow-y-auto flex-1 pb-safe">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <p className="px-6 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                        {item.label}
                      </p>
                      {item.children.map((child) => (
                        <Drawer.Close key={child.label} asChild>
                          <Link
                            to={child.href ?? "/"}
                            className="block px-6 py-3 text-sm text-white/70 hover:text-[#e5f93a] uppercase tracking-wide font-medium transition-colors duration-100 border-b border-[#1e1e1e]"
                          >
                            {child.label}
                          </Link>
                        </Drawer.Close>
                      ))}
                    </div>
                  ) : (
                    <Drawer.Close key={item.label} asChild>
                      <Link
                        to={item.href ?? "/"}
                        className="block px-6 py-4 text-base text-white/80 hover:text-[#e5f93a] uppercase tracking-wide font-medium transition-colors duration-150 border-b border-[#2a2a2a]"
                      >
                        {item.label}
                      </Link>
                    </Drawer.Close>
                  ),
                )}

                <div className="px-6 pt-6 pb-8 flex flex-col gap-3">
                  {topRightLinks.map((link) => (
                    <Drawer.Close key={link.label} asChild>
                      <Link
                        to={link.href}
                        className="text-xs text-white/40 hover:text-[#e5f93a] uppercase tracking-widest transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </Drawer.Close>
                  ))}
                  <Drawer.Close asChild>
                    <Link
                      to="/eventos"
                      className="mt-3 px-5 py-3 text-center font-bold uppercase tracking-widest text-black bg-[#e5f93a] transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:bg-[#d4e82e]"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}
                    >
                      Inscríbete
                    </Link>
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
