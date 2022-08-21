import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../../../content/theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Section from "../../../components/Section";
import DrawerMenu from "../../../components/DrawerMenu";

export const TeacherHome = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
		height: '100vh',
        backgroundColor: colors.dark,
      }}
    >
      <DrawerMenu />
      <Box
        sx={{
          //   display: "flex",
          //   flexDirection: "row",
		  p: 3,
        }}
      >
        <Section title="Início" icon={HomeOutlinedIcon} />
      </Box>
    </Box>
  );
};
