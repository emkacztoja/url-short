// @ts-nocheck
import { useEffect, useState } from 'react';
import { fetchAdminUrls, updateUrl, deleteUrl, setAdminApiKey } from '../../lib/api';

export default function AdminUrls() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const perPage = 20;

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminUrls({ page, perPage, q: q || undefined });
      setItems(res.items);
      setTotal(res.total);
    } catch (err: any) {
      // if unauthorized, clear key and redirect to login
      if (err?.status === 401) {
        setAdminApiKey(null);
        window.location.href = '/admin/login';
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onToggle = async (shortId: string, isActive: boolean) => {
    await updateUrl(shortId, { isActive: !isActive });
    load();
  };

  const onDelete = async (shortId: string) => {
    if (!confirm('Delete this URL? This is irreversible.')) return;
    await deleteUrl(shortId);
    load();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Admin - URLs</h2>
        <div>
          <button onClick={() => { setAdminApiKey(null); window.location.href = '/admin/login'; }} className="px-3 py-1 border rounded">Logout</button>
        </div>
      </div>
      <div className="mb-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Search by shortId or original URL"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="mt-2">
          <button onClick={() => { setPage(1); load(); }} className="px-3 py-1 bg-blue-600 text-white rounded">Search</button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left p-2">Short</th>
                <th className="text-left p-2">Original URL</th>
                <th className="text-left p-2">Clicks</th>
                <th className="text-left p-2">Active</th>
                <th className="text-left p-2">Created</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className={!it.isActive ? 'opacity-50' : ''}>
                  <td className="p-2">{it.shortId}</td>
                  <td className="p-2 break-words max-w-md">{it.originalUrl}</td>
                  <td className="p-2">{it.clicks}</td>
                  <td className="p-2">{it.isActive ? 'Yes' : 'No'}</td>
                  <td className="p-2">{new Date(it.createdAt).toLocaleString()}</td>
                  <td className="p-2">
                    <button onClick={() => onToggle(it.shortId, it.isActive)} className="mr-2 px-2 py-1 border rounded">{it.isActive ? 'Deactivate' : 'Activate'}</button>
                    <button onClick={() => onDelete(it.shortId)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div>Showing page {page} — {total} total</div>
        <div className="space-x-2">
          <button onClick={() => setPage(Math.max(1, page - 1))} className="px-3 py-1 border rounded">Prev</button>
          <button onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
