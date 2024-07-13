import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import UpdateTask from "./UpdateTask";

export default function Task({
  titulo,
  descripcion,
  fecha,
  hora,
  id,
}: {
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  id: string;
}) {
  async function handleDeleteTask(id: string) {
    try {
      await deleteDoc(doc(db, "tareas", id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }

  return (
    <div className="max-w-64 m-6 p-5 shadow-2xl rounded-md ">
      <div className="flex">
        <h2 className="font-bold">{titulo}</h2>
        <span className="ml-3 text-gray-400 text-sm text-right">
          {fecha} - {hora}
        </span>
      </div>
      <p className="my-4">{descripcion}</p>
      <div className="flex justify-end text-sm">
        <UpdateTask id={id} titulo={titulo} descripcion={descripcion} />

        <button
          onClick={() => handleDeleteTask(id)}
          className="bg-black text-white m-1 rounded-md px-4 py-1 shadow-md"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
