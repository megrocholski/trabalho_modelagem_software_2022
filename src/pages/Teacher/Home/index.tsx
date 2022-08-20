import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../../../content/theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export const TeacherHome = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          //   display: "flex",
          //   flexDirection: "row",
          "&: after": {
            content: '""',
            width: "50px",
            height: "4px",
            display: "flex",
            backgroundColor: colors.blue,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <HomeOutlinedIcon sx={{ color: colors.blue }} />
          <Typography>Início</Typography>
        </Box>
      </Box>
    </Box>
  );
};
