import { SideBarButtons } from '../../components';
import { BoltIcon, ChartBarIcon, PlayIcon } from '@heroicons/react/24/outline';

export function Sidebar() {
  const buttons = [
    {
      name: 'Jouer',
      icon: <PlayIcon />,
    },
    {
      name: 'Duel',
      icon: <BoltIcon />,
    },
  ];

  return (
    <div className={'p-4 pl-6 flex flex-col justify-between items-center'}>
      <h1 className={'font-jockey text-4xl'}>Kusodu.</h1>
      <div className={'flex flex-col gap-4 w-full'}>
        {buttons.map((button) => {
          return <SideBarButtons icon={button.icon} name={button.name} />;
        })}
        <SideBarButtons name={'Statistiques'} icon={<ChartBarIcon />} />
      </div>
      <span className={'text-xs opacity-50 text-center cursor-default'}>
        Made with ❤️ by{' '}
        <a
          href={'https://www.linkedin.com/in/louis-bellefemine/'}
          target={'_blank'}
          className={'hover:underline'}
        >
          {' '}
          Louis Bellefemine
        </a>
      </span>
    </div>
  );
}
