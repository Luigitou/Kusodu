'use client';

import { useStore } from '@/_store';
import classNames from 'classnames';
import { FloppyDiskIcon, Logout03Icon } from '@/_icons';
import { useRouter } from 'next/navigation';

const classnames = {
  wrapper: 'flex flex-col gap-4 w-full items-center justify-center md:flex-row',
  label: 'text-sm opacity-75 text-white pl-1 w-full',
  field:
    'px-4 py-2 rounded-lg bg-background text-white shadow-lg w-full outline-none focus:ring-2 focus:ring-primary',
};

export function Settings() {
  const user = useStore(state => state.user);
  const logout = useStore(state => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={'flex w-full flex-col gap-8'}>
      <h2 className={'text-center text-xl'}>Paramètres de votre compte</h2>
      <div className={classNames(classnames.wrapper)}>
        <label className={classNames(classnames.label)}>
          Nom d&apos;utilisateur
        </label>
        <input
          className={classNames(classnames.field)}
          value={user?.username}
        />
      </div>
      <div className={classNames(classnames.wrapper)}>
        <label className={classNames(classnames.label)}>Email</label>
        <input className={classNames(classnames.field)} value={user?.email} />
      </div>
      <div className={classNames(classnames.wrapper)}>
        <label className={classNames(classnames.label)}>Membre depuis</label>
        <input
          className={classNames(classnames.field)}
          value={formatDate(user?.createdAt)}
        />
      </div>
      <span className={'h-[2px] w-full rounded-full bg-primary'}></span>
      <div
        className={classNames(
          'flex flex-col items-center justify-center gap-4 md:flex-row',
        )}
      >
        <button
          className={classNames(
            'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary md:w-fit',
          )}
          onClick={handleLogout}
        >
          <Logout03Icon />
          Se déconnecter
        </button>
        <button
          className={classNames(
            'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-light px-8 py-3 shadow-xl hover:border-primary md:w-fit',
          )}
        >
          <FloppyDiskIcon />
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
