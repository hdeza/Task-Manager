import { forwardRef, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [dateTime, setDateTime] = useState(new Date());

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

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tareas"), {
        titulo: title,
        descripcion: description,
        fecha: dateTime.toLocaleDateString(),
        hora: dateTime.toLocaleTimeString(),
      });

      window.location.reload();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <>
      <button
        className="bg-black p-2 rounded-md shadow-lg"
        onClick={handleClickOpen}
      >
        Añadir Tarea
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
          <strong>Nueva Tarea</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese el titulo y una descripción de la tarea
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
            onClick={title !== "" ? addTask : undefined}
          >
            Añadir
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
