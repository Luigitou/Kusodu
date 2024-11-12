'use client';

export function Header() {
  return (
    <div className={'flex items-center justify-between'}>
      <h1 className={'text-3xl md:px-8'}>Kusodu.</h1>
      <div>
        <button>Profile</button>
      </div>
    </div>
  );
}
