import Link from 'next/link';

export const Win = () => {
  console.log('win game');

  return (
    <div
      className={
        'flex w-full flex-col items-center justify-center gap-2 bg-dark p-12'
      }
    >
      <div
        className={
          'flex flex-col items-center justify-center gap-2 text-center'
        }
      >
        <h1 className={'text-5xl font-bold'}>Félicitations !</h1>
        <p className={'text-xl'}>Vous avez réussi à terminer cette grille.</p>
      </div>
      <Link href={'/game'}>Rejouer</Link>
    </div>
  );
};
