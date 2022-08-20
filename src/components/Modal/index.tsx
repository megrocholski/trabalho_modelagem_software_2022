import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { colors } from "../../content/theme";
import { IModal } from "../../content/interface";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import api from "../../services/api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComp() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("@SAU:User:token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.post(
      "/admin/course",
      {
        name: data.name,
        total_period: data.total_period,
        disabled: false,
      },
      config
    );
    // console.log(res.data);
	
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          mt: 1,
          backgroundColor: colors.blue,
          borderRadius: 5,
          padding: 1,
          paddingRight: 2,
          paddingLeft: 2,
          fontSize: 15,
          textTransform: "none",
          width: "20%",
          color: colors.white,
        }}
      >
        Adicionar novo curso
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cadastro de Novo Curso
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Nome"
              {...register("name", { required: true })}
              sx={{
                color: colors.dark,
                input: { color: colors.dark },
                "& fieldset": { borderColor: colors.dark },
                "& label": { color: colors.dark },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: colors.blue,
                },
                mr: 2,
                width: "100%",
              }}
            />
            <TextField
              label="Horas Totais"
              {...register("total_period", { required: true })}
              sx={{
                color: colors.dark,
                input: { color: colors.dark },
                "& fieldset": { borderColor: colors.dark },
                "& label": { color: colors.dark },
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: colors.blue,
                },
                mr: 2,
                width: "100%",
              }}
            />
            <Button
              type="submit"
              sx={{
                mt: 1,
                backgroundColor: colors.blue,
                borderRadius: 5,
                padding: 1,
                paddingRight: 2,
                paddingLeft: 2,
                fontSize: 15,
                textTransform: "none",
                width: "30%",
                color: colors.white,
              }}
            >
              Adicionar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
