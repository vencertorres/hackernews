"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = ["top", "new", "ask", "show", "jobs"];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="h-14 space-x-4">
      {links.map((link) => (
        <Link
          key={link}
          className="inline-block capitalize  hover:text-neutral-400 data-[active=true]:font-medium data-[active=true]:text-orange-500"
          data-active={pathname?.startsWith(`/${link}`)}
          href={`/${link}/1`}
        >
          {link}
        </Link>
      ))}
    </nav>
  );
}
