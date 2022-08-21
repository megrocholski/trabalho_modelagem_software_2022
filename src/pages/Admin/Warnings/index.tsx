import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DrawerMenu from "../../../components/DrawerMenu";
import Section from "../../../components/Section";
import { colors } from "../../../content/theme";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { IWarning } from "../../../content/interface";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { color } from "@mui/system";

export const Warnings = () => {
  const { handleSubmit, register } = useForm();
  const [warnings, setWarnings] = useState<IWarning[]>([]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("@SAU:User:token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.post(
      "/admin/warning",
      {
        title: data.title,
        text: data.text,
      },
      config
    );
    console.log(res.data);
  };

  const handleChange = () => {};

  const handleDelete = async (id: any) => {
	const token = localStorage.getItem("@SAU:User:token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
	const res = await api.delete('/admin/warning',{
		headers: { Authorization: `Bearer ${token}` },
        data: {
          warning_id: id,
        },
	});
  };
  useEffect(() => {
    async function handleGetWarnings() {
      try {
        const token = localStorage.getItem("@SAU:User:token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const resp = await api.get("/user/warnings", config);
		console.log(resp);
        setWarnings(resp.data.content);
      } catch (error) {}
    }
    handleGetWarnings();
  }, [warnings]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: colors.dark,
        height: "100%",
      }}
    >
      <DrawerMenu />
      <Box
        sx={{
          backgroundColor: colors.dark,
          p: 3,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Section title="Avisos" icon={LibraryAddCheckOutlinedIcon} />
        <Box sx={{ mt: 2 }}>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Título"
                {...register("title", { required: true })}
                sx={{
                  color: colors.white,
                  input: { color: "white" },
                  "& fieldset": { borderColor: "white" },
                  "& label": { color: "white" },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: colors.blue,
                  },
                  width: "100%",
                  mr: 2,
                  mb: 1,
                }}
              />
              <TextField
                label="Texto"
                type="text"
                {...register("text", { required: true })}
                sx={{
                  color: colors.white,
                  input: { color: "white" },
                  "& fieldset": { borderColor: "white" },
                  "& label": { color: "white" },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: colors.blue,
                  },
                  width: "100%",
                  mr: 2,
                  mb: 1,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: colors.blue,
                  borderRadius: 5,
                  padding: 1,
                  paddingRight: 2,
                  paddingLeft: 2,
                  fontSize: 15,
                  textTransform: "none",
                  width: "20%",
                  color: colors.white,
                }}
              >
                Adicionar
              </Button>
            </form>
          </Box>
          {warnings.map((warning, i) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                border: 1,
                borderColor: colors.blue,
                borderRadius: 5,
                marginY: 2,
                p: 2,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Typography
                  sx={{
                    color: colors.white,
                    fontSize: 20,
                    mb: 1,
                    borderBottom: 1,
                    borderColor: colors.blue,
                  }}
                >
                  {warning.title}
                </Typography>
                <Typography sx={{ color: colors.white }}>
                  {warning.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderLeft: 1,
                  borderColor: colors.blue,
				  p: 1
                }}
              >
                <IconButton
                  onClick={handleChange}
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: colors.blue,
                    height: "70%",
					marginRight: 1
                  }}
                >
                  <EditIcon sx={{ color: colors.white }} />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(warning.id)}
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: colors.blue,
                    // width: 20,
                    // maxHeight: 0,
                    height: "70%",
                  }}
                >
                  <DeleteIcon sx={{ color: colors.white }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
