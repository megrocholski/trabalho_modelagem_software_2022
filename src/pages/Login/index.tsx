import React, { useCallback, useRef, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { colors } from "../../content/theme";
import { useAuth } from "../../hooks/auth";
import getValidationErrors from "../../util/getValidationErrors";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";

interface LoginFormData {
  email: string;
  password: string;
}

export const Login = () => {
  const { handleSubmit, register } = useForm();
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  let navigate = useNavigate();

  const onSubmit = async (data: any) => {
    // const res = await api.post("/user/signin", {
    //   email: data.email,
    //   password: data.password,
    // });
    // console.log(res);
    const res = await signIn({ email: data.email, password: data.password });
    console.log(res);
  };
//   if (localStorage.getItem("@SAU:User:token") != undefined) {
//     return <Navigate to="/home" replace />;
//   } else {
    return (
      <Container
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          boxShadow={1}
          sx={{
            backgroundColor: colors.darkOpact,
            //   widht: "100vw",
            //   height: "100%",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Box
            sx={{ backgroundColor: colors.dark, padding: 5, borderRadius: 5 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                component={"img"}
                src={logo}
                sx={{ width: 50, height: 50 }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: colors.white }}>
                  SAU - Sistema Acadêmico
                </Typography>
                <Typography sx={{ color: colors.white }}>
                  Universitário
                </Typography>
              </Box>
            </Box>
            <Box
              //   boxShadow={1}
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: colors.white }}>
                Seja bem vindo
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 1,
                  }}
                >
                  <TextField
                    label="Email"
                    {...register("email", { required: true })}
                    variant="outlined"
                    //   color="primary"
                    sx={{
                      input: { color: "white" },
                      "& fieldset": {
                        borderColor: "white",
                        //   "&:hover": { borderColor: colors.white },
                      },
                      // "&:hover fieldset": { borderColor: "white" },
                      // "&:hover MuiInputBase": { borderColor: "white" },
                      // "&:hover MuiTextField": { borderColor: "white" },
                      "& .MuiOutlinedInput-root:hover fieldset": {
                        borderColor: colors.blue,
                        //   "& label:hover": { color: colors.blue },
                      },
                      "& .MuiOutlinedInput-root:hover label": {
                        color: colors.blue,
                      },
                      // "& .MuiOutlinedInput-input &:hover fieldset": { borderColor: "white" },
                      // "& .MuiTextField-root &:hover fieldset": { borderColor: "white" },
                      "& label": { color: "white" },

                      marginBottom: 1,
                    }}
                  />
                  {/* <TextField placeholder="Usuário" sx={{"& label " : { color: "red" }, ".MuiOutlinedInput-root": { "&.Mui-focused fieldset": {borderColor: "red"} }}} /> */}
                  <TextField
                    label="Senha"
                    {...register("password", { required: true })}
                    variant="outlined"
                    type="password"
                    //   sx={{ color: colors.white }}
                    sx={{
                      input: { color: "white" },
                      "& fieldset": { borderColor: "white" },
                      "& label": { color: "white" },
                      "& .MuiOutlinedInput-root:hover fieldset": {
                        borderColor: colors.blue,
                        //   "& label:hover": { color: colors.blue },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ textTransform: "none" }}
                  >
                    Login
                  </Button>
                  <Button variant="text" sx={{ textTransform: "none" }}>
                    Esqueci a senha
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }
// };
