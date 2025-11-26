import { Button } from '../../../components/Button';
import { useState } from 'react';

type Props = {
  shortUrl: string;
};

export const ResultCard = ({ shortUrl }: Props) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(
    shortUrl
  )}`;

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4 shadow">
      <div className="font-medium">Short URL</div>
      <a className="text-blue-600" href={shortUrl} target="_blank" rel="noopener noreferrer">
        {shortUrl}
      </a>
      <div className="flex gap-2">
        <Button type="button" onClick={copy}>
          {copied ? 'Copied!' : 'Copy link'}
        </Button>
      </div>
      <div className="pt-4 border-t border-border text-center">
        <img src={qrSrc} alt="QR code" width={128} height={128} className="mx-auto" />
      </div>
    </div>
  );
};
