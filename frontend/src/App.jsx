import { useEffect, useState } from 'react';
import { api } from './api/client.js';
import { rupiah } from './utils/format.js';

export default function App() {
  const [menus, setMenus] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    api('/menus')
      .then((data) => {
        setMenus(data);
        setStatus('ok');
      })
      .catch((err) => {
        setMessage(err.message);
        setStatus('error');
      });
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">macyourmoo</h1>
      <p className="mt-1 text-gray-600">Daftar menu</p>

      {status === 'loading' && <p className="mt-8 text-gray-500">Memuat menu…</p>}

      {status === 'error' && (
        <p className="mt-8 rounded border border-red-300 bg-red-50 p-3 text-red-700">
          Menu gagal dimuat: {message}. Cek VITE_API_URL dan FRONTEND_ORIGIN di backend.
        </p>
      )}

      {status === 'ok' && menus.length === 0 && (
        <p className="mt-8 text-gray-500">Belum ada menu.</p>
      )}

      {status === 'ok' && menus.length > 0 && (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {menus.map((m) => (
            <li key={m.id} className="rounded-lg border border-gray-200 p-4">
              <h2 className="font-semibold">{m.name}</h2>
              <p className="mt-1 text-gray-700">{rupiah(m.price)}</p>
              {!m.is_available && <p className="mt-2 text-sm text-red-600">Sedang tidak tersedia</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
