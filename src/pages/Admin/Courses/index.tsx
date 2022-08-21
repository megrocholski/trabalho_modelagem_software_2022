import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import DrawerMenu from "../../../components/DrawerMenu";
import Section from "../../../components/Section";

import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { ListComp } from "../../../components/List";
import api from "../../../services/api";
import { colors } from "../../../content/theme";
import Modal from "../../../components/Modal";
import ModalComp from "../../../components/Modal";
import { addCourse } from "../../../content/addCouse";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function handleGetCouses(): Promise<void> {
      try {
        const token = localStorage.getItem("@SAU:User:token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await api.get("/admin/courses", config);
        setCourses(response.data.content);
        console.log(response);
      } catch (error) {}
    }
    handleGetCouses();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: colors.dark,
      }}
    >
      <DrawerMenu />
      <Box
        sx={{
          p: 3,
          height: "100%",
          minHeight: "100vh",
          width: "100%",
          backgroundColor: colors.dark,
        }}
      >
        <Section title="Cursos" icon={BookOutlinedIcon} />
        <Box
          mt={3}
          mb={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            //   alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: colors.dark,
          }}
        >
          <ListComp courses={courses} title="" />
          <ModalComp />
        </Box>
      </Box>
    </Box>
  );
};
