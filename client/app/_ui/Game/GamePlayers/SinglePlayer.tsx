import { useParams } from 'next/navigation';
import { Copy01Icon } from '@/_icons';
import { useState } from 'react';

export function SinglePlayer() {
  const { id } = useParams();

  const [copiedToClipboard, setCopiedtoClipboard] = useState<boolean>(false);

  const handleCopyToClipboard = () => {
    if (!id || Array.isArray(id)) {
      return;
    }

    setCopiedtoClipboard(true);

    navigator.clipboard.writeText(id);

    setTimeout(() => {
      setCopiedtoClipboard(false);
    }, 3000);
  };

  return (
    <div>
      <button
        onClick={handleCopyToClipboard}
        className={
          'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-dark p-4 hover:border-primary'
        }
      >
        {copiedToClipboard ? (
          <>Code de la partie copié !</>
        ) : (
          <>
            <Copy01Icon />
            Code d&apos;invitation
          </>
        )}
      </button>
    </div>
  );
}
