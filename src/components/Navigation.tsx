import type { ReactNode } from "react";
import { Link } from "wouter";
import styles from "./Navigation.module.css";

function NavigationItem({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  return (
    <li className={styles.listItem}>
      <Link
        href={path}
        className={(active) => (active ? styles.active : styles.link)}
      >
        {children}
      </Link>
    </li>
  );
}

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <NavigationItem path="/top/1">Top</NavigationItem>
        <NavigationItem path="/new/1">New</NavigationItem>
        <NavigationItem path="/ask/1">Ask</NavigationItem>
        <NavigationItem path="/show/1">Show</NavigationItem>
        <NavigationItem path="/jobs/1">Jobs</NavigationItem>
      </ul>
    </nav>
  );
}
