import Link from 'next/link';

export const Lost = () => {
  return (
    <div
      className={
        'flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-dark p-12'
      }
    >
      <div
        className={
          'flex flex-col items-center justify-center gap-4 text-center'
        }
      >
        <h1 className={'text-5xl font-bold'}>Quel dommage !</h1>
        <p className={'text-xl'}>
          Vous n'avez plus vie, mais vous pouvez réessayer une autre grille.
        </p>
      </div>
      <Link
        className={
          'flex w-fit items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary'
        }
        href={'/game'}
      >
        Rejouer
      </Link>
    </div>
  );
};
