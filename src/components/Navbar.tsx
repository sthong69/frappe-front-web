import { LogOut, User } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/context/Auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAVBAR_HEIGHT } from "@/lib/styles/consts";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header
      style={{ height: NAVBAR_HEIGHT }}
      className="flex items-center justify-between border-b border-black px-4 md:px-16"
    >
      <nav className="flex flex-1 items-center justify-center gap-6 text-sm font-medium">
        <Link
          to="/"
          className={`relative text-foreground/90 transition-colors hover:text-foreground/60 ${
            location.pathname === "/" || location.pathname === "/dashboard"
              ? "after:absolute after:-bottom-[1.5px] after:left-0 after:h-[2px] after:w-full after:bg-foreground"
              : ""
          }`}
        >
          ACCUEIL
        </Link>
        <Link
          to="/meeting"
          className={`relative text-foreground/90 transition-colors hover:text-foreground/60 ${
            location.pathname === "/meeting"
              ? "after:absolute after:-bottom-[1.5px] after:left-0 after:h-[2px] after:w-full after:bg-foreground"
              : ""
          }`}
        >
          RENDEZ-VOUS
        </Link>
        <Link
          to="/faq"
          className={`relative text-foreground/90 transition-colors hover:text-foreground/60 ${
            location.pathname === "/faq"
              ? "after:absolute after:-bottom-[1.5px] after:left-0 after:h-[2px] after:w-full after:bg-foreground"
              : ""
          }`}
        >
          FAQ
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-col items-center gap-1">
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
                asChild
                onClick={() => {
                  logout();
                }}
              >
                <Link to="/">
                  <LogOut />
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
      </div>
    </header>
  );
}
