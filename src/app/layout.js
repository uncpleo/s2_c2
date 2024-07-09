'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/main.css';

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user && router.pathname !== '/login') {
      router.replace('/login');  // Redirige al login si el usuario no está autenticado
    }
  }, [router]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Application</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}







