import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Person2Icon from "@mui/icons-material/Person2";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Avatar, ButtonGroup, CardMedia } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import DeleteModal from "../UI/DeleteProfessorModal";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../context/AuthContext";
import { blueGrey, lightBlue } from "@mui/material/colors";

const Resource = styled(Card)(() => ({
  margin: 10,
  variant: "outlined",
  backgroundColor: lightBlue[100],
  padding: 8,
  textAlign: "center",
  color: "black",
  boxShadow: "0 3px 5px 2px",
  justifyContent: "center",
  minWidth: "auto",

  ":hover": {
    color: "teal",
    backgroundColor: "white",
  },
}));

export default function ResourceCard(props) {
  const { currentUser } = React.useContext(AuthContext);
  const resourceURL = `/resources/${props.data.professor_id}`;

  return (
    <Resource>
      <CardActionArea>
        <CardContent>
          <Avatar
            default={<Person2Icon />}
            sx={{ width: 400, height: 400, padding: 2 }}
            src={require(`../../img/uploads/${props.data.image}`)}
          />

          <Typography variant="h2" sx={{ fontSize: 40 }} gutterBottom>
            {`${props.data.fname} ${props.data.lname}`}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            {props.data.department}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
            gutterBottom
          >
            {props.data.description}
          </Typography>
          <Typography variant="h5" sx={{ fontSize: 32 }} gutterBottom>
            {props.data.email}
          </Typography>
        </CardContent>
      </CardActionArea>

      {currentUser ? (
        <ButtonGroup sx={{ gap: "10px" }}>
          <Link to="/resources/edit" state={props.data}>
            Edit Resource
            <EditIcon />
          </Link>
          {/*     <EditModal resource={resourceVals} /> */}
          <DeleteModal data={props.data} />
        </ButtonGroup>
      ) : (
        <></>
      )}
      <Link to={resourceURL} state={props.data}>
        <ReadMoreIcon
          sx={{ fontSize: 40, justifyContent: "flex-end", marginLeft: 25 }}
        />
        Read More
      </Link>
    </Resource>
  );
}
