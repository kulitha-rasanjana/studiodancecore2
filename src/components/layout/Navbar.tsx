import { useState } from "react";
import { Menu, X, CircleUserRound } from "lucide-react";
import LoginPopup from "../auth/LoginPopup";

const links = [
  { label: "PRODUCTIONS", href: "/productions" },
  { label: "NEWS", href: "/news" },
  { label: "MERCH", href: "/merch" },
  { label: "CLASSES", href: "/classes" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <header className="relative z-40 bg-[#020b12] text-white">
        <nav className="mx-auto flex h-16 w-full items-center justify-between gap-5 px-4 md:px-8 lg:h-[72px]">
          {/* Logo and navigation */}
          <div className="flex min-w-0 items-center gap-6 lg:gap-9">
            <a
              href="/"
              aria-label="Studio Dance Core home"
              className="shrink-0"
            >
              <img
                src="/assets/logo.webp"
                alt="Studio Dance Core"
                className="h-10 w-auto max-w-28 object-contain md:h-12"
              />
            </a>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-7 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                    group relative
                    font-heading text-lg tracking-[0.08em]
                    text-white
                    transition-colors duration-300
                    hover:text-[#B89B5E]
                    lg:text-xl
                  "
                >
                  {link.label}

                  {/* Animated gold underline */}
                  <span
                    className="
                      absolute -bottom-1 left-0
                      h-[2px] w-full
                      origin-left scale-x-0
                      bg-[#B89B5E]
                      transition-transform duration-300 ease-out
                      group-hover:scale-x-100
                    "
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Login and mobile menu */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="
      group flex items-center gap-2
      font-heading text-lg tracking-[0.08em]
      text-white
      transition-colors duration-300
      hover:text-[#B89B5E]
      lg:text-xl
    "
            >
              <CircleUserRound
                size={29}
                strokeWidth={1.8}
                className="
        transition-all duration-300
        group-hover:scale-110
      "
              />

              <span className="hidden sm:inline">LOGIN</span>
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="
      text-white
      transition-colors duration-300
      hover:text-[#B89B5E]
      md:hidden
    "
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <div
            className="
              absolute inset-x-0 top-full
              border-t border-[#B89B5E]/20
              bg-[#020b12]
              px-6 py-6
              shadow-xl
              md:hidden
            "
          >
            <div className="flex flex-col items-start gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    group relative
                    font-heading text-xl tracking-[0.08em]
                    text-white
                    transition-colors duration-300
                    hover:text-[#B89B5E]
                  "
                >
                  {link.label}

                  <span
                    className="
                      absolute -bottom-1 left-0
                      h-[2px] w-full
                      origin-left scale-x-0
                      bg-[#B89B5E]
                      transition-transform duration-300
                      group-hover:scale-x-100
                    "
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <LoginPopup open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
