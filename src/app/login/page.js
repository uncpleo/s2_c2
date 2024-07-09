'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/main.css';

async function authenticate(username, password) {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const user = await res.json();
    return user;
  }
  throw new Error('Fallo en la autenticación');
}

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authenticate(form.username, form.password);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/'); 
    } catch (err) {
      setError('Usuario o contraseña inválidos');
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='loginform'>
        <div className='div-container'>
          <h2>Ingresar al Aplicativo</h2>
        </div>
        <div className='div-container'>
          <label>Usuario:</label>
          <input className='form-input1' type="text" name="username" value={form.username} onChange={handleChange} />
        </div>
        <div className='div-container'>
          <label>Contraseña:</label>
          <input className='form-input1' type="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <div className='div-container'>
          {error && <p className='error'>{error}</p>}
          <button className='main-button' type="submit">Ingresar</button>
        </div>
      </form>
    </div>
  );
}

