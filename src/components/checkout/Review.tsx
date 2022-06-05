import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { useTypedSelector } from "../../app/store";
import Image from "next/image";

export default function Review() {
  const cart = useTypedSelector((state) => state.cart);
  const orderInfo = useTypedSelector((state) => state.orderInfo);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <Box>
              <Image src={product.img} width={80} height={40} />
              <Typography variant="body2" fontSize={12} sx={{maxWidth: 400}} >{product.name}</Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: "auto" }}>
              $ {product.price}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {cart.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{orderInfo.userInfo.username}</Typography>
          <Typography gutterBottom>{orderInfo.userInfo.address}</Typography>
          <Typography gutterBottom>{orderInfo.note}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>

          <Grid container>
            {orderInfo.cardPayment.cardName === "" ||
            orderInfo.cardPayment.cardNumber === "" ||
            orderInfo.cardPayment.expDate === "" ||
            orderInfo.cardPayment.cvv === "" ? (
              <Typography variant="subtitle2">After pay</Typography>
            ) : (
              Object.entries(orderInfo.cardPayment).map((payment, index) => {
                let label = "";
                if (index === 0) label = "card type";
                else if (index === 1) label = "card number";
                else if (index === 2) label = "expiry date";
                else label = "cvv";

                return (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{label}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment[1]}</Typography>
                    </Grid>
                  </React.Fragment>
                );
              })
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
