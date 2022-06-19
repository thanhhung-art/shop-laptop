import Head from "next/head";
import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/user/userSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Order from "../../components/account/Order";
import { format } from "date-fns";
import { useQuery, useMutation } from "react-query";

const Account = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useQuery<OrderType[]>(
    "orders",
    (): Promise<OrderType[]> => getOrders(id),
    { enabled: !!id }
  );

  const userInfo = useQuery<User>(
    ["getUser", id],
    () => {
      return fetch("/api/users/find/" + id).then(res => res.json())
    },
    {
      enabled: id !== undefined,
    }
  )

  const handleLogout = useMutation(() => fetch("/api/auth/logout", {
    method: "POST",
  }), {
    onSuccess: () => {
      dispatch(logOut());
      router.push("/");
    }
  });

  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">Account</Typography>
            <Button
              size="large"
              variant="text"
              onClick={() => handleLogout.mutate()}
            >
              Log Out
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile userInfo={userInfo} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails userInfo={userInfo} />
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ mt: 2 }}>
                <Box display="flex" flexDirection="column" sx={{ gap: 2 }}>
                  {isLoading ? (
                    <Typography>loading...</Typography>
                  ) : (
                    data &&
                    data.map((order) => (
                      <Box key={order._id}>
                        <Order order={order} />
                      </Box>
                    ))
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

function getOrders(
  userId: string | string[] | undefined
): Promise<OrderType[]> {
  return fetch("/api/orders/find/" + userId)  
    .then((res) => res.json())
    .then((data: OrderType[]) => {
      return data.map((order) => {
        return {
          ...order,
          createdAt: format(new Date(order.createdAt), "MM-dd-yyyy"),
        };
      });
    });
}

export default Account;
