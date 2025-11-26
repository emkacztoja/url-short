import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ShortenForm } from '../features/shortener/ShortenForm';
import { ThemeToggle } from '../components/ThemeToggle';

const queryClient = new QueryClient();

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme}>
        <div className="min-h-screen bg-background text-foreground">
          <div className="container mx-auto p-4 max-w-2xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-semibold">i.emkacz.dev</h1>
              <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            </div>
            <ShortenForm />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

