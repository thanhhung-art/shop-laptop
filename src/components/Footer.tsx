import {
  Container,
  Box,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  Button,
  styled,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React from "react";

const CopyrightContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: 4,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
}));

const ArrowIconRp = styled(ArrowDropUpIcon)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const Footer = () => {
  //const [h, setHeight] = React.useState("0px");

  const h = React.useRef("0px");
  const a = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (a.current && a.current.style.height === "0px") {
      a.current.style.height = "auto";
    } else {
      if (a.current) a.current.style.height = "0px";
    }
  };

  React.useEffect(() => {
    let open = document.querySelector(".openDetails");

    open?.addEventListener("click", handleClick);

    return () => removeEventListener("click", handleClick);
  })

  return (
    <Box sx={{ backgroundColor: "#222529", color: "#fff" }}>
      <Container>
        <Grid container sx={{ py: 8, mt: 1 }} spacing={2}>
          <Grid item xs={12} lg={3}>
            <Typography
              variant="h6"
              fontSize={15}
              fontWeight="bold"
              gutterBottom
              sx={{ color: "primary.light" }}
            >
              ABOUT US
            </Typography>
            <Typography variant="h5" gutterBottom>
              LOGO
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "#a8a8a8" }}
              gutterBottom
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem corporis at dolore quisquam facere commodi ipsam
              nobis doloribus pariatur distinctio, debitis laudantium ratione
              rerum perferendis incidunt ipsum a beatae nesciunt!
            </Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography
              variant="h6"
              fontSize={15}
              fontWeight="bold"
              gutterBottom
              sx={{ color: "primary.light" }}
            >
              CONTACT INFO
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "success.light" }}
            >
              ADDRESS:
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "#a8a8a8" }}
              gutterBottom
            >
              123 street name, city, viet nam.
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "success.light" }}
            >
              PHONE:
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "#a8a8a8" }}
              gutterBottom
            >
              +84 123 456 789
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "success.light" }}
            >
              EMAIL:
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "#a8a8a8" }}
              gutterBottom
            >
              demo@example.com
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "success.light" }}
            >
              WORK DAYS/HOURS:
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              sx={{ color: "#a8a8a8" }}
              gutterBottom
            >
              MON - SUN / 9.00 AM - 8.00 PM
            </Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h6"
                fontSize={15}
                fontWeight="bold"
                gutterBottom
                sx={{ color: "primary.light" }}
              >
                CUSTOM SERVICE
              </Typography>
              <ArrowIconRp className="openDetails" />
            </Box>
            <Box style={{transition: "height 1s", height: "auto", overflow: "hidden"}} ref={a}>
              {[
                "Help & FAQs",
                "Order Tracking",
                "Shipping & Delivery",
                "Order History",
                "Advanced Search",
                "My Account",
                "Careers",
                "About us",
                "Corporate Sales",
                "Privacy",
              ].map((item, index) => (
                <Typography
                  variant="body1"
                  fontSize={14}
                  key={index}
                  sx={{ color: "#a8a8a8", my: 1 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography
              variant="h6"
              fontSize={15}
              fontWeight="bold"
              gutterBottom
              sx={{ color: "primary.light" }}
            >
              POPULAR TAGS
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.4}>
              {[
                "apple",
                "lenovo",
                "acer",
                "asus",
                "hp",
                "dell",
                "13inch",
                "battery long",
              ].map((item, index) => (
                <Typography
                  component="span"
                  key={index}
                  sx={{
                    color: "#a8a8a8",
                    border: "1px solid #444242",
                    p: 0.5,
                    fontSize: 14,
                    cursor: "pointer",

                    "&:hover": {
                      border: "1px solid #ccc",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
        <CopyrightContainer>
          <Typography variant="caption" sx={{ color: "#a8a8a8" }}>
            © Laptop eCommerce. © 2021. All Rights Reserved
          </Typography>
          <Box display="flex" gap={2}>
            <Typography variant="h6" sx={{ color: "#a8a8a8" }}>
              VISA
            </Typography>
            <Typography variant="h6" sx={{ color: "#a8a8a8" }}>
              PAYPAL
            </Typography>
            <Typography variant="h6" sx={{ color: "#a8a8a8" }}>
              STRIPE
            </Typography>
          </Box>
        </CopyrightContainer>
      </Container>
    </Box>
  );
};

export default Footer;
