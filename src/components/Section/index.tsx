import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { Component, ComponentElement, ComponentType } from "react";
import { colors } from "../../content/theme";

interface SectionInterface {
  title: String;
  icon: React.ComponentType;
  type?: String;
  // icon?: JSX.Element;
}

const Section: React.FC<SectionInterface> = ({ title, icon, type }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component={icon}
        sx={{ fontSize: type == "subtitle" ? 24 : 34, color: colors.blue }}
      />
      <Typography
        sx={{
          fontWeight: "bold",
          ml: 2,
          color: colors.white,
          "&: after": {
            content: '""',
            width: "50px",
            height: "4px",
            display: "flex",
            backgroundColor: colors.blue,
          },
        }}
        variant={type == "subtitle" ? "h4" : "h5"}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Section;
