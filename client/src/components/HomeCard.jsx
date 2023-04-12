import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid } from "@mui/material";
import Butera from "../img/static/butera.jpg";
import Ligo from "../img/static/Ligo.jpg";

export default function AdminCards() {
  return (
    <Grid container sx={{ direction: "row", container: true, justifyContent: "center" }}>
      <Card sx={{ 
      maxWidth: 400, 
      margin: 2, 
      textAlign: 'center', 
      flexDirection: 'row' ,
      boxShadow: "5px 5px 8px 5px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="auto"
            width="auto"
            image={Butera}
            alt="prof Butera"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              Chair? - Professor Jacob Butera
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              Ancient Meditteranean Studies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Professor Butera worked to spearhead the Global Studies Department
              back in 2022 - an important thing / here is a snippet of detail!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ 
      maxWidth: 400, 
      margin: 2, 
      textAlign: 'center', 
      flexDirection: 'row' ,
      boxShadow: "5px 5px 8px 5px"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="auto"
            width="auto"
            image={Ligo}
            alt="Professor Seth Ligo"
          />
          <CardContent>
          <Typography gutterBottom variant="h6">
              Co-Chair - Professor Seth Ligo
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              Religious Studies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Professor Ligo worked to spearhead the Global Studies Department
              back in 2022 - an important thing / here is a snippet of detail!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
