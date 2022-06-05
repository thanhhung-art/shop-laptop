import {
  Modal,
  Typography,
  Box,
  Button,
  Rating,
  TextField,
  Divider
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../app/store";
import { notify } from "../DisplayToast";

type Values = {
  [key: string]: {
    rating: number;
    comment: string;
  }
}

const ModalContent = ({
  products,
  open,
  handleState
}: {
  products: [{ _id: string; name: string; img: string, productId: string }];
  open: boolean;
  handleState: () => void;
}) => {

  // {userId: {raring; comment},...}

  const [values, setValues] = useState<Values>(
    products.reduce((sum: any, curr) => {
      sum[curr.productId] = { rating: 0, comment: "" };
      return sum;
    }, {})
  );

  const postReview = useMutation((values: PostReviewProduct) => {
    return fetch(`/api/products/review/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
  }, {
    onSuccess: () => {
      notify("Review submitted successfully");
    }
  })

  const user = useTypedSelector((state) => state.user.info);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pid = Object.keys(values);

    pid.forEach(async (id) => {
      const dataToSend: PostReviewProduct = {
        productId: id,
        review: {
          userId: user._id,
          name: user.username,
          review: values[id].comment || "",
          rating: values[id].rating || 0,
          userImg: user.img || "",
        },
      }

      await postReview.mutate(dataToSend);
    })

    handleState();
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    values[name].comment = value;
    setValues({ ...values });
  };

  return (
    <Modal
      open={open}
      onClose={handleState}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: "80%",
        }}
      >
        <Typography variant="h6" id="simple-modal-title">
          review products
        </Typography>
        <Divider sx={{ my: 1 }} />
        <form onSubmit={handleSubmit}>
          {values && products.map((product) => (
            <Box
              key={product._id}
              sx={{ borderBottom: "1px solid #fff", pb: 1, mb: 1 }}
            >
              <Typography
                variant="caption"
                sx={{ display: "block" }}
                gutterBottom
              >
                {product.name}
              </Typography>
              <Box>
                <Rating
                  name={product.productId}
                  value={values[product.productId].rating}
                  size="small"
                  onChange={(event, newVal) => {
                    if (newVal) values[product.productId].rating = newVal;
                    setValues({ ...values });
                  }}
                />
              </Box>
              <TextField
                name={product.productId}
                fullWidth
                variant="standard"
                placeholder="write review"
                value={values[product.productId].comment}
                onChange={handleChangeComment}
              />
            </Box>
          ))}
          <Box display="flex" justifyContent="end">
            <Button type="submit">submit</Button>
            <Button onClick={handleState}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalContent;