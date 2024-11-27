'use client';

import { useStore } from '@/_store';

export default function Lobby() {
  const grid = useStore(state => state.grid);
  const host = useStore(state => state.host);

  console.log('grid', grid);
  console.log('host', host);

  return <div>Lobby</div>;
}
