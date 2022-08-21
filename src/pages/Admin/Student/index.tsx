import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DrawerMenu from "../../../components/DrawerMenu";
import Section from "../../../components/Section";
import FaceIcon from "@mui/icons-material/Face";
import { colors } from "../../../content/theme";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import {
  ICourse,
  IStudent,
  IStudentInCourse,
} from "../../../content/interface";

export const AdminStudent = () => {
  const { handleSubmit, register } = useForm();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [students, setStudents] = useState<IStudentInCourse[]>([]);
  useEffect(() => {
    async function handleGetCourses() {
      try {
        const token = localStorage.getItem("@SAU:User:token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const resp = await api.get("/admin/courses", config);
        console.log(resp.data);
        setCourses(resp.data.content);
        const res = await api.get("/admin/students", config);
        console.log(res.data);
        setStudents(res.data.content);
      } catch (error) {}
    }
    handleGetCourses();
  }, [students]);
  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("@SAU:User:token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.post(
      "/admin/student",
      {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        rg: data.rg,
        password: data.password,
        course_id: data.course_id,
      },
      config
    );
    console.log(res.data);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: colors.dark,
      }}
    >
      <DrawerMenu />
      <Box sx={{ p: 3 }}>
        <Section title="Novo(a) Aluno(a)" icon={FaceIcon} />
        <Box sx={{ my: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Nome"
              {...register("name", { required: true })}
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
                mb: 1,
              }}
            />
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: true })}
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
                mb: 1,
              }}
            />
            <TextField
              label="CPF"
              {...register("cpf", { required: true })}
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
                mb: 1,
              }}
            />
            <TextField
              label="RG"
              {...register("rg", { required: true })}
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
                mb: 1,
              }}
            />
            <TextField
              label="Senha"
              {...register("password", { required: true })}
              type="password"
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
                  {...register("course_id", { required: true })}
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
            <Button
              type="submit"
              variant="contained"
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
              Adicionar
            </Button>
          </form>
        </Box>
        <Box>
          {students.map((student) => (
            <Box>
              <Typography
                sx={{
                  color: colors.white,
                  borderBottom: 1,
                  borderColor: colors.blue,
                }}
              >
                {student.user.name} - {student.ra} - {student.course.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
