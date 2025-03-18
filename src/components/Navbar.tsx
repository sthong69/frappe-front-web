import { LogOut, Menu, User } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/context/Auth";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAVBAR_HEIGHT } from "@/lib/styles/consts";

export default function Navbar() {
  const { user, logout, userRole } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({ mobile = false, onClose = () => {} }) => (
    <>
      <Link
        to="/"
        onClick={mobile ? onClose : undefined}
        className={`relative ${mobile ? "py-2 text-lg" : ""} text-foreground/90 transition-colors hover:text-foreground/60 ${
          location.pathname === "/" || location.pathname === "/dashboard"
            ? `after:absolute after:-bottom-[1.5px] after:left-0 after:h-[2px] after:w-full after:bg-foreground ${mobile ? "font-medium" : ""}`
            : ""
        }`}
      >
        ACCUEIL
      </Link>
      <Link
        to="/meeting"
        onClick={mobile ? onClose : undefined}
        className={`relative ${mobile ? "py-2 text-lg" : ""} text-foreground/90 transition-colors hover:text-foreground/60 ${
          location.pathname === "/meeting"
            ? `after:absolute after:-bottom-[1.5px] after:left-0 after:h-[2px] after:w-full after:bg-foreground ${mobile ? "font-medium" : ""}`
            : ""
        }`}
      >
        RENDEZ-VOUS
      </Link>
      <Link
        to="/faq"
        onClick={mobile ? onClose : undefined}
        className={`relative ${mobile ? "py-2 text-lg" : ""} text-foreground/90 transition-colors hover:text-foreground/60 ${
          location.pathname === "/faq"
            ? `after:absolute after:-bottom-[1.5px] after:left-0 after:h-[2px] after:w-full after:bg-foreground ${mobile ? "font-medium" : ""}`
            : ""
        }`}
      >
        FAQ
      </Link>
    </>
  );

  const UserProfile = () => (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer flex-col items-center gap-1">
              <User className="h-6 w-6" />
              <span className="text-[10px] font-medium">
                {user ? "CONNECTÉ" : "HORS CONNEXION"}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {user?.firstName} {user?.lastName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/profile">
              <DropdownMenuItem>Profil</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                logout();
              }}
            >
              <Link to="/" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/">
          <div className="flex flex-col items-center gap-1">
            <User className="h-6 w-6" />
            <span className="text-[10px] font-medium">
              {user ? "CONNECTÉ" : "HORS CONNEXION"}
            </span>
          </div>
        </Link>
      )}
    </>
  );

  return (
    <header
      style={{ height: NAVBAR_HEIGHT }}
      className="relative flex items-center border-b border-black px-4 md:px-16"
    >
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className={`w-[250px] sm:w-[300px] ${userRole === "ROLE_STUDENT" ? "bg-student" : "bg-supervisor"}`}
          >
            <SheetHeader className="mb-4"></SheetHeader>
            <div className="flex flex-col gap-4">
              <NavLinks mobile onClose={() => setIsOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo - Left on desktop, centered on mobile */}
      <div className="absolute left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold">FRAPPE</h1>
        </Link>
      </div>

      {/* Navigation - Only visible on desktop */}
      <nav className="mx-auto hidden items-center gap-6 text-sm font-medium md:flex">
        <NavLinks />
      </nav>

      {/* User profile - Right on both mobile and desktop */}
      <div className="absolute right-4 md:right-16">
        <UserProfile />
      </div>
    </header>
  );
}
