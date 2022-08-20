import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DrawerMenu from "../../../components/DrawerMenu";
import { colors } from "../../../content/theme";
import Section from "../../../components/Section";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import api from "../../../services/api";
import { ITeacher, ICourse } from "../../../content/interface";
import { useForm } from "react-hook-form";

export const Subjects = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const token = localStorage.getItem("@SAU:User:token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const resp = await api.post(
        "/admin/subject",
        {
          name: data.subject,
          total_hours: data.total_hours,
        },
        config
      );
      console.log(resp);
      const res = await api.post(
        "/admin/course/subject",
        {
          course: data.course,
          weekday: data.weekday,
          teacher_id: data.teacher,
          subject_id: resp.data.content.id,
          daytime: data.hour,
          year_id: data.year,
          classroom: data.classroom,
          // data.classrom
        },
        config
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <DrawerMenu />
      <Box
        sx={{
          mt: 5,
          ml: 5,
          padding: 2,
          width: "100%",
          alignSelf: "center",
          justifySelf: "center",
        }}
      >
        <Box
          boxShadow={1}
          sx={{ display: "flex", flexDirection: "column", padding: 3 }}
        >
          <Section title="Nova Disciplina" icon={ArticleOutlinedIcon} />
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
                Adicionar
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
