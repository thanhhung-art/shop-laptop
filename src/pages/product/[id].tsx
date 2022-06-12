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
import { useEffect, useState, useLayoutEffect } from "react";
import { notify } from "../../components/DisplayToast";
import { useQuery } from "react-query";
import { countRating } from "../../utils/utils";
import StarIcon from "@mui/icons-material/Star";

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

  const { isLoading, data } = useQuery<boolean, string, Product>(
    ["getProduct", id],
    () => {
      return fetch("/api/products/find/" + id).then((res) => res.json());
    },
    {
      enabled: id !== undefined,
    }
  );

  const hanldeClick = () => {
    dispatch(addProduct(data));
    notify("Product added to cart");
  };

  useEffect(() => {
    if (data && data.reviews.length) {
      data.reviews.forEach((review) => {
        if (review.rating === 5) ratings[4]++;
        else if (review.rating === 4) ratings[3]++;
        else if (review.rating === 3) ratings[2]++;
        else if (review.rating === 2) ratings[1]++;
        else if (review.rating === 1) ratings[0]++;
      });
      setRatings([...ratings]);
    }
  }, [data]);

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
              <Stack
                sx={{ py: 1, height: "100%" }}
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {isLoading ? <Skeleton width={120} /> : "$ " + data?.price}
                  </Typography>
                  {isLoading ? (
                    <Skeleton width={120} />
                  ) : (
                    data && (
                      <Rating value={countRating(data.reviews)} readOnly />
                    )
                  )}
                </Box>
                <Box>
                  {isLoading ? (
                    <Skeleton width={120} />
                  ) : (
                    <Typography variant="h6" fontSize={17} color="Highlight">
                      Status: {data?.instock ? "stoking" : "out of stock"}
                    </Typography>
                  )}
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
              <Box display="flex" alignItems="center" gap={0.4}>
                <Typography variant="h6" fontWeight="bold" fontSize={25}>
                  {data ? data && countRating(data.reviews) : 0}
                </Typography>{" "}
                <StarIcon fontSize="medium" sx={{ color: "#ffc107" }} />
              </Box>
              <Box>
                {[5, 4, 3, 2, 1].map((value, i) => (
                  <Box key={i} display="flex" gap={1} alignItems="center">
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="subtitle2"
                        fontSize={18}
                        fontWeight="bold"
                        sx={{mt: 0.2}}
                      >
                        {value}
                      </Typography>{" "}
                      <StarIcon
                        fontSize="small"
                        sx={{ color: "#ffc107" }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontSize={15}>
                        {ratings[value - 1]} users
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
