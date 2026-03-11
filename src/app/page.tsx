import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/agenda.webp"
          alt="Anime Agenda hero image"
          fill
          sizes="100vw"
          priority
        />
      </section>

      <section className={styles.scrollLayer} aria-hidden="true" />
    </main>
  );
}
