import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/static/UNCA-logo.png";
import NavbarStyle from "./Navbar.module.css";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className={NavbarStyle.container}>
      <div className={NavbarStyle.logo}>
        <Link to="/">
          <img src={Logo} />
        </Link>
      </div>

      {currentUser ? (
        <div className={NavbarStyle.adminTools}>
          <Link className={NavbarStyle.link} to="/register">
            <h2>
              Add New User <PersonAddIcon />
            </h2>
          </Link>
          <Link className={NavbarStyle.link} to="/add">
            <h2>
              Add Connections / Professors <PersonAddIcon />
            </h2>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <span>
        <h1> {currentUser ? currentUser.fname : "Welcome"}</h1>
      </span>
      {currentUser ? (
        <Link to="/" className={NavbarStyle.link}>
          <Button onClick={logout}>Logout</Button>
        </Link>
      ) : (
        <Link to="/login" className={NavbarStyle.link}>
          <Button color="secondary">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
