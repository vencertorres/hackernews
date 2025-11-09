import { Link, useRoute } from "wouter";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [_, params] = useRoute("/:stories/:page");

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link
            href="/top/1"
            className={params?.stories === "top" ? styles.active : styles.link}
          >
            Top
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link
            href="/new/1"
            className={params?.stories === "new" ? styles.active : styles.link}
          >
            New
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link
            href="/ask/1"
            className={params?.stories === "ask" ? styles.active : styles.link}
          >
            Ask
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link
            href="/show/1"
            className={params?.stories === "show" ? styles.active : styles.link}
          >
            Show
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link
            href="/jobs/1"
            className={params?.stories === "jobs" ? styles.active : styles.link}
          >
            Jobs
          </Link>
        </li>
      </ul>
    </nav>
  );
}
