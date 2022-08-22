import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { colors } from "../../content/theme";
import { ICourses } from "../../content/interface";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Link } from "react-router-dom";
import api from "../../services/api";
import { ModalEdit } from "../ModalEdit";

export const ListComp = (props: ICourses) => {
  const [secondary, setSecondary] = React.useState(-1);
  const [third, setThird] = React.useState(-1);

  const handleFirstExpand = (i: number) => {
    if (i == secondary) {
      setSecondary(-1);
    } else {
      setSecondary(i);
    }
  };

  const handleSecondExpand = (i: number) => {
    if (i == third) {
      setThird(-1);
    } else {
      setThird(i);
    }
  };

  const handleDelete = async (id: any) => {
    const token = localStorage.getItem("@SAU:User:token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    if (id) {
      const res = await api.delete("/admin/subject", {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          subject_id: id,
        },
      });
      console.log(res);
    }
  };

  const handleEdit = async (data: any) => {
    const token = localStorage.getItem("@SAU:User:token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.patch(
      "/admin/subject",
      {
        id: data.id,
      },
      config
    );
    console.log(res);
  };

  return (
    <Box>
      <Typography>{props.title}</Typography>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          border: 1,
          borderColor: colors.blue,
          borderRadius: 5,
          padding: 1,
        }}
      >
        {props.courses.map((course, i) => (
          <Box sx={{ padding: 2 }}>
            {/* <Typography sx={{ mt: 4, mb: 2 }} component="div"></Typography> */}
            <List>
              <ListItem
                sx={{
                  borderBottom: 1,
                  borderColor: colors.blue,
                  width: "100%",
                  //   borderStyle: { display: "flex", justifySelf: "center" },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    sx={{
                      padding: 1,
                      borderRadius: "50%",
                      backgroundColor: colors.blue,
                    }}
                    onClick={() => handleFirstExpand(i)}
                  >
                    {secondary != -1 ? (
                      <KeyboardArrowUp sx={{ color: colors.white }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ color: colors.white }} />
                    )}
                  </IconButton>
                }
              >
                {/* <ListItemAvatar>
                  <Avatar> <FolderIcon /></Avatar>
                </ListItemAvatar> */}
                <ListItemText
                  //   primary="Single-line item"
                  //   secondary={secondary ? "Secondary text" : null}
                  sx={{ color: colors.white }}
                >
                  {course.name}
                </ListItemText>
              </ListItem>
              {secondary == i ? (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <List>
                    {course.years.map(
                      (year, i) => (
                        console.log(year),
                        (
                          <Box>
                            <ListItem
                              sx={{
                                borderBottom: 1,
                                borderColor: colors.blue,
                                width: "100%",
                              }}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  sx={{
                                    padding: 1,
                                    borderRadius: "50%",
                                    backgroundColor: colors.blue,
                                  }}
                                  onClick={() => handleSecondExpand(i)}
                                >
                                  {third != -1 ? (
                                    <KeyboardArrowUp
                                      sx={{ color: colors.white }}
                                    />
                                  ) : (
                                    <KeyboardArrowDownIcon
                                      sx={{ color: colors.white }}
                                    />
                                  )}
                                </IconButton>
                              }
                            >
                              <ListItemText sx={{ color: colors.white }}>
                                {year.period + 1}º
                              </ListItemText>
                            </ListItem>
                            <Box>
                              {third == i ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: 1,
                                  }}
                                >
                                  <List>
                                    {year.schedules.length == 0 ? (
                                      <ListItem
                                        sx={{
                                          borderBottom: 1,
                                          borderColor: colors.blue,
                                          width: "100%",
                                        }}
                                      >
                                        <ListItemText
                                          sx={{ color: colors.white }}
                                        >
                                          Nenhuma disciplina cadastrada.
                                        </ListItemText>
                                      </ListItem>
                                    ) : (
                                      year.schedules.map((schedule) => (
                                        <ListItem
                                          sx={{
                                            borderBottom: 1,
                                            borderColor: colors.blue,
                                            width: "100%",
                                          }}
                                          secondaryAction={
                                            <Box
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              {/* <IconButton
                                                edge="end"
                                                sx={{
                                                  padding: 1,
                                                  borderRadius: "50%",
                                                  backgroundColor: colors.blue,
                                                }}
                                                onClick={() =>
                                                  handleEdit(
                                                    schedule.subject?.id
                                                  )
                                                }
                                              >
                                                <EditOutlinedIcon
                                                  sx={{ color: colors.white }}
                                                />
                                              </IconButton> */}
                                              {/* <ModalEdit
                                                idCourse={course.id}
                                                year={year.id}
                                                subject={schedule.subject}
                                                idTeacher={schedule.teacher.id}
                                                idWeekday={schedule.weekday}
                                                idHour={schedule.daytime}
                                                classroom={schedule.classroom}
                                              /> */}
                                              <IconButton
                                                edge="end"
                                                sx={{
                                                  padding: 1,
                                                  borderRadius: "50%",
                                                  backgroundColor: colors.blue,
                                                }}
                                                onClick={() =>
                                                  handleDelete(
                                                    schedule.subject?.id
                                                  )
                                                }
                                              >
                                                <DeleteOutlinedIcon
                                                  sx={{ color: colors.white }}
                                                />
                                              </IconButton>
                                            </Box>
                                          }
                                        >
                                          <ListItemText
                                            sx={{ color: colors.white }}
                                          >
                                            {schedule.subject?.name}
                                            {schedule.subject?.disabled
                                              ? " - Desabilitado"
                                              : null}
                                          </ListItemText>
                                        </ListItem>
                                      ))
                                    )}
                                  </List>
                                  <Link
                                    to="/admin/subject"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <Button
                                      sx={{
                                        color: colors.white,
                                        backgroundColor: colors.blue,
                                        borderRadius: 5,
                                        width: "30%",
                                      }}
                                    >
                                      Adicionar nova disciplina
                                    </Button>
                                  </Link>
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        )
                        //   year.schedules?.length != 0 &&
                        //   <List>
                        /* year.schedules.map((schedule) => (
                        <ListItem>
                          <ListItemText>{schedule.subject?.name}</ListItemText>
                        </ListItem> */
                      )
                      //   </List>
                    )}
                  </List>
                </Box>
              ) : null}
            </List>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
