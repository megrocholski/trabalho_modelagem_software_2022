import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DrawerMenu from "../../../components/DrawerMenu";
import Section from "../../../components/Section";
import { colors } from "../../../content/theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { ITeacher } from "../../../content/interface";

export const Teachers = () => {
  const { handleSubmit, register } = useForm();
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("@SAU:User:token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.post(
      "/admin/teacher",
      {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        rg: data.rg,
        password: data.password,
      },
      config
    );
    console.log(res.data);
  };

  useEffect(() => {
    async function handleGetTeachers() {
      try {
        const token = localStorage.getItem("@SAU:User:token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const resp = await api.get("/admin/teachers", config);
        console.log(resp.data);
        setTeachers(resp.data);
      } catch (error) {}
    }
    handleGetTeachers();
  }, [teachers]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: colors.dark,
        height: "100vh",
      }}
    >
      <DrawerMenu />
      <Box sx={{ p: 3 }}>
        <Section title="Novo(a) Professor(a)" icon={PeopleOutlinedIcon} />
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
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
          <Box sx={{ my: 2 }}>
            {teachers.map((teacher) => (
              <Box>
                <Typography
                  sx={{
                    color: colors.white,
                    borderBottom: 1,
                    borderColor: colors.blue,
                  }}
                >
                  {teacher.user.name} - {teacher.rf} - {teacher.user.email}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
