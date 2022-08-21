import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { colors } from "../../content/theme";
import { ICourse, IModal, ISubject, ITeacher } from "../../content/interface";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { ISchedule } from "../../util/interfaces";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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

export const ModalEdit = (
  id_course: number,
  year: number,
  subject: ISubject,
  id_teacher: number,
  id_weekday: number,
  id_hour: number,
  classroom: string
) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleSubmit, register } = useForm();
  const [teachers, setTeachers] = React.useState<ITeacher[]>([]);
  const [courses, setCourses] = React.useState<ICourse[]>([]);

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

  React.useEffect(() => {
    async function handleGetTeachers() {
      try {
        const token = localStorage.getItem("@SAU:User:token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await api.get("admin/teachers", config);
        console.log(res.data);
        setTeachers(res.data);
        const resp = await api.get("/admin/courses", config);
        console.log(resp.data);
        setCourses(resp.data.content);
      } catch (error) {}
    }
    handleGetTeachers();
  }, []);

  return (
    <div>
      <IconButton
        edge="end"
        sx={{
          padding: 1,
          borderRadius: "50%",
          backgroundColor: colors.blue,
        }}
        onClick={() => handleOpen}
      >
        <EditOutlinedIcon sx={{ color: colors.white }} />
      </IconButton>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 1,
                }}
              >
                <Box minWidth={120} sx={{ mr: 2, width: "100%" }}>
                  <FormControl
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root:hover": {
                        borderColor: colors.blue,
                      },
                    }}
                  >
                    <InputLabel id="label-course" sx={{ color: colors.white }}>
                      Curso
                    </InputLabel>
                    <Select
                      labelId="label-course"
                      label="Curso"
                      defaultValue={id_course}
                      {...register("course", { required: true })}
                      sx={{
                        input: { color: "white" },
                        "& fieldset": { borderColor: "white" },
                        "& label": { color: "white" },
                        "& .MuiOutlinedInput-root:hover input": {
                          borderColor: colors.blue,
                        },
                        color: colors.white,
                        width: "100%",
                      }}
                    >
                      {courses.map((course, i) => (
                        <MenuItem value={course.id}>{course.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box minWidth={120} sx={{ mr: 2, width: "100%" }}>
                  <FormControl
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root:hover": {
                        borderColor: colors.blue,
                      },
                    }}
                  >
                    <InputLabel id="label-year" sx={{ color: colors.white }}>
                      Ano
                    </InputLabel>
                    <Select
                      labelId="label-year"
                      label="Ano"
                      defaultValue={year}
                      {...register("year", { required: true })}
                      sx={{
                        input: { color: "white" },
                        "& fieldset": { borderColor: "white" },
                        "& label": { color: "white" },
                        "& .MuiOutlinedInput-root:hover input": {
                          borderColor: colors.blue,
                        },
                        color: colors.white,
                        width: "100%",
                      }}
                    >
                      {courses.map((course) =>
                        course.years.map((year) => (
                          <MenuItem value={year.id}>{year.id}</MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "center", padding: 1 }}
              >
                <TextField
                  label="Disciplina"
                  defaultValue={subject.name}
                  {...register("subject", { required: true })}
                  sx={{
                    color: colors.white,
                    input: { color: "white" },
                    "& fieldset": { borderColor: "white" },
                    "& label": { color: "white" },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: colors.blue,
                    },
                    width: "100%",
                    mr: 2,
                  }}
                />
                <Box minWidth={120} sx={{ mr: 2, width: "100%" }}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ color: colors.white }}
                    >
                      Professor(a)
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Professor"
                      defaultValue={id_teacher}
                      {...register("teacher", { required: true })}
                      sx={{
                        input: { color: "white" },
                        "& fieldset": { borderColor: "white" },
                        "& label": { color: "white" },
                        "& .MuiOutlinedInput-root:hover fieldset": {
                          borderColor: colors.blue,
                        },
                        color: colors.white,
                        width: "100%",
                      }}
                    >
                      {teachers.map((teacher: ITeacher) => (
                        <MenuItem value={teacher.id}>
                          {teacher.user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  //   mt: 1,
                  display: "flex",
                  //   justifyContent: "center",
                  padding: 1,
                  whidth: "50%",
                }}
              >
                <Box minWidth={120} sx={{ width: "100%", mr: 2 }}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="label-weekday" sx={{ color: colors.white }}>
                      Dia da Semana
                    </InputLabel>
                    <Select
                      labelId="label-weekday"
                      label="Dia da Semana"
                      defaultValue={id_weekday}
                      {...register("weekday", { required: true })}
                      sx={{
                        input: { color: "white" },
                        "& fieldset": { borderColor: "white" },
                        "& label": { color: "white" },
                        "& .MuiOutlinedInput-root:hover fieldset": {
                          borderColor: colors.blue,
                        },
                        color: colors.white,
                        width: "100%",
                      }}
                    >
                      <MenuItem value={0}>Segunda-feira</MenuItem>
                      <MenuItem value={1}>Terça-feira</MenuItem>
                      <MenuItem value={2}>Quarta-feira</MenuItem>
                      <MenuItem value={3}>Quinta-feira</MenuItem>
                      <MenuItem value={4}>Sexta-feira</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box minWidth={120} sx={{ mr: 2, width: "100%" }}>
                  <FormControl
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root:hover": {
                        borderColor: colors.blue,
                      },
                    }}
                  >
                    <InputLabel id="label-hour" sx={{ color: colors.white }}>
                      Horário
                    </InputLabel>
                    <Select
                      labelId="label-hour"
                      label="Horário"
                      defaultValue={id_hour}
                      {...register("hour", { required: true })}
                      sx={{
                        input: { color: "white" },
                        "& fieldset": { borderColor: "white" },
                        "& label": { color: "white" },
                        "& .MuiOutlinedInput-root:hover input": {
                          borderColor: colors.blue,
                        },
                        color: colors.white,
                        width: "100%",
                      }}
                    >
                      <MenuItem value={0}>08:15 - 10:05</MenuItem>
                      <MenuItem value={1}>10:05 - 11:55</MenuItem>
                      <MenuItem value={2}>13:30 - 15:20</MenuItem>
                      <MenuItem value={3}>15:20 - 17:05</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  padding: 1,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <TextField
                  label="Horas Totais"
                  defaultValue={subject.total_hours}
                  {...register("total_hours", { required: true })}
                  sx={{
                    color: colors.white,
                    input: { color: "white" },
                    "& fieldset": { borderColor: "white" },
                    "& label": { color: "white" },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: colors.blue,
                    },
                    mr: 2,
                    width: "100%",
                  }}
                />
                <TextField
                  label="Sala"
                  defaultValue={classroom}
                  {...register("classroom", { required: true })}
                  sx={{
                    color: colors.white,
                    input: { color: "white" },
                    "& fieldset": { borderColor: "white" },
                    "& label": { color: "white" },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: colors.blue,
                    },
                    mr: 2,
                    width: "100%",
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{ textTransform: "none", m: 3 }}
              >
                Salvar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
