'use client';

export function Header() {
  return (
    <div className={'flex items-center justify-between'}>
      <h1 className={'px-8 text-3xl'}>Kusodu.</h1>
      <div>
        <button>Profile</button>
      </div>
    </div>
  );
}
