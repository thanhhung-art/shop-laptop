import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Container,
  styled,
  TextField,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LaptopIcon from "@mui/icons-material/Laptop";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useTypedSelector } from "../../app/store";
import Search from "./Search";

const Logo = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const SideBarButton = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Category = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

function Navbar() {
  const cart = useTypedSelector((state) => state.cart);
  const user = useTypedSelector((state) => state.user.info);
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const handleCLoseSidebar = () => setOpenSidebar(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense" sx={{ pt: 1.2, pb: 1.2 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Logo>
              <Link href="/">
                <a>
                  <Typography variant="subtitle1" fontWeight="bold">shop laptop</Typography>
                </a>
              </Link>
            </Logo>
            <SideBarButton onClick={() => setOpenSidebar(!openSidebar)}>
              <MenuIcon />
            </SideBarButton>
            <Container>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Search />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ gap: 2 }}
                >
                  <Category>
                    <Link href="/products">
                      <a>
                        <Typography
                          variant="subtitle1"
                          sx={{ cursor: "pointer", ml: 4 }}
                        >
                          All Laptops
                        </Typography>
                      </a>
                    </Link>
                  </Category>
                </Box>
              </Box>
            </Container>
            <Box>
              <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
                <Link href="/cart">
                  <a>
                    <Badge
                      badgeContent={cart.products.length}
                      color="secondary"
                    >
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </a>
                </Link>
                <AvatarContainer>
                  {user && user._id ? ( 
                    <Link href={`/account/${user._id}`}>
                      <a>
                        <Avatar src={user.img} alt={user.username} />
                      </a>
                    </Link>
                  ) : (
                    <>
                      <Link href="/signup">
                        <a>
                          <Typography variant="subtitle2">Sign up</Typography>
                        </a>
                      </Link>
                      <Link href="/login">
                        <a>
                          <Typography variant="subtitle2" sx={{ ml: 1 }}>
                            Sign in
                          </Typography>
                        </a>
                      </Link>
                    </>
                  )}
                </AvatarContainer>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={openSidebar}
        onClose={() => {
          setOpenSidebar(false);
        }}
      >
        <Box
          sx={{ width: "70vw", height: "100%", background: "#f8f8f8" }}
          role="presentation"
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <CloseIcon onClick={handleCLoseSidebar} />
              </ListItemIcon>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link href="/">
                <a style={{color: "#333"}}>
                  <ListItemText onClick={handleCLoseSidebar}>Home</ListItemText>
                </a>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LaptopIcon />
              </ListItemIcon>
              <Link href="/products">
                <a style={{color: "#333"}}>
                  <ListItemText onClick={handleCLoseSidebar}>All laptops</ListItemText>
                </a>
              </Link>
            </ListItem>
            {user && user._id ? (
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <Link href={`/account/${user._id}`}>
                  <a style={{color: "#333"}}>
                    <ListItemText onClick={handleCLoseSidebar}>Account</ListItemText>
                  </a>
                </Link>
              </ListItem>
            ) : (
              <Box>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Link href={`/login`}>
                    <a style={{color: "#333"}}>
                      <ListItemText onClick={handleCLoseSidebar}>Sign in</ListItemText>
                    </a>
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Link href={`/signup`}>
                    <a style={{color: "#333"}}>
                      <ListItemText onClick={handleCLoseSidebar}>Sign up</ListItemText>
                    </a>
                  </Link>
                </ListItem>
              </Box>
            )}
            <Divider />
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
