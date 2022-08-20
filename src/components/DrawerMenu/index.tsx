import {
  ArrowBackIos,
  AutoGraphOutlined,
  ChevronLeft,
  GraphicEqOutlined,
  Menu,
} from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { red } from "@mui/material/colors";
import { links } from "../../content/drawer";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../content/theme";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AppBarMenu: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  //   const navigate = useNavigate()

  const isActiveDrawerItem = (itemName: string) => {
    if (window.location.pathname == "/") return itemName == "/" ? true : false;
    else {
      if (itemName != "/") {
        return window.location.href.indexOf(itemName) != -1 ? true : false;
      }
    }
  };

  return (
    <Box boxShadow={1} sx={{ backgroundColor: colors.dark }}>
      <CssBaseline />
      <Hidden smUp>
        <AppBarMenu />
      </Hidden>

      <Drawer
        open={open}
        variant="permanent"
        sx={{
          backgroundColor: colors.dark,
          "& .MuiDrawer-paper": { borderRadius: "0 8px 8px 0", border: "none" },
        }}
      >
        <DrawerHeader
          sx={{
            backgroundColor: colors.dark,
            display: "flex",
            justifyContent: open ? "right" : "center",
          }}
        >
          <IconButton
            onClick={open ? () => setOpen(false) : () => setOpen(true)}
          >
            {open ? (
              <ChevronLeft sx={{ color: colors.white }} />
            ) : (
              <Menu sx={{ color: colors.white }} />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List sx={{ backgroundColor: colors.dark, height: "100%" }}>
          {links.map((l, i) => (
            <Box key={l.name}>
              <Link to={l.link} style={{ textDecoration: "none" }}>
                <ListItemButton
                  //   onClick={() => navigate(l.link)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 1.5,
                    backgroundColor: isActiveDrawerItem(l.link)
                      ? colors.darkOpact
                      : colors.dark,
                    m: { xs: 0.5, lg: 1 },
                    borderRadius: 2,
                    transition: 1000,
                    // border: `1px solid ${colors.dark}`,
                    "&:focus": {
                      // backgroundColor: colors.dark
                    },
                    "&:active": {
                      // backgroundColor: colors.dark
                    },
                    "&:hover": {
                      // border: `1px solid ${colors.dark}`,
                      backgroundColor: isActiveDrawerItem(l.link)
                        ? colors.dark
                        : colors.blue,
                    },
                    pointerEvents: isActiveDrawerItem(l.link) ? "none" : "all",
                  }}
                >
                  <ListItemIcon
                    title={l.name}
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isActiveDrawerItem(l.link)
                        ? colors.blue
                        : colors.white,
                    }}
                  >
                    {<l.icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={l.name}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: isActiveDrawerItem(l.link)
                        ? colors.blue
                        : colors.white,
                      "& span": {
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </Box>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default DrawerMenu;
