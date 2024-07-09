'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import Page from "../components/page.jsx";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <main className={styles.main}>
      <Page />
    </main>
  );
}





