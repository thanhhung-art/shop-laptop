import {
  Box,
  Grid,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  styled,
  ButtonGroup,
  Tabs,
  Tab,
  Card,
  CardContent,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import ListProducts from "../components/product/ListProducts";
import Checkbar from "../components/product/Checkbar";
import { useState, useRef, useEffect } from "react";
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { getInfiniteProducts } from "../utils/fetch";
import Footer from "../components/Footer";
import ProductPlaceholder from "../components/product/ProductPlaceholder";

const SelectContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 3,
  },
}));

const ImagePlaceholder = styled(Skeleton)(({theme}) => ({
  width: "100%",
  height: 140,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 100,
  }
}))

const logos = [
  "all",
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

const Products = () => {
  const anchor = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState({
    filterByBrand: "all",
    filterByPrice: "all",
    filterByScreen: "all",
    filterByDemand: "all",
    sort: "none",
  });

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setFilter({ ...filter, filterByBrand: logos[newValue] });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFilter({ ...filter, sort: event.target.value });
  };

  const handleDemands = (demand: string) => {
    setFilter({ ...filter, filterByDemand: demand });
  }

  const totalProducts = useQuery<boolean, string, number>("totalProducts", () =>
    fetch("/api/products/amount").then((res) => res.json())
  );
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useInfiniteQuery("infiniteProducts", getInfiniteProducts, {
    getNextPageParam: (lastPage: { next: number }) => {
      const { next } = lastPage;
      if (totalProducts.data && next <= Math.ceil(totalProducts.data / 9) - 1) {
        return next;
      }
      return undefined;
    },
  });

  useEffect(() => {
    const loadmore = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          await fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 1.0,
      }
    );

    if (anchor.current) {
      loadmore.observe(anchor.current);
    }

    return () => loadmore.disconnect();
  });

  return (
    <>
      <Container maxWidth="lg">
        <Tabs
          value={logos.indexOf(filter.filterByBrand)}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{ my: 2 }}
        >
          {logos.map((logo, index) => (
            <Tab
              label={logo}
              wrapped
              key={index}
              sx={{ fontSize: 14 }}
              onClick={() => setFilter({ ...filter, filterByBrand: logo })}
            />
          ))}
        </Tabs>
        <Box display="flex" sx={{ gap: 2 }}>
          <Checkbar setFilter={setFilter} filter={filter} />
          <Grid container>
            <Grid item sx={{ py: 2, width: "100%" }}>
              <SelectContainer>
                <ButtonGroup variant="text" size="small">
                  {["all", "office", "study", "coding", "gaming"].map((demand, index) => (
                    <Button size="small" key={index} onClick={() => handleDemands(demand)}>
                      {demand}
                    </Button>
                  ))}
                </ButtonGroup>
                <FormControl size="small">
                  <InputLabel id="select_label" sx={{ fontSize: 14 }}>
                    sort to:
                  </InputLabel>
                  <Select
                    labelId="select_label"
                    id="simple_select_label"
                    value={filter.sort}
                    label="Prioritize"
                    onChange={handleChangeSelect}
                    sx={{ fontSize: 12, height: 25 }}
                  >
                    <MenuItem value="none" sx={{ fontSize: 12 }}>
                      none
                    </MenuItem>
                    <MenuItem value="hightPrice" sx={{ fontSize: 12 }}>
                      high price
                    </MenuItem>
                    <MenuItem value="lowPrice" sx={{ fontSize: 12 }}>
                      low price
                    </MenuItem>
                    <MenuItem value="rating" sx={{ fontSize: 12 }}>
                      rating
                    </MenuItem>
                  </Select>
                </FormControl>
              </SelectContainer>
            </Grid>
            {(function () {
              if (isFetchingNextPage || data) {
                return data ? (
                  <>
                    <ListProducts pages={data.pages} filter={filter} />
                    {isFetchingNextPage && <Grid item sx={{pt: 2}} xs={12} display="flex" justifyContent="center"><CircularProgress /></Grid>}
                  </>
                ) : (
                  <></>
                );
              } else if (isFetching) {
                return (
                  <>
                    {[...Array(9)].map((_, index) => (
                      <ProductPlaceholder key={index} xs={6} lg={4} />
                    ))}
                  </>
                );
              }
            })()}
          </Grid>
        </Box>
        <div ref={anchor}></div>
      </Container>
      <Footer />
    </>
  );
};

// function getProducts() {
//   return fetch("http://localhost:5000/api/products")
//     .then((res) => res.json())
//     .then((res) => res);
// }

// export async function getServerSideProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery("products", getProducts);

//   return {
//     props: { dehydratedState: dehydrate(queryClient) },
//   };
// }

export default Products;
