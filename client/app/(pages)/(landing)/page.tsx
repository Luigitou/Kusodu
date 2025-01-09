import { AiGameIcon, ChampionIcon, ZapIcon } from '@/_icons';
import { NavButtons } from '@/_components';
import Image from 'next/image';
import grid from './grid.png';

const buttons = [
  { label: 'Duel', href: '/duel', icon: <ZapIcon />, active: false },
  { label: 'Jouer', href: '/game', icon: <AiGameIcon />, active: true },
  { label: 'Classé', href: '/ranked', icon: <ChampionIcon />, active: false },
];

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-12 rounded-lg bg-dark p-12'>
      <div
        className={'relative flex flex-col items-center justify-center gap-4'}
      >
        <div className={'relative w-1/2 shadow-xl'}>
          <Image src={grid} alt={'Grid'} />
          <div
            className='absolute bottom-0 h-full w-full'
            style={{
              background:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.4))',
            }}
          ></div>
        </div>
        <div
          className={'flex w-full flex-col items-center justify-center gap-1'}
        >
          <h1 className={'text-3xl'}>Kusodu.</h1>
          <h2 className={'text-lg'}>
            Jouez au sudoku en coopération avec vos amis !
          </h2>
        </div>
      </div>
      <div
        className={
          'z-10 flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-background p-8 text-center shadow-xl'
        }
      >
        <h3 className={'text-xl'}>Lancer une partie !</h3>
        <div
          className={
            'flex w-full flex-col items-center justify-center gap-2 sm:flex-row'
          }
        >
          {buttons.map((button, index) => (
            <NavButtons
              key={index}
              label={button.label}
              href={button.href}
              icon={button.icon}
              active={button.active}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
