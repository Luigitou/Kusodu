import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game, Landing, NotFound, Stats } from '../pages';
import { Header, Sidebar } from '../layout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <div className={'flex h-dvh w-dvw bg-dark text-white font-sans'}>
        <Sidebar />
        <div className={'flex flex-col h-dvh w-full'}>
          <Header />
          <section className={'bg-background grow rounded-2xl p-4 m-2'}>
            <Routes>
              <Route path={'/'} element={<Landing />} />
              <Route path={'/duo/:id'} element={<Game />} />
              <Route path={'/duel/:id'} element={<Game />} />
              <Route path={'/stats'} element={<Stats />} />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
          </section>
        </div>
      </div>
    </BrowserRouter>
  );
}
