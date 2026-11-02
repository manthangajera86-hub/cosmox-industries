import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function ButtonLink({ href, variant = "primary", className, onClick, children }: ButtonLinkProps) {
  return (
    <Link className={["btn", `btn-${variant}`, className].filter(Boolean).join(" ")} href={href} onClick={onClick}>
      {children}
      <svg className="btn-icon" viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
