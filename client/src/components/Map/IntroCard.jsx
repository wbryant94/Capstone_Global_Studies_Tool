import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "antd";

const card = (
  <React.Fragment>
    <CardContent
      sx={{ position: "fixed", bottom: "10%", left: "10%", zIndex: 500 }}
    >
      <Typography variant="h6" component="div">
        UNCA Global Studies - Resource Visualization Application
      </Typography>
 
        <Link to="/">
          <Typography variant="h5">
            <Button variant="outlined">Home</Button>
            </Typography>
        </Link>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275, }}>
      <Card variant="outlined" sx={{color: "white"}}>{card}</Card>
    </Box>
  );
}
