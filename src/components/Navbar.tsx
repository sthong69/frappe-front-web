import { useState } from "react";
import { User } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

export default function Navbar() {
  const [isConnected] = useState(false);
  const location = useLocation();

  return (
    <header className="border-b bg-transparent px-8">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <nav className="flex flex-1 items-center justify-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`relative text-foreground/90 transition-colors hover:text-foreground/60 ${
              location.pathname === "/"
                ? "after:absolute after:-bottom-[1.5px] after:left-0 after:h-[2px] after:w-full after:bg-foreground"
                : ""
            }`}
          >
            ACCUEIL
          </Link>
          <Link
            to="/rendez-vous"
            className={`relative text-foreground/90 transition-colors hover:text-foreground/60 ${
              location.pathname === "/rendez-vous"
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
          <div className="flex flex-col items-center gap-1">
            <User className="h-6 w-6" />
            <span className="text-[10px] font-medium">
              {isConnected ? "CONNECTÉ" : "HORS CONNEXION"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
