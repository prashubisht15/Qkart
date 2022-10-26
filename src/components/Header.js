import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const routeToExplore = () => {
    history.push("/");
  };

  const routeToRegister = () => {
    history.push("/register");
  };

  const routeToLogin = () => {
    history.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    history.push("/");
    //tryig to reload forcefully
    window.location.reload();
  };


  if (hasHiddenAuthButtons) {
    // CRIO_SOLUTION_END_MODULE_LOGIN
    return (
      <Box className="header">
        <Box className="header-title">
          {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
          <Link to="/">
            {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
            <img src="logo_light.svg" alt="QKart-icon"></img>
            {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
          </Link>
          {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
        </Box>
        {/* CRIO_SOLUTION_START_MODULE_PRODUCTS */}
        {children}
        {/* CRIO_SOLUTION_END_MODULE_PRODUCTS */}
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          // CRIO_SOLUTION_START_MODULE_LOGIN
          onClick={routeToExplore}
          // CRIO_SOLUTION_END_MODULE_LOGIN
        >
          Back to explore
        </Button>
      </Box>
    );
    // CRIO_SOLUTION_START_MODULE_LOGIN
  }

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>
      {children}
      <Stack direction="row" spacing={1} alignItems="center">
        {localStorage.getItem("username") ? (
          <>
            <Avatar
              // FIXME - Understand why some images are in public/ and others in src/assets/?
              src="avatar.png"
              alt={localStorage.getItem("username") || "profile"}
            />

            <p className="username-text">{localStorage.getItem("username")}</p>

            <Button type="primary" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button onClick={routeToLogin}>Login</Button>

            <Button variant="contained" onClick={routeToRegister}>
              Register
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
