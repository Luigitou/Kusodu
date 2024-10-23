import { SideBarButtons } from '../../components';
import { BoltIcon, ChartBarIcon, PlayIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export function Sidebar() {
  const buttons = [
    {
      name: 'Jouer',
      icon: <PlayIcon />,
      link: '/duo/1',
    },
    {
      name: 'Duel',
      icon: <BoltIcon />,
      link: '/duel/1',
    },
  ];

  return (
    <div className={'p-4 pl-6 flex flex-col justify-between items-center'}>
      <Link to={'/'}>
        <h1 className={'font-jockey text-4xl'}>Kusodu.</h1>
      </Link>
      <div className={'flex flex-col gap-4 w-full'}>
        {buttons.map((button, index) => {
          return (
            <SideBarButtons
              key={index}
              icon={button.icon}
              name={button.name}
              link={button.link}
            />
          );
        })}
        <SideBarButtons
          name={'Classement'}
          icon={<ChartBarIcon />}
          link={'/stats'}
        />
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
