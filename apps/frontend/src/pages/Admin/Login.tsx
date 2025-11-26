// @ts-nocheck
import { useState } from 'react';
import { setAdminApiKey } from '../../lib/api';

export default function AdminLogin() {
  const [key, setKey] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!key || key.length < 8) {
      setError('API key is required (min length 8)');
      return;
    }
    setAdminApiKey(key);
    // simple redirect to /admin
    window.location.href = '/admin';
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">API Key</label>
          <input
            className="w-full border rounded p-2"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
        </div>
      </form>
    </div>
  );
}
