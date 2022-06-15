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
import Link from "next/link";

SwiperCore.use([Autoplay]);


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

function Content({ id, name, price, img, desc, isnew }: ProductBanner) {
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
            <Box display="flex" justifyContent="center" alignItems="center" height={320} width={'100%'} sx={{position: "relative"}}>
              {name == "Macbook Pro" && <Image src={img} width={965} height={326} priority />}
              {name == "Dell Latitude 7420" && <Image src={img} width={814} height={413} priority />}
              {name == "Hp Omen" && <Image src={img} width={693} height={590} priority />}
              {name == "Asus Zenbook Duo" && <Image src={img} width={479} height={479} priority />}
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
              <Typography variant="h6" align="center" fontWeight="bold">
                ${price}
              </Typography>
              <Box display="flex" justifyContent={"center"}>
                <Link href={'/product/'+id}>
                  <Button variant="contained" sx={{ borderRadius: "1.5rem" }}>
                    BUY
                  </Button>
                </Link>
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
      id: '625a934376f86e029bf17c4d',
      name: "Macbook Pro",
      price: 2182.87,
      image: "/static/images/Macbook_Banner.jpg",
      desc: "Supercharged for pros.",
      isNew: true,
    },
    {
      id: "62a9c16e9090cd80ad036ec6",
      name: "Dell Latitude 7420",
      price: 1669.00,
      image: "/static/images/Dell_banner (3).webp",
      desc: "Ultra-premium. Ultra-intelligent.",
      isNew: true,
    },
    {
      id: "62a9c54ed503a87be1503587",
      name: "Hp Omen",
      price: 1649.99,
      image: "/static/images/Hp_banner_omen.jpg",
      desc: "Powerhouse laptops for creators on the move",
      isNew: true,
    },
    {
      id: "product/62a9c896a01efcc3472f1fda",
      name: "Asus Zenbook Duo",
      price: 1398,
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
