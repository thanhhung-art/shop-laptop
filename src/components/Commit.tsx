import { Box, Container, Typography } from "@mui/material";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { styled } from '@mui/material/styles';

const BoxStyled = styled(Box)(({theme}) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    marginBottom: 40,
    gap: 25,
  },
}));

const Wrapper = styled(Box)(({theme}) => ({
  height: "20vh",
  display: "flex",
  justifyContent: "center",
  mt: 4,
  [theme.breakpoints.down('sm')]: {
    mt: 24,
    mb: 4,
    height: "auto",
  }
}));

const Commit = () => {
  return (
    <Container>
      <Wrapper>
        <BoxStyled>
          <Box sx={{maxWidth: "400px"}}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <MilitaryTechIcon color="primary" fontSize="large" />
            </Box>
            <Typography variant="h6" align="center">Guarantee</Typography>
            <Typography variant="subtitle1" align="center" fontSize="small">Morbi nec leo lacus. Donec ac purus at odio consectetur fermentum.</Typography>
          </Box>
          <Box sx={{maxWidth: "400px"}}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <LocalShippingIcon color="primary" fontSize="large"/>
            </Box>
            <Typography variant="h6" align="center">Free Shipping</Typography>
            <Typography variant="subtitle1" align="center" fontSize="small">Morbi nec leo lacus. Donec ac purus at odio consectetur fermentum.</Typography>
          </Box>
          <Box sx={{maxWidth: "400px"}}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <PaymentIcon color="primary" fontSize="large"/>
            </Box>
            <Typography variant="h6" align="center">Payment Secured</Typography>
            <Typography variant="subtitle1" align="center" fontSize="small">Morbi nec leo lacus. Donec ac purus at odio consectetur fermentum.</Typography>
          </Box>
        </BoxStyled>
      </Wrapper>
    </Container>
  );
};

export default Commit;
