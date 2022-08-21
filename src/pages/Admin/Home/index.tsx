import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import Section from "../../../components/Section";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { colors } from "../../../content/theme";
import { CardComp } from "../../../components/Card";

import { cardInfo } from "../../../content/cardAdmin";

const Dashboard: React.FC = () => {
  // const [selectedGene, setSelectedGene] = useState<Gene | undefined>()

  return (
    <Container sx={{ mt: 5, height: "100%", backgroundColor: colors.dark, mb: 0  }}>
      <Section title="Início" icon={HomeOutlinedIcon} />
      <Box
        mt={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
          justifyContent: "space-evenly",
		  backgroundColor: colors.dark 
        }}
      >
        {cardInfo.map((info, i) => (
          <CardComp
            title={info.title}
            img={info.img}
            link={info.link}
            subtitle={info.subtitle}
            label={info.label}
            key={i}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
