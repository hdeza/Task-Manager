import AddTask from "./AddTask";

export default function Header() {
  return (
    <>
      <header className="flex justify-between p-4 bg-blue-500 text-white ">
        <h1 className="font-semibold text-3xl ">Gestor de Tareas</h1>
        <AddTask />
      </header>
    </>
  );
}
