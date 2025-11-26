import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { shortenUrl } from '../../lib/api';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ResultCard } from './components/ResultCard';

const formSchema = z.object({
  originalUrl: z.string().url('Enter a valid URL'),
  customAlias: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ShortenForm = () => {
  const [values, setValues] = useState<FormValues>({ originalUrl: '', customAlias: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: shortenUrl,
    onError: (err: any) => {
      // Handle structured errors thrown from API client
      if (err && typeof err === 'object' && 'status' in err) {
        if (err.status === 400 && err.data?.errors) {
          setErrorMessage(err.data.errors.map((e: any) => e.message).join(', '));
          return;
        }
        if (err.status === 409) {
          setErrorMessage(err.data?.message ?? 'Conflict');
          return;
        }
      }
      setErrorMessage('An unexpected error occurred.');
    },
    onSuccess: () => setErrorMessage(null),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      setErrorMessage(parsed.error.errors[0].message);
      return;
    }
    // Omit customAlias when it's empty so backend will generate a nanoid
    const payload: any = { ...parsed.data };
    if (payload.customAlias === '' || (typeof payload.customAlias === 'string' && payload.customAlias.trim() === '')) {
      delete payload.customAlias;
    }
    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
      <Input
        placeholder="https://example.com"
        value={values.originalUrl}
        onChange={(e) => setValues({ ...values, originalUrl: e.target.value })}
      />
      <Input
        placeholder="custom alias (optional)"
        value={values.customAlias ?? ''}
        onChange={(e) => setValues({ ...values, customAlias: e.target.value })}
      />
      <Button className="w-full" type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Generating...' : 'Generate short link'}
      </Button>
      {mutation.isSuccess && <ResultCard shortUrl={mutation.data.shortUrl} />}
    </form>
  );
};
