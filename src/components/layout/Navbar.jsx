"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { useAppContext } from "@/lib/store";

// لا يوجد مصدر خارجي حقيقي نراقبه هنا.
// نستخدمها فقط لمعرفة هل أصبحنا على المتصفح بعد Hydration أم لا.
const subscribeToNothing = () => () => {};

export default function Navbar() {
  const { cartCount, isCartReady } = useAppContext();
  const { resolvedTheme, setTheme } = useTheme();

  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchInputRef = useRef(null);

  // false على السيرفر وأول Hydration، ثم true على المتصفح.
  // لا يوجد setState داخل useEffect.
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return undefined;

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isSearchOpen]);

  const isActive = (path) => pathname === path;

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const cleanSearch = searchValue.trim();

    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);

    if (!cleanSearch) {
      router.push("/menu");
      return;
    }

    router.push(`/menu?search=${encodeURIComponent(cleanSearch)}`);
  };

  const openSearch = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (pathname === "/checkout") return null;

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled
            ? "border-outline-variant/30 bg-surface/90 shadow-md backdrop-blur-xl"
            : "border-transparent bg-surface/60 shadow-none backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-headline text-2xl font-bold tracking-tight text-primary"
          >
            AdnanBucks
          </Link>

          <div className="hidden items-center space-x-8 font-body text-base md:flex">
            <Link
              href="/"
              className={`transition-all duration-300 hover:text-primary ${
                isActive("/")
                  ? "border-b-2 border-primary pb-1 font-bold text-primary"
                  : "text-on-surface-variant"
              }`}
            >
              Home
            </Link>

            <Link
              href="/menu"
              className={`transition-all duration-300 hover:text-primary ${
                isActive("/menu")
                  ? "border-b-2 border-primary pb-1 font-bold text-primary"
                  : "text-on-surface-variant"
              }`}
            >
              Menu
            </Link>

            <Link
              href="/cart"
              className={`transition-all duration-300 hover:text-primary ${
                isActive("/cart")
                  ? "border-b-2 border-primary pb-1 font-bold text-primary"
                  : "text-on-surface-variant"
              }`}
            >
              Cart
            </Link>
          </div>

          <div className="flex items-center space-x-4 text-primary md:space-x-6">
            <button
              type="button"
              aria-label="Open search"
              className="transition-opacity hover:opacity-80"
              onClick={openSearch}
            >
              <Search size={21} strokeWidth={2} />
            </button>

            <button
              type="button"
              aria-label="Toggle theme"
              className="flex h-[21px] w-[21px] items-center justify-center transition-opacity hover:opacity-80"
              onClick={handleThemeToggle}
            >
              {isClient && resolvedTheme === "dark" ? (
                <Sun size={21} strokeWidth={2} />
              ) : (
                <Moon size={21} strokeWidth={2} />
              )}
            </button>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative transition-opacity hover:opacity-80"
            >
              <ShoppingBag size={21} strokeWidth={2} />

              {isCartReady && cartCount > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
                  {cartCount}
                </span>
              )}
            </Link>


            <button
              type="button"
              aria-label="Mobile menu"
              className="transition-opacity hover:opacity-80 md:hidden"
              onClick={() => {
                setIsSearchOpen(false);
                setIsMobileMenuOpen((previous) => !previous);
              }}
            >
              {isMobileMenuOpen ? (
                <X size={24} strokeWidth={2} />
              ) : (
                <Menu size={24} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <form
            onSubmit={handleSearchSubmit}
            className="border-t border-outline-variant/20 bg-surface/95 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                />

                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search drinks, bakery..."
                  className="w-full rounded-full bg-surface-container-low py-3 pl-12 pr-4 font-body text-on-surface outline-none ring-primary/50 transition-shadow focus:ring-2"
                />
              </div>

              <button
                type="button"
                onClick={closeSearch}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low text-primary transition-colors hover:bg-primary hover:text-on-primary"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
          </form>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 border-t border-outline-variant/20 bg-surface/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col space-y-6 p-6 font-body text-lg">
            <Link
              href="/"
              className={`rounded-xl p-3 ${
                isActive("/")
                  ? "bg-primary/10 font-bold text-primary"
                  : "text-on-surface"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/menu"
              className={`rounded-xl p-3 ${
                isActive("/menu")
                  ? "bg-primary/10 font-bold text-primary"
                  : "text-on-surface"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menu
            </Link>

            <Link
              href="/cart"
              className={`flex items-center justify-between rounded-xl p-3 ${
                isActive("/cart")
                  ? "bg-primary/10 font-bold text-primary"
                  : "text-on-surface"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Cart</span>

              {isCartReady && cartCount > 0 && (
                <span className="rounded-full bg-primary px-2 py-1 text-xs font-bold text-on-primary">
                  {cartCount} items
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
