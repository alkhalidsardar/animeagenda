import Image from "next/image";
import loaderConfig from "@/config/loader.json";
import TopRightHamburger from "./components/TopRightHamburger";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <TopRightHamburger />

      {loaderConfig.showLoader && (
        <section className={styles.loader} aria-hidden="true">
          <div className={styles.loaderImageWrap}>
            <Image
              className={styles.loaderImage}
              src="/agenda.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 80vw, 420px"
              priority
            />
          </div>
        </section>
      )}

      <section className={styles.scrollLayer} aria-hidden="true" />
    </main>
  );
}
