import { Header, Sidebar } from './layout';

function App() {
  return (
    <>
      <div className={'flex h-dvh w-dvw bg-dark text-white font-sans'}>
        <Sidebar />
        <div className={'flex flex-col h-dvh w-full'}>
          <Header />
          <div className={'bg-background grow rounded-2xl p-4 m-2'}>
            Content
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
