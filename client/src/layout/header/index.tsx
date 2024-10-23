import { LanguageIcon, UserIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../../components';

export function Header() {
  return (
    <div className={'flex p-4 pb-2 pr-2 items-center justify-end'}>
      <div className={'flex gap-4'}>
        <IconButton icon={<LanguageIcon />} name={'Language'} />
        <IconButton icon={<UserIcon />} name={'Profile'} />
      </div>
    </div>
  );
}
