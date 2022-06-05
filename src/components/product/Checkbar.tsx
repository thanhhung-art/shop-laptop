import { Box, Typography, Grid, Checkbox, styled } from "@mui/material";
import { SetStateAction } from "react";

const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Checkbar = ({
  setFilter,
  filter,
}: {
  setFilter: React.Dispatch<SetStateAction<FilterInfo>>;
  filter: FilterInfo;
}) => {

  const brands = [
    "macbook",
    "asus",
    "dell",
    "hp",
    "lenovo",
    "acer",
    "msi",
    "lg",
    "gigabyte",
    "microsoft",
    "fujitsu",
    "avita",
  ];

  const handleToggleBrand = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.checked) {
      setFilter({ ...filter, filterByBrand: value.target.name });
    } else {
      setFilter({ ...filter, filterByBrand: "all" });
    }
  }

  const hanldeTogglePrice = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.checked) {
      setFilter({ ...filter, filterByPrice: value.target.name });
    } else {
      setFilter({ ...filter, filterByPrice: "all" });
    }
  }

  const hanldeToggleScreen = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.checked) {
      setFilter({ ...filter, filterByScreen: value.target.name });
    } else {
      setFilter({ ...filter, filterByScreen: "all" });
    }
  }

  return (
    <Wrapper>
      <Box
        sx={{
          width: 300,
          pt: 1,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontSize="1rem"
            sx={{ pl: 1 }}
          >
            Brand
          </Typography>
          <Grid container>
            {brands.map((brand) => (
              <Grid item xs={6} key={brand}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    onChange={handleToggleBrand}
                    name={brand}
                    checked={filter.filterByBrand === brand}
                  />
                  <Typography variant="subtitle2">{brand}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontSize="1rem"
            sx={{ pl: 1 }}
          >
            Price
          </Typography>
          <Box>
            <Box display="flex" alignItems="center">
              <Checkbox name="0-500" onChange={hanldeTogglePrice} checked={filter.filterByPrice === "0-500"} />
              <Typography variant="subtitle2">$0 - $500</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Checkbox name="500-1000" onChange={hanldeTogglePrice} checked={filter.filterByPrice === "500-1000"} />
              <Typography variant="subtitle2">$500 - $1000</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Checkbox name="1000-2000" onChange={hanldeTogglePrice} checked={filter.filterByPrice === "1000-2000"} />
              <Typography variant="subtitle2">$1000 - $2000</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Checkbox name=">2000" onChange={hanldeTogglePrice} checked={filter.filterByPrice === ">2000"} />
              <Typography variant="subtitle2"> larger $2000</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize="1rem"
              sx={{ pl: 1 }}
            >
              Screen
            </Typography>
            <Box>
              <Box display="flex" alignItems="center">
                <Checkbox name="13" onChange={hanldeToggleScreen} checked={filter.filterByScreen === "13" }/>
                <Typography variant="subtitle2">Laptop 13 inch</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Checkbox name="14" onChange={hanldeToggleScreen} checked={filter.filterByScreen === "14"} />
                <Typography variant="subtitle2">Laptop 14 inch</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Checkbox name="15" onChange={hanldeToggleScreen} checked={filter.filterByScreen === "15"} />
                <Typography variant="subtitle2">Laptop 15 inch</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Checkbar;
