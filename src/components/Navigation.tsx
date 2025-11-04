import type { ReactNode } from "react";
import { Link, useRoute } from "wouter";
import styles from "./Navigation.module.css";

function NavigationItem({
  path,
  pattern,
  children,
}: {
  path: string;
  pattern: string;
  children: ReactNode;
}) {
  const [isActive] = useRoute(pattern);

  return (
    <li className={styles.listItem}>
      <Link href={path} className={isActive ? styles.active : styles.link}>
        {children}
      </Link>
    </li>
  );
}

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <NavigationItem path="/top/1" pattern="/top/:page">
          Top
        </NavigationItem>
        <NavigationItem path="/new/1" pattern="/new/:page">
          New
        </NavigationItem>
        <NavigationItem path="/ask/1" pattern="/ask/:page">
          Ask
        </NavigationItem>
        <NavigationItem path="/show/1" pattern="/show/:page">
          Show
        </NavigationItem>
        <NavigationItem path="/jobs/1" pattern="/jobs/:page">
          Jobs
        </NavigationItem>
      </ul>
    </nav>
  );
}
