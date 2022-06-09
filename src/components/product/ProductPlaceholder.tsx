import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  styled,
  GridSize,
} from "@mui/material";

const ImagePlaceholder = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  height: 140,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 100,
  },
}));

const ProductPlaceholder = ({
  key,
  lg,
  md,
  sm,
  xs,
}: {
  key: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}) => {
  const checkProps = (prop: boolean | GridSize | undefined) =>
    prop === undefined ? false : prop;

  return (
    <Grid
      item
      key={key}
      xs={checkProps(xs)}
      lg={checkProps(lg)}
      md={checkProps(md)}
      sm={checkProps(sm)}
    >
      <Card>
        <CardContent>
          <ImagePlaceholder />
        </CardContent>
        <CardContent>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </CardContent>
        <CardContent>
          <Skeleton variant="text" width={140} />
          <Skeleton variant="text" width={100} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductPlaceholder;
