import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../../../content/theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import api from "../../../services/api";
import { ISchedule } from "../../../util/interfaces";

export const StudentHome = () => {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [load, setLoad] = useState<boolean>();

  useEffect(() => {
    async function handleListSchedule(): Promise<void> {
      try {
        const response = await api.get("/student/schedule");
        setSchedule(response.data);
        setLoad(true);
        console.log(schedule);
      } catch (err: any) {
        console.log(err?.response?.data.error);
      } finally {
        setLoad(false);
      }
    }
    handleListSchedule();
  }, [schedule]);
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
      {/* <Card schedule={schedule} /> */}
    </Box>
  );
};
