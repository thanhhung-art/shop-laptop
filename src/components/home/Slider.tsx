import {
  Paper,
  Grid,
  Typography,
  Box,
  Chip,
  Button,
  styled,
} from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

SwiperCore.use([Autoplay]);

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  desc: string;
  isnew: boolean;
}

const Desc = styled(Typography)(({ theme }) => ({
  heigth: 224,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
}));

const Container = styled(Grid)(({ theme }) => ({
  height: "70vh",
  width: "100vw",
  padding: "0 2rem",

  [theme.breakpoints.down("sm")]: {
    height: 'calc(100vh - 60px)',
  },
}));

function Content({ id, name, price, img, desc, isnew }: Product) {
  return (
    <Paper sx={{mb: 4}}>
      <Container container justifyContent="center">
        <Grid
          container
          item
          justifyContent="center"
          alignContent="center"
          spacing={3}
        >
          <Grid container item lg={7} md={12} sm={12} justifyContent="center">
            <Box display="flex" justifyContent="center" alignItems="center" height={320}>
              {id == 1 && <Image src={img} width={850} height={350} priority />}
              {id == 2 && <Image src={img} width={700} height={600} priority />}
              {id == 3 && <Image src={img} width={600} height={495} priority />}
              {id == 4 && <Image src={img} width={400} height={400} priority />}
            </Box>
          </Grid>
          <Grid
            container
            item
            lg={5}
            md={12}
            sm={12}
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" flexDirection="column" sx={{ gap: ".5rem" }}>
              <Box display="flex" justifyContent={"center"}>
                {isnew && <Chip label="NEW" sx={{ color: "orange" }} />}
              </Box>
              <Typography variant="h5" align="center">
                {name}
              </Typography>
              <Desc variant="h3" align="center" maxWidth={600}>
                {desc}
              </Desc>
              <Typography variant="h6" align="center">
                from ${price}
              </Typography>
              <Box display="flex" justifyContent={"center"}>
                <Button variant="contained" sx={{ borderRadius: "1.5rem" }}>
                  BUY
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

const Slider = () => {
  const products = [
    {
      id: 1,
      name: "Macbook Pro",
      price: 1000,
      image: "/static/images/Macbook_Banner.jpg",
      desc: "Supercharged for pros.",
      isNew: true,
    },
    {
      id: 2,
      name: "Dell Latitude 7420",
      price: 1000,
      image: "/static/images/Dell_banner (3).webp",
      desc: "Ultra-premium. Ultra-intelligent.",
      isNew: true,
    },
    {
      id: 3,
      name: "HP Omen",
      price: 1000,
      image: "/static/images/HP_banner_omen.jpg",
      desc: "Powerhouse laptops for creators on the move",
      isNew: true,
    },
    {
      id: 4,
      name: "Asus Zenbook Duo",
      price: 1000,
      image: "/static/images/Asus_banner (1).jpg",
      desc: "The product of future",
      isNew: true,
    },
  ];

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      speed={2000}
      autoplay={{
        delay: 6000,
      }}
      loop={true}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Content
            id={product.id}
            name={product.name}
            price={product.price}
            img={product.image}
            isnew={product.isNew}
            desc={product.desc}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
