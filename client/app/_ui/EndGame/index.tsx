import { useStore } from '@/_store';
import { Win } from '@/_ui/EndGame/Win';
import { Lost } from '@/_ui/EndGame/Lost';

export const EndGame = () => {
  const isGameOver = useStore(state => state.isGameOver);

  if (isGameOver === 'win') {
    return <Win />;
  } else if (isGameOver === 'lost') {
    return <Lost />;
  } else {
    return <></>;
  }
};
