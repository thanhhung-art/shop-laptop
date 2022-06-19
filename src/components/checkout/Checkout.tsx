import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Link from "next/link";
import { useTypedSelector } from "../../app/store";
import { useMutation } from "react-query";
import { reset } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const userId = useTypedSelector((state) => state.user.info?._id) || "unknown";
  const orderInfo = useTypedSelector((state) => state.orderInfo);
  const cart = useTypedSelector((state) => state.cart);
  const user = orderInfo.userInfo;
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  let paymentDetails = "";

  if (
    orderInfo.cardPayment.cardName === "" ||
    orderInfo.cardPayment.cardNumber === "" ||
    orderInfo.cardPayment.expDate === "" ||
    orderInfo.cardPayment.cvv === ""
  )
    paymentDetails = "After pay";
  else {
    paymentDetails = Object.entries(orderInfo.cardPayment).reduce(
      (acc, [key, value]) => acc + value + " | ",
      ""
    );
  }

  const createOrder = useMutation((values: OrderInfo) => {
    return fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    });
  }, {
    onSuccess: () => {
      dispatch(reset());
    }
  })

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1) {
      const order = {
        userId: userId,
        phone: user.phone,
        username: user.username,
        products: cart.products.map(product => ({
          productId: product._id,
          quantity: product.quantity,
          name: product.name,
          img: product.img,
        })),
        amount: cart.total,
        address: user.address,
        payment: paymentDetails,
        note: orderInfo.note,
      }

      createOrder.mutate(order);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 8 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  We have emailed your order confirmation, and will send you an
                  update when your order has shipped.
                </Typography>
                <Link href="/">
                  <Button>go to homepage</Button>
                </Link>
                <Link href="/products">
                  <Button>continue shopping</Button>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={user.address === "" || user.phone === "" || user.email === ""}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
