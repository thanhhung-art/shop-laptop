import {
  TextField,
  Box,
  Typography,
  styled,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  background: "#fcfcfc",
  width: "100%",
  border: "none",
  outline: "none",
  minWidth: 700,

  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
  },
}));

const Search = () => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleClick = (id: string) => {
    setValue("");
    router.push("/product/" + id);
  };

  const { data, isLoading, isError } = useQuery<boolean, string, Product[]>(
    "getProducts",
    () => {
      return fetch("/api/products")
        .then((res) => res.json())
        .then((res) => res);
    }
  );

  return (
    <Box sx={{ position: "relative" }}>
      <StyledTextField
        value={value}
        size="small"
        placeholder="search product"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {focus && (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setValue("")}
                >
                  <ClearIcon />
                </span>
              )}
            </InputAdornment>
          ),
        }}
      />
      {focus && value && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            background: "#fff",
            color: "#333",
            border: "1px solid #333",
            p: 1,
          }}
        >
          {data &&
            data
              .filter((product) => {
                return product.name.toLowerCase().includes(value.toLowerCase());
              })
              .map((product) => (
                <Box
                  key={product._id}
                  sx={{
                    py: 0.3,
                    "&:hover": {
                      background: "#f5f5f5",
                    },
                  }}
                  display="flex"
                  alignItems="center"
                  onMouseDown={() => handleClick(product._id)}
                >
                  <SearchIcon fontSize="small" />
                  <Typography
                    variant="caption"
                    gutterBottom
                    sx={{ pl: 1, cursor: "pointer" }}
                  >
                    {product.name}
                  </Typography>
                </Box>
              ))}
        </Box>
      )}
    </Box>
  );
};

export default Search;
