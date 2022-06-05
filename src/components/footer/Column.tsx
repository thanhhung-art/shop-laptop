import { Grid, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import useWindowDimensions from "../GetWindowDimensions";

const Column = ({ title, arrText }: { title: string; arrText: string[] }) => {
  const { width } = useWindowDimensions();
  const [style, setStyle] = useState<{
    mt: string;
    gap: string;
    color: string;
    overflow: string;
    transition: string;
    height: string | number;
  }>({
    mt: "1rem",
    gap: ".2rem",
    color: "#8d8888",
    overflow: "hidden",
    transition: "all 2s ease",
    height: width > 600 ? "auto" : 0,
  });

  const handleClick = () => {
    setStyle({
      ...style,
      height: style.height ? 0 : "auto",
    })
  };

  return (
    <Grid item xs={12} lg={4} md={12} sm={12}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h3"
          fontSize="1rem"
          fontWeight="bold"
          sx={{ borderLeft: "5px solid orange", pl: "1rem" }}
        >
          {title}
        </Typography>
        {width < 768 && (
          <span onClick={handleClick}>{style.height ? <RemoveIcon /> : <AddIcon />}</span>
        )}
      </Box>
      <Box
        sx={style}
        display="flex"
        flexDirection="column"
      >
        {arrText.map((text, i) => (
          <Typography variant="subtitle2" key={i}>
            {text}
          </Typography>
        ))}
      </Box>
    </Grid>
  );
};

export default Column;
