import {
  Container,
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { addProduct } from "../../features/cart/cartSlice";
import { UseQueryResult } from "react-query";
import { countRating } from "../../utils/utils";
import ProductPlaceholder from "../product/ProductPlaceholder";

const TopNewArrivals = ({
  newProducts,
}: {
  newProducts: UseQueryResult<Product[], unknown>;
}) => {
  const dispatch = useDispatch();

  return (
    <Container sx={{ mt: "4rem" }}>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Top New Arrivals
        </Typography>
        <Box display="flex" justifyContent="center">
          <Divider sx={{ width: "100px" }} textAlign="center" />
        </Box>
        <Grid container spacing={2} sx={{ mt: "1rem" }}>
          <Grid container item xs={12} spacing={2}>
            {newProducts.isLoading
              ? Array(6)
                  .fill(1)
                  .map((e, i) => (
                    <ProductPlaceholder
                      key={i}
                      lg={i === 2 || i === 3 ? 6 : 3}
                      sm={12}
                    />
                  ))
              : newProducts.data &&
                newProducts.data.map((product, index) => (
                  <Grid
                    item
                    lg={index === 2 || index === 3 ? 6 : 3}
                    sm={12}
                    key={product._id}
                  >
                    <Card
                      sx={{
                        padding: ".5rem",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",

                        "&:hover .card-icons": {
                          transform: "translateY(0)",
                          transition: "all 0.4s",
                        },
                      }}
                    >
                      <CardMedia>
                        <Link href={`/product/${product._id}`}>
                          <a>
                            <Box display="flex" justifyContent="center">
                              <Image
                                src={product.img}
                                width={250}
                                height={140}
                              />
                            </Box>
                          </a>
                        </Link>
                      </CardMedia>
                      <Box
                        sx={{ p: ".5rem", overflow: "hidden" }}
                        display="flex"
                        justifyContent="center"
                      >
                        <Box
                          sx={{
                            transform: "translateY(50px)",
                            zIndex: "1",
                          }}
                          className="card-icons"
                        >
                          <FavoriteIcon sx={styleIcons} />
                          <span onClick={() => dispatch(addProduct(product))}>
                            <ShoppingCartIcon sx={styleIcons} />
                          </span>
                        </Box>
                      </Box>
                      <CardContent
                        sx={{
                          pt: 0,
                          zIndex: 4,
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <Link href={`/product/${product._id}`}>
                          <Typography
                            variant="subtitle1"
                            sx={{ cursor: "pointer", flex: 1 }}
                          >
                            {product.name}
                          </Typography>
                        </Link>
                        <Box sx={{ pt: 2 }}>
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
        </Grid>
      </Box>
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

export default TopNewArrivals;
