import React from "react";
import { Box } from "@mui/material";
import DrawerMenu from "../../components/DrawerMenu";
import Dashboard from "../Admin/Home";
import api from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import { colors } from "../../content/theme";

export const Home = () => {
  //   const res = await api.post("user/checktoken", token);
  //   console.log(res);
  //   console.log(token);
  //   if (!token) {
  //     return <Navigate to="/" replace />;
  //   } else {

  const navigate = useNavigate();

  let Suser = localStorage.getItem("@SAU:User:user");
  if (!Suser) {
    Suser = "";
  }
  const user = JSON.parse(Suser);
//   if(user.type == 1){
// 	navigate('student/home/');
//   }else if(user.type == 2){
// 	navigate('teacher/home/');
//   }
  return (
    <Box sx={{ backgroundColor: colors.dark }}>
      <DrawerMenu />
      <Dashboard />
    </Box>
  );
  //   }
};
