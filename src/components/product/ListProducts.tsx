import {
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  styled,
  Rating,
} from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/cart/cartSlice";
import { notify } from "../DisplayToast";
import { countRating } from "../../utils/utils";

const CardStyled = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  cursor: "pointer",
  justifyContent: "space-between",
  border: "1px solid #f0ecec",

  ":hover div": {
    transform: "translateY(0)",
    transition: "all .4s",
  },
}));

const NameProduct = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: 11,
  },
}));

const ListProducts = ({
  pages,
  filter,
}: {
  pages: InfiniteProduct[];
  filter: FilterInfo;
}) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>(() => {
    return pages.reduce(
      (acc, page) => acc.concat(page.products),
      [] as Product[]
    );
  });

  useEffect(() => {
    setProducts(
      pages.reduce((acc, page) => acc.concat(page.products), [] as Product[])
    );
  }, [pages.length]);

  return (
    <>
      <Grid container>
        {products
          .filter((product) => {
            let resultBrand: boolean,
              resultPrice: boolean,
              resultScreen: boolean,
              resultDemand: boolean;

            if (filter.filterByBrand !== "all") {
              resultBrand = product.brand === filter.filterByBrand;
            } else resultBrand = true;

            switch (filter.filterByPrice) {
              case "0-500":
                resultPrice = product.price <= 500;
                break;
              case "500-1000":
                resultPrice = product.price > 500 && product.price <= 1000;
                break;
              case "1000-2000":
                resultPrice = product.price > 1000 && product.price <= 2000;
                break;
              case ">2000":
                resultPrice = product.price > 2000;
                break;
              default:
                resultPrice = true;
            }

            switch (filter.filterByScreen) {
              case "13":
                resultScreen = product.screen.includes("13");
                break;
              case "14":
                resultScreen = product.screen.includes("14");
                break;
              case "15":
                resultScreen = product.screen.includes("15");
                break;
              default:
                resultScreen = true;
            }

            switch (filter.filterByDemand) {
              case "study":
                resultDemand = product.categories?.includes("study");
                break;
              case "office":
                resultDemand = product.categories?.includes("office");
                break;
              case "gaming":
                resultDemand = product.categories?.includes("gaming");
                break;
              case "coding":
                resultDemand = product.categories?.includes("coding");
                break;
              default:
                resultDemand = true;
            }

            return resultBrand && resultPrice && resultScreen && resultDemand;
          })
          .sort((a, b) => {
            switch (filter.sort) {
              case "hightPrice":
                return Math.floor(b.price) - Math.floor(a.price);
              case "lowPrice":
                return Math.floor(a.price) - Math.floor(b.price);
              default:
                return 0;
            }
          })
          .map((product) => (
            <Grid item lg={4} sm={6} xs={6} key={product._id}>
              <CardStyled>
                <Box sx={{ p: 2, pb: 0 }}>
                  <Link href={`/product/${product._id}`}>
                    <a>
                      <CardMedia>
                        <Box display="flex" justifyContent="center">
                          <Image src={product.img} width={250} height={140} />
                        </Box>
                      </CardMedia>
                    </a>
                  </Link>
                  <Box
                    sx={{ pr: "1rem", overflow: "hidden" }}
                    display="flex"
                    justifyContent="end"
                  >
                    <Box sx={{ transform: "translateY(50px)" }}>
                      <FavoriteIcon
                        fontSize="medium"
                        sx={{
                          borderRadius: "50%",
                          p: 0.5,
                          border: "1px solid #ccc",
                          mr: 1,

                          "&:hover": {
                            background: "#333",
                            color: "#fff",
                          },
                        }}
                      />
                      <a
                        style={{ color: "#000" }}
                        onClick={() => {
                          dispatch(addProduct(product));
                          notify("Add to cart successfully");
                        }}
                      >
                        <ShoppingCartIcon
                          fontSize="medium"
                          sx={{
                            borderRadius: "50%",
                            p: 0.5,
                            border: "1px solid #ccc",

                            "&:hover": {
                              background: "#333",
                              color: "#fff",
                            },
                          }}
                        />
                      </a>
                    </Box>
                  </Box>
                  <Link href={`/product/${product._id}`}>
                    <a style={{ color: "#333" }}>
                      <NameProduct variant="subtitle1" fontSize={14}>
                        {product.name}
                      </NameProduct>
                    </a>
                  </Link>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ p: 2 }}>
                  <Box>
                    <Rating
                      value={countRating(product.reviews)}
                      size="small"
                      readOnly
                    />
                  </Box>
                  <Typography variant="subtitle1">$ {product.price}</Typography>
                </Box>
              </CardStyled>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default ListProducts;
