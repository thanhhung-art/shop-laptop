import {
  Card,
  Typography,
  Box,
  CardMedia,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import ModalContent  from "./ModalContent";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

type orderProducts = [
  { _id: string; name: string; img: string; quantity: number, productId: string }
];

interface Order {
  _id: number;
  amount: number;
  status: string;
  createdAt: string;
  products: orderProducts;
}

function Order({ order }: { order: Order }) {
  const [openModal, setOpenModal] = useState(false);

  const handleModalState = () => setOpenModal(!openModal);

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="caption" gutterBottom>
      Bought on {order.createdAt}
      </Typography>
      {order.products.map((product) => (
        <Box
          key={product._id}
          sx={{ display: "flex", mt: 2 }}
          display="flex"
          alignItems="center"
        >
          <CardMedia>
            <Link href={`/product/${product.productId}`}>
              <a>
                <Image src={product.img} height={50} width={90} />
              </a>
            </Link>
          </CardMedia>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="caption">{product.name}</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="subtitle2">x{product.quantity}</Typography>
          </CardContent>
        </Box>
      ))}
      <Divider sx={{ my: 1.5 }} />
      <Box display="flex" justifyContent="end" sx={{ mr: 1 }}>
        <Typography variant="caption">Total: {order.amount} $</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button disabled={order.status !== "pending"} >Cancel</Button>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          review
        </Button>
        <Button>buy again</Button>
      </Box>
      <ModalContent
        products={order.products}
        handleState={handleModalState}
        open={openModal}
      />
    </Card>
  );
}

export default Order;