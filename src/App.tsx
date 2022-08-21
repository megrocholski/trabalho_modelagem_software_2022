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
import { Warnings } from "./pages/Admin/Warnings";
import { Profile } from "./pages/Profile";
import { TeacherHome } from "./pages/Teacher/Home";
import { AdminStudent } from "./pages/Admin/Student";

interface User {
  name: String;
  id: Number;
}

export const App = () => {
  //   const [user, setUser] = React.useState<User | null>(null);
  //   const user = localStorage.getItem("@SAU:User:user");
  return (
    // @ts-ignore
    <AuthProvider>
      <Box sx={{ backgroundColor: colors.dark }}>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/home/" element={<Home />} /> */}
          <Route path="/admin/home/" element={<Home />} />
          <Route path="/admin/courses/" element={<Courses />} />
          <Route path="/admin/subject/" element={<Subjects />} />
          <Route path="/admin/teachers/" element={<Teachers />} />
          <Route path="/admin/warnings/" element={<Warnings />} />
          <Route path="/admin/student/" element={<AdminStudent />} />
          <Route path="profile/" element={<Profile />} />
          {/* <Route path="/teacher"> */}
          <Route path="/teacher/home/" element={<TeacherHome />} />
          {/* </Route> */}
          {/* if(user.type == 1){<Route path="/profile/" element={<Profile />} />}
          else if (user.type == 2)
          {
            <>
              <Route path="/home/" element={<Home />} />
              <Route path="/courses/" element={<Courses />} />
              <Route path="/subject/" element={<Subjects />} />
              <Route path="/teachers/" element={<Teachers />} />
              <Route path="/warnings/" element={<Warnings />} />
              <Route path="/profile/" element={<Profile />} />
            </>
          }
          else{} */}
        </Routes>
      </Box>
    </AuthProvider>
  );
};

// function RequireAuth({ children }: { children: JSX.Element }) {
//   // let auth = useAuth();
//   // let location = useLocation();
//   let Suser = localStorage.getItem("@SAU:User:user");
//   if (!Suser) {
//     Suser = "";
//   }
//   const user = JSON.parse(Suser);

//   if (user.type == 1) {
//     //ALUNO
//     return (
//       <Routes>
//         <Route path="/home/" element={<Home />} />
//         <Route path="/courses/" element={<Courses />} />
//         <Route path="/subject/" element={<Subjects />} />
//         <Route path="/teachers/" element={<Teachers />} />
//         <Route path="/warnings/" element={<Warnings />} />
//         <Route path="/profile/" element={<Profile />} />
//       </Routes>
//       //    <Navigate to="/login" state={{ from: location }} replace />
//     );
//   } else if (user.type == 2) {
//     return (
//       <Routes>
//         <Route path="/home/" element={<TeacherHome />} />
//         {/* <Route path="/courses/" element={<Courses />} />
//         <Route path="/subject/" element={<Subjects />} />
//         <Route path="/teachers/" element={<Teachers />} />
//         <Route path="/warnings/" element={<Warnings />} />
//         <Route path="/profile/" element={<Profile />} /> */}
//       </Routes>
//       //    <Navigate to="/login" state={{ from: location }} replace />
//     );
//   }

//   return children;
// }
