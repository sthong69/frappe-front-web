import { NAVBAR_HEIGHT } from "@/lib/styles/consts";
import React from "react";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const Page: React.FC<PageProps> = ({
  children,
  className,
  title,
  subtitle,
}) => {
  return (
    <div
      style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      className={`flex flex-1 flex-col p-8 ${className ?? ""}`}
    >
      <div className="p-4">
        <h2 className="font-semibold">{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      {children}
    </div>
  );
};

export default Page;
