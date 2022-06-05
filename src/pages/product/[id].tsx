import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Container,
  Button,
  styled,
  Skeleton,
  Grid,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import UserReview from "../../components/product/UserReview";
import Rating from "@mui/material/Rating";
import Footer from "../../components/Footer";
import { addProduct } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { useEffect, useState } from "react";
import { notify } from "../../components/DisplayToast";
import { useQuery } from "react-query";
import { countRating } from "../../utils/utils";

const skipCategories = [
  "_id",
  "name",
  "price",
  "img",
  "desc",
  "categories",
  "createdAt",
  "updatedAt",
  "instock",
  "rating",
  "reviews",
  "__v",
];

const categories = [
  "cpu",
  "gpu",
  "rom",
  "ram",
  "screen",
  "camera",
  "battery",
  "os",
  "brand",
];

const DetailsColLeft = styled(Box)(({ theme }) => ({
  pr: 20,
  mr: 2,
  width: 150,
  background: "#f0e8e8",
  display: "flex",
  alignItems: "center",
  minWidth: 100,

  [theme.breakpoints.down("sm")]: {
    width: 90,
  },
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState<number[]>(Array(5).fill(0));
  const [productInfo, setProductInfo] = useState({
    cpu: "",
    gpu: "",
    rom: "",
    ram: "",
    screen: "",
    camera: "",
    battery: "",
    os: "",
    brand: "",
  });

  const { isLoading, data } = useQuery<boolean, string, Product>(
    ["getProduct", id],
    () => {
      return fetch("/api/products/find/" + id).then((res) => res.json());
    },
    {
      enabled: id !== undefined,
      onSuccess: (data) => {
        const { cpu, gpu, ram, rom, screen, camera, battery, os, brand } = data;
        setProductInfo({
          cpu: cpu,
          gpu: gpu,
          ram: ram,
          rom: rom,
          screen: screen,
          camera: camera,
          battery: battery,
          os: os,
          brand: brand,
        });
      },
    }
  );

  const hanldeClick = () => {
    dispatch(addProduct(data));
    notify("Product added to cart");
  };

  useEffect(() => {
    if (data && data.reviews.length) {

      data.reviews.forEach((review) => {
        if (review.rating === 5) ratings[0]++;
        else if (review.rating === 4) ratings[1]++;
        else if (review.rating === 3) ratings[2]++;
        else if (review.rating === 2) ratings[3]++;
        else if (review.rating === 1) ratings[4]++;
      });

      setRatings(ratings);
    }
  }, [data]);

  console.log(ratings)

  return (
    <>
      <Head>
        <title>{data?.name}</title>
      </Head>
      <Container>
        <Box>
          <Box sx={{ my: 5 }}>
            <ProductName variant="h5" textAlign="center" sx={{ m: 1 }}>
              {isLoading ? <Skeleton /> : data?.name}
            </ProductName>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={7} sm={12} sx={{ position: "relative" }}>
              {isLoading ? (
                <Skeleton variant="rectangular" height={315} />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center">
                  {data && (
                    <Image
                      src={data?.img}
                      width={500}
                      height={315}
                      quality={100}
                      priority
                    />
                  )}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} lg={5} sm={12}>
              <Stack sx={{ py: 1, height: "100%" }} display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {isLoading ? <Skeleton width={120} /> : "$ " + data?.price}
                  </Typography>
                  {data && <Rating value={countRating(data.reviews)} readOnly />}
                </Box>
                {/* <Box>
                  <Typography
                    variant="subtitle2"
                    fontSize={13}
                    sx={{ color: "#7a7878", mt: 1 }}
                  >
                    Capacity:
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                    size="small"
                  >
                    <Typography variant="subtitle2" fontSize={12}>
                      128GB
                    </Typography>
                  </Button>
                  <Button variant="outlined" color="info" size="small">
                    <Typography variant="subtitle2" fontSize={12}>
                      256GB
                    </Typography>
                  </Button>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="subtitle2"
                    fontSize={13}
                    sx={{ color: "#7a7878" }}
                  >
                    Color:
                  </Typography>
                  <Button
                    variant="outlined"
                    color="info"
                    sx={{ mr: 1 }}
                    size="small"
                  >
                    <Typography variant="subtitle2" fontSize={10}>
                      yellow
                    </Typography>
                  </Button>
                  <Button variant="outlined" color="primary" size="small">
                    <Typography variant="button" fontSize={10}>
                      gray
                    </Typography>
                  </Button>
                </Box> */}
                <Box>
                  {data && <Typography variant="h6" fontSize={17} color="Highlight">Status: {data.instock ? "stoking" : "out of stock"}</Typography>}
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 4 }}
                    onClick={hanldeClick}
                  >
                    ADD TO CART
                  </Button>
                  <Link href="/cart">
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={hanldeClick}
                    >
                      BUY NOW
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ my: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Details
            </Typography>
            {data &&
              Object.entries(data).map((entry, i) => {
                if (skipCategories.includes(entry[0])) return;
                return (
                  <Box display="flex" key={i}>
                    <DetailsColLeft>
                      <Typography
                        variant="h6"
                        fontSize={15}
                        sx={{ mb: 1, pl: 1 }}
                      >
                        {entry[0]}
                      </Typography>
                    </DetailsColLeft>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontSize={13}
                        sx={{ mb: 1, ml: 1, maxWidth: 265 }}
                        align="left"
                        paragraph
                      >
                        {isLoading ? <Skeleton /> : entry[1]}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
        <Box sx={{ pb: 1 }}>
          <ProductName variant="h5" sx={{ mb: 2 }}>
            {isLoading ? <Skeleton /> : "Reviews " + data?.name}
          </ProductName>
          <Box>
            <Box sx={{ ml: 2 }}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 1, ml: 0.5 }}
                >
                  {data ? data && countRating(data.reviews) : 0} star
                </Typography>
              </Box>
              <Box>
                {Array.of(5, 4, 3, 2, 1).map((value, i) => (
                  <Box key={value} display="flex" sx={{ gap: 1 }}>
                    <Box>
                      <Rating
                        name="read-only"
                        value={value}
                        readOnly
                        size="small"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">
                        {(data && (ratings[i] * 100) / data.reviews.length) ||
                          0}
                        % users
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          {data ? (
            <UserReview reviews={data.reviews} pid={data._id} />
          ) : (
            <Skeleton variant="rectangular" />
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Product;
