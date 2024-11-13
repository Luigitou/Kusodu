import { Register } from '@/ui';

export default function Auth() {
  return (
    <div
      className={
        'flex items-center justify-center gap-8 rounded-lg bg-dark p-12'
      }
    >
      <div className={''}>
        <Register />
      </div>
    </div>
  );
}
