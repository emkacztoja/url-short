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
  const mutation = useMutation({
    mutationFn: shortenUrl,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }
    mutation.mutate(parsed.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
