import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ICardAdmin } from "../../content/interface";
import { colors } from "../../content/theme";

export const CardComp = (props: ICardAdmin) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        background: colors.linear,
        marginBottom: 2,
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <Typography
                sx={{
                  mb: 1.5,
                  fontWeight: "bold",
                  fontSize: 20,
                  color: colors.dark,
                }}
                color="text.secondary"
              >
                {props.title}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.dark }}>
                {props.subtitle}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Link to={props.link} style={{ textDecoration: "none" }}>
              <Button
                size="small"
                sx={{
                  backgroundColor: colors.dark,
                  borderRadius: 5,
                  padding: 1,
                  paddingRight: 2,
                  paddingLeft: 2,
                  fontSize: 15,
                  textTransform: "none",
                }}
              >
                {props.label}
              </Button>
            </Link>
          </CardActions>
        </Box>
        <Box component={"img"} src={props.img} />
      </Box>
    </Card>
  );
};
