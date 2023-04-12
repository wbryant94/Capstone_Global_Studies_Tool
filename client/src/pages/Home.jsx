import React from "react";
import HomeStyles from "./HomeStyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/HomeCard";
import PublicIcon from "@mui/icons-material/Public";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Button, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { blueGrey } from "@mui/material/colors";

const SiteTitle = styled(Paper)(() => ({
  margin: 10,
  variant: "outlined",
  backgroundColor: "white",
  padding: 12,
  textAlign: "center",
  color: "black",
  boxShadow: "0 3px 5px 2px",
  justifyContent: "center",
  width: "auto",
  transition: "transform .5s ease-in-out",
  fontSize: 20,
  

 ":hover": {
    backgroundColor: blueGrey,

 }
  }))

const Home = () => {
  return (
    <div className={HomeStyles.container}>
    <SiteTitle> UNCA - Global Studies Department - Resources and Exploration Tool</SiteTitle>
      <div className={HomeStyles.welcome}>
        Welcome to the Global Studies Landing page - a place where you can learn
        a little about who we are and our role at UNCA alongside a few tools to
        show what resources we have available.
      </div>
      <div className={HomeStyles.details}>
        <Card />
        <div className={HomeStyles.tools}>
          <Link to="/map">
            <div className={HomeStyles.resources}>
              
              Interactive Map <PublicIcon />
            </div>
          </Link>

          <Link to="/resources">
            <div className={HomeStyles.resources}>
              Resource Page <Diversity3Icon />{" "}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
