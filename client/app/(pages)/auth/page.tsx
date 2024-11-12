import { Login, Register } from '@/ui';

export default function Auth() {
  return (
    <div className={'flex gap-8 rounded-lg bg-dark p-8'}>
      <div>
        <Login />
      </div>
      <span className={'w-[2px] grow rounded-lg bg-primary'}></span>
      <div>
        <Register />
      </div>
    </div>
  );
}
