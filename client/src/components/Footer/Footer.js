import React from "react";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Link } from "@material-ui/core";

function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="#333"
        marginTop="7rem"
        color="white"
        bottom="0"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Eazysell</Box>
              <Box>
                <Link href="/" color="inherit">
                  Account
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Contact</Box>
              <Box>
                <Link href="/" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Register
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>About</Box>
              <Box>
                <Link href="/" color="inherit">
                  Terms and conditions
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Report abuse
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} bp={{ xs: 5, sm: 0 }}>
            Eazysell &copy; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
