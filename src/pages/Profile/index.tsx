import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import DrawerMenu from "../../components/DrawerMenu";
import { colors } from "../../content/theme";
import Section from "../../components/Section";
import { useForm } from "react-hook-form";
import api from "../../services/api";

export const Profile = () => {
  const { handleSubmit, register } = useForm();
  let Suser = localStorage.getItem("@SAU:User:user");
  if (!Suser) {
    Suser = "";
  }
  let user = JSON.parse(Suser);
  console.log(user);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("@SAU:User:token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.patch("/user", {
		name: data.name, 
		cpf: data.cpf,
		rg: data.rg
	}, config);
	console.log(res);
	user = res.data.content;
	localStorage.setItem("@SAU:User:user", JSON.stringify(user));
  };
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
      <Box sx={{ backgroundColor: colors.dark, p: 3 }}>
        <Section title="Perfil" icon={PermIdentityOutlinedIcon} />
        <Box sx={{ my: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Nome"
              defaultValue={user.name}
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
              label="CPF"
              defaultValue={user.cpf}
              type="number"
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
            //   value={user.rg}
			  defaultValue={user.rg}
              type="number"
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
              Salvar
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
