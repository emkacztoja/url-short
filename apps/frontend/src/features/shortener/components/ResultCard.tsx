import { Button } from '../../../components/Button';
import { useState } from 'react';
import QRCode from 'qrcode.react';

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
        <QRCode value={shortUrl} size={128} />
      </div>
    </div>
  );
};
