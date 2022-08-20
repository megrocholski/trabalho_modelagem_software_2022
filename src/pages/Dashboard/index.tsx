import React from "react";
import { Box } from "@mui/material";
import DrawerMenu from "../../components/DrawerMenu";
import Dashboard from "../Admin/Home";
import api from "../../services/api";
import { Navigate } from "react-router-dom";

export const Home = () => {
  //   const res = await api.post("user/checktoken", token);
  //   console.log(res);
//   console.log(token);
//   if (!token) {
//     return <Navigate to="/" replace />;
//   } else {
    return (
      <Box>
        <DrawerMenu />
        <Dashboard />
      </Box>
    );
//   }
};
