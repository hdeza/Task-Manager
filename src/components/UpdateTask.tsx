import { forwardRef, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateTask({
  id,
  titulo,
  descripcion,
}: {
  id: string;
  titulo: string;
  descripcion: string;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [dateTime, setDateTime] = useState(new Date());

  // Actualizo los valores de título y descripción al iniciar el componente
  useEffect(() => {
    setTitle(titulo);
    setDescription(descripcion);
  }, [titulo, descripcion]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); //Limpio el intervalo cuando el componente se desmonte
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTask = async () => {
    try {
      await updateDoc(doc(db, "tareas", id), {
        titulo: title,
        descripcion: description,
        fecha: dateTime.toLocaleDateString(),
        hora: dateTime.toLocaleTimeString(),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <>
      <button
        className="bg-white  m-1 rounded-md px-4 py-1 shadow-md"
        onClick={handleClickOpen}
      >
        Editar
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>
          <strong>Modificar Tarea</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifique el titulo y una descripción de la tarea
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Titulo"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            name="title"
            label="Descripción"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="m-1 rounded-md px-4 shadow-md"
          >
            Cancelar
          </button>
          <button
            className="bg-black text-white m-1 rounded-md px-4 py-1 shadow-md"
            type="submit"
            onClick={title !== "" ? updateTask : undefined}
          >
            Editar
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
