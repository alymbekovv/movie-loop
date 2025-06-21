// ProfileMenu.jsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton onClick={handleClick}>
        <Avatar
          src="https://lh3.googleusercontent.com/a/ACg8ocI_D9NXW_k-wW-vpXH84r4vr4p2ssZcoiBOxaCS0n-AK8IwPUs=s576-c-no"
          sx={{ width: 43, height: 43 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          ml={1.5}
        >
          <Typography sx={{ color: "#fff", fontSize: "14px" }} fontWeight="600">
            Islam Aubakirov
          </Typography>
          <Typography
            sx={{ color: "#fff", fontSize: "13px" }}
            color="text.secondary"
          >
            islamdev404@gmail.com
          </Typography>
        </Box>
        {open ? (
          <ExpandLessIcon sx={{ color: "#fff" }} />
        ) : (
          <ExpandMoreIcon sx={{ color: "#fff" }} />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1,
            minWidth: 240,
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box px={2} py={1.5}>
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{ width: 43, height: 43 }}
              src="https://lh3.googleusercontent.com/a/ACg8ocI_D9NXW_k-wW-vpXH84r4vr4p2ssZcoiBOxaCS0n-AK8IwPUs=s576-c-no"
            />
            <Box ml={1.5}>
              <Typography sx={{ color: "#fff" }} fontWeight="bold">
                islamdev
              </Typography>
              <Typography
                sx={{ color: "#fff" }}
                variant="body2"
                color="text.secondary"
              >
                islamdev404@gmail.com
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <MenuItem
          onClick={() => {
            handleCloseProfile();
          }}
        >
          Мой профиль
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose} sx={{ color: "red" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "red" }} />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </Box>
  );
}
