"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import styles from "./TopRightHamburger.module.css";

const IconHome = () => (
  <svg viewBox="0 0 24 24" className={styles.sidebarItemIcon} aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 3.25a1 1 0 0 1 .67.26l7 6.2a1 1 0 0 1 .33.75V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5h-2v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.29a1 1 0 0 1 .33-.75l7-6.2A1 1 0 0 1 12 3.25Z"
    />
  </svg>
);

const IconStocks = () => (
  <svg viewBox="0 0 24 24" className={styles.sidebarItemIcon} aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 17l5-5 3 3 8-8M14 7h6v6"
    />
  </svg>
);

const IconCommunity = () => (
  <svg viewBox="0 0 24 24" className={styles.sidebarItemIcon} aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 7a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm10.5 14v-2a4 4 0 0 0-3-3.87M14.5 4.13a3.5 3.5 0 0 1 0 6.74"
    />
  </svg>
);

const IconGuide = () => (
  <svg viewBox="0 0 24 24" className={styles.sidebarItemIcon} aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 0 4 23V5.5ZM4 5.5A2.5 2.5 0 0 1 6.5 8H20"
    />
  </svg>
);

const IconDoor = () => (
  <svg viewBox="0 0 24 24" className={styles.logoutIcon} aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 4h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6M10 17l-3-3 3-3M7 14h8M4 4h6a1 1 0 0 1 1 1v3M4 20h6a1 1 0 0 0 1-1v-3"
    />
  </svg>
);

export default function TopRightHamburger() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signedInUser, setSignedInUser] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return window.localStorage.getItem("animeagenda_user");
  });
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextUser = username.trim();

    if (!nextUser || !password) {
      setAuthError("Enter username and password.");
      return;
    }

    setSignedInUser(nextUser);
    window.localStorage.setItem("animeagenda_user", nextUser);
    setAuthError("");
    setPassword("");
  }

  function handleLogout() {
    setSignedInUser(null);
    window.localStorage.removeItem("animeagenda_user");
    setUsername("");
    setPassword("");
    setAuthError("");
  }

  return (
    <>
      <div className={styles.buttonWrapper}>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={`${styles.button} ${open ? styles.buttonOpen : ""}`}
        >
          <svg
            viewBox="0 0 100 100"
            className={`${styles.ham} ${styles.hamRotate} ${styles.ham1} ${
              open ? styles.active : ""
            }`}
          >
            <path
              className={`${styles.line} ${styles.top}`}
              d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
            />
            <path className={`${styles.line} ${styles.middle}`} d="m 30,50 h 40" />
            <path
              className={`${styles.line} ${styles.bottom}`}
              d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
            />
          </svg>
        </button>
      </div>

      {signedInUser && (
        <div className={styles.userStatus}>
          <span className={styles.userName}>@{signedInUser}</span>
          <button type="button" className={styles.logoutButton} onClick={handleLogout} aria-label="Log out">
            <IconDoor />
          </button>
        </div>
      )}

      {!signedInUser && (
        <div className={styles.wrapper}>
          <form className={styles.authPanel} onSubmit={handleAuthSubmit}>
            <p className={styles.authLabel}>Account</p>

            <div className={styles.authFields}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="username"
                aria-label="Username"
                className={styles.authInput}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                aria-label="Password"
                className={styles.authInput}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {authError && <p className={styles.authError}>{authError}</p>}

            <button type="submit" className={`${styles.authButton} ${styles.authButtonPrimary}`}>
              Sign up / Login
            </button>
          </form>
        </div>
      )}

      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <nav className={styles.sidebarNav}>
          <Link
            href="/"
            className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}
            onClick={() => setOpen(false)}
          >
            <IconHome />
            <span className={styles.sidebarItemLabel}>Home</span>
          </Link>

          <button type="button" className={styles.sidebarItem}>
            <IconStocks />
            <span className={styles.sidebarItemLabel}>Stocks</span>
          </button>

          <button type="button" className={styles.sidebarItem}>
            <IconCommunity />
            <span className={styles.sidebarItemLabel}>Community</span>
          </button>

          <button type="button" className={styles.sidebarItem}>
            <IconGuide />
            <span className={styles.sidebarItemLabel}>Guide</span>
          </button>
        </nav>
      </aside>

      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
