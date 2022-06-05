import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  Rating,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/cart/cartSlice";
import { UseQueryResult } from "react-query";
import { countRating } from "../../utils/utils";

const FeaturedProduct = ({
  featuredProducts,
}: {
  featuredProducts: UseQueryResult<Product[], unknown>;
}) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Featured Products
        </Typography>
        <Box display="flex" justifyContent="center">
          <Divider sx={{ width: 100 }} textAlign="center" />
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {featuredProducts.data &&
          featuredProducts.data.map((product) => (
            <Grid item lg={3} sm={12} key={product._id}>
              <Card
                sx={{
                  padding: ".5rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",

                  "&:hover .card-icons": {
                    transform: "translateY(0)",
                    transition: "all 0.4s",
                  }
                }}
                
              >
                <Box display="flex" justifyContent="center">
                  <CardMedia>
                    <Link href={`/product/${product._id}`}>
                      <a>
                        <Image src={product.img} width={250} height={140} />
                      </a>
                    </Link>
                  </CardMedia>
                </Box>
                <Box
                  sx={{ pr: "1rem", overflow: "hidden" }}
                  display="flex"
                  justifyContent="end"
                >
                  <Box
                    sx={{ transform: "translateY(50px)" }}
                    className="card-icons"
                  >
                    <FavoriteIcon fontSize="large" sx={styleIcons} />
                    <span onClick={() => dispatch(addProduct(product))}>
                      <ShoppingCartIcon fontSize="large" sx={styleIcons} />
                    </span>
                  </Box>
                </Box>
                <CardContent sx={{ pt: 2, zIndex: 2,display: "flex", flexDirection: "column" , flex: 1 }}>
                    <Link href={`/product/${product._id}`}>
                      <Typography
                        variant="subtitle1"
                        sx={{ cursor: "pointer", flex: 1 }}
                      >
                        {product.name}
                      </Typography>
                    </Link>
                    <Box sx={{ pt: 2, mt: "auto" }}>
                      <Rating
                        name="read-only"
                        value={countRating(product.reviews)}
                        readOnly
                        size="small"
                      />
                    </Box>
                    <Typography variant="subtitle1">
                      $ {product.price}
                    </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

var styleIcons = {
  border: "1px solid #ccc",
  borderRadius: "50%",
  padding: "7px",
  fontSize: 32,
  marginRight: "10px",
  "&:hover": {
    backgroundColor: "#333",
    color: "#fff",
  },
};

export default FeaturedProduct;
