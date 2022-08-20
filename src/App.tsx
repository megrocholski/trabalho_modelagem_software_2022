import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import React from "react";
import DrawerMenu from "./components/DrawerMenu";
import Dashboard from "./pages/Admin/Home";
import { Login } from "./pages/Login";
import { Home } from "./pages/Dashboard";
import { colors } from "./content/theme";
import { Courses } from "./pages/Admin/Courses";
import { Subjects } from "./pages/Admin/Subject";
import { AuthProvider } from "./hooks/auth";
import { Teachers } from "./pages/Admin/Teachers";

interface User {
  name: String;
  id: Number;
}

export const App = () => {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    // @ts-ignore
    <AuthProvider>
      <Box sx={{ backgroundColor: colors.dark }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/" element={<Home />} />
          <Route path="/courses/" element={<Courses />} />
          <Route path="/subject/" element={<Subjects />} />
          <Route path="/teachers/" element={<Teachers />} />
        </Routes>
      </Box>
    </AuthProvider>
  );
};
