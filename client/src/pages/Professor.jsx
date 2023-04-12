import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { teal } from "@mui/material/colors";

const ResourceDisplay = styled(Card)(() => ({
  margin: 10,
  variant: "outlined",
  backgroundColor: "white",
  padding: 8,
  textAlign: "center",
  color: "black",
  boxShadow: "0 3px 5px 2px",
  justifyContent: "center",
  width: "auto",

  ":hover": {
    color: "teal",
    backgroundColor: "white",
  },
}));

/* In order to populate both the resource and professor tables, the professor is created so that the 
professor_id PK may then be used as the FK in the resource table - 
TODO: Implement duplicate checks on the backend for professors 
 */

// Initial form adds professor, resource entry requires prof id (FK )
const Professor = (props) => {
  const location = useLocation();
  const propsData = location.state;
  const professor_id = propsData.professor_id;

  const [inputs, setInputs] = useState({ ...propsData });
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/professor/" + professor_id
        );
        setCountry(
          res.data.map((item) => {
            return item.name;
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <ResourceDisplay>
        <CardContent sx={{ backgroundColor: teal }}>
          <Link to="/resources">
            <ArrowBackIcon sx={{ fontSize: "40px" }} />
          </Link>
          <CardContent>
            <Typography gutterBottom variant="h2">
              {`${inputs.fname} ${inputs.lname}`}
            </Typography>
            <Typography variant="h3" color="text.primary" gutterBottom>
              {`${inputs.department}`}
            </Typography>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              {`${inputs.email}`}
            </Typography>
          </CardContent>

          <Card>
            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{
                margin: "10px",
                padding: "10px",
              }}
            >
              {inputs.description}
            </Typography>
          </Card>

          <Card sx={{ width: 800, margin: "auto" }}>
            {inputs.image != null && (
              <CardMedia
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  paddingTop: "100%",
                  display: "flex",
                }}
                image={require(`../img/uploads/${inputs.image}`)}
              />
            )}
          </Card>
        </CardContent>
      </ResourceDisplay>
      <Grid
        container
        spacing={10}
        sx={{ justifyContent: "center", flexDirection: "row" }}
      >
        <Grid item xs={8}>
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "true",
            }}
            variant="h4"
            component="div"
          >
            <ResourceDisplay sx={{ display: "flex", mt: 10 }}>
              Countries & Connections{" "}
            </ResourceDisplay>
          </Typography>
          {country.length >= 1 ? (
            <div>
              {country.map((country) => {
                return (
                  <ResourceDisplay key={country.country_id}>
                    {country}
                    <PublicIcon />
                  </ResourceDisplay>
                );
              })}
            </div>
          ) : (
            <ResourceDisplay>
              No Countries / Connections To Display
            </ResourceDisplay>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Professor;
