import {Sidebar} from "./components";

function App() {

  return (
    <>
      <div className={"flex h-dvh w-dvw bg-dark text-white"}>
        <div className={"p-4"}><Sidebar/></div>
        <div className={"flex flex-col h-dvh w-dvw p-2 gap-2"}>
          <div className={"p-2"}>Header</div>
          <div className={"bg-background grow rounded-2xl p-4"}>Content</div>
        </div>
      </div>
    </>
  )
}

export default App
