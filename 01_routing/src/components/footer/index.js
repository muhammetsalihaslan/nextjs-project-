import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      Made by;
      <Link href="https://github.com/">Salih</Link>
    </footer>
  );
}

export default Footer;
