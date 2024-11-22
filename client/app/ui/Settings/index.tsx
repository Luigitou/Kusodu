import { useStore } from '@/store';

export function Settings() {
  const user = useStore(state => state.user);
  console.log('user', user);

  return (
    <div className={'flex w-full flex-col gap-8'}>
      <h2>Paramètres de votre compte</h2>
      <span>{user?.username}</span>
    </div>
  );
}
