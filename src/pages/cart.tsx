import {
  Container,
  Box,
  Card,
  Typography,
  Button,
  Divider,
  TextField,
  Tooltip,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useTypedSelector } from "../app/store";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { useState } from "react";
import Link from "next/link";
import { editNote } from "../features/orderInfo/orderInfoSlice";
import Head from "next/head";
import DisplayToast, { notify } from "../components/DisplayToast";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 18,
  },
}));

const Tools = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  [theme.breakpoints.down("sm")]: {
    width: "90%",
    flexDirection: "row-reverse",
  },
}));

const Summary = styled(Box)(({ theme }) => ({
  width: 300,
  padding: 12,
  border: "1px solid #e0e0e0",

  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

const NameProduct = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  maxWidth: 460,

  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
}));

const Cart = () => {
  const products = useTypedSelector((state) => state.cart.products);
  let total = useTypedSelector((state) => state.cart.total);
  const note = useTypedSelector((state) => state.orderInfo.note);
  const dispatch = useDispatch();
  const [currNote, setCurrNote] = useState(note);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrNote(e.target.value);
    dispatch(editNote(e.target.value));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
    notify("Product removed from cart");
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Container sx={{ mt: 5 }}>
        <Wrapper>
          <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
            {products.length !== 0 ? (
              products.map((product: CartItem) => (
                <Card key={product._id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    sx={{ p: 2 }}
                  >
                    <Box display="flex" sx={{ gap: 4 }} alignItems="center">
                      <Box>
                        <Image src={`${product.img}`} width={120} height={70} />
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <NameProduct variant="subtitle1">
                          {product.name}
                        </NameProduct>
                        <Typography
                          variant="subtitle1"
                          sx={{ maxWidth: 400, my: 1 }}
                        >
                          $ {product.price}
                        </Typography>
                      </Box>
                    </Box>
                    <Tools>
                      <Box display="flex" justifyContent="end">
                        <Tooltip title="remove product">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveProduct(product._id)}
                          >
                            <RemoveShoppingCartIcon fontSize="small" />
                          </span>
                        </Tooltip>
                      </Box>
                      <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            dispatch(decreaseQuantity(product._id))
                          }
                        >
                          <RemoveIcon fontSize="small" />
                        </Button>
                        <Typography>{product.quantity}</Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            dispatch(increaseQuantity(product._id))
                          }
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                      </Box>
                    </Tools>
                  </Box>
                </Card>
              ))
            ) : (
              <Box>
                <Typography variant="h4">No Product to show</Typography>
              </Box>
            )}
          </Box>
          <Summary>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontSize={16}>
                Total Price:{" "}
              </Typography>
              <Typography variant="subtitle1">$ {total}</Typography>
            </Box>
            <Divider sx={{ m: "1rem 0" }} />
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Additional Comments (Note)
              </Typography>
              <TextField
                fullWidth={true}
                size="medium"
                value={currNote}
                onChange={handleChange}
              ></TextField>
            </Box>
            <Divider sx={{ m: "1rem 0" }} />
            <TextField
              fullWidth={true}
              size="small"
              label="apply voucher"
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              sx={{ mt: 2 }}
            >
              <Typography variant="subtitle2">Apply</Typography>
            </Button>
            <Divider sx={{ m: "1rem 0" }} />
            <Link href={`/checkout`}>
              <Button variant="contained" fullWidth>
                <Typography variant="subtitle2">Checkout Now</Typography>
              </Button>
            </Link>
          </Summary>
        </Wrapper>
      </Container>
    </>
  );
};

export default Cart;
