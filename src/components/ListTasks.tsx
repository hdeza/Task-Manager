import Task from "./Task";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
}
export default function ListTasks() {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tareas"));
        const dataList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as {
            titulo: string;
            descripcion: string;
            fecha: string;
            hora: string;
          }),
        }));
        setData(dataList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const taskList: JSX.Element[] = [];
  data.forEach((dt) => {
    taskList.push(
      <Task
        key={dt.id}
        id={dt.id}
        titulo={dt.titulo}
        descripcion={dt.descripcion}
        fecha={dt.fecha}
        hora={dt.hora}
      />
    );
  });

  return <div className="flex flex-wrap justify-evenly ">{taskList}</div>;
}
