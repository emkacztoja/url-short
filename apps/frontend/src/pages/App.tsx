// @ts-nocheck
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ShortenForm } from '../features/shortener/ShortenForm';
import { ThemeToggle } from '../components/ThemeToggle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './Admin/Login';
import AdminUrls from './Admin/Urls';

const queryClient = new QueryClient();

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme}>
        <div className="min-h-screen bg-background text-foreground">
          <BrowserRouter>
            <div className="container mx-auto p-4 max-w-2xl">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold">i.emkacz.dev</h1>
                <div className="flex items-center gap-4">
                  <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
                </div>
              </div>

              <Routes>
                <Route path="/" element={<ShortenForm />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminUrls />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </QueryClientProvider>
  );
}
