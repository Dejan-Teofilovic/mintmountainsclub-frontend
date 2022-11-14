import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';
import useWallet from '../hooks/useWallet';
import { TextButton } from '../utils/styledComponents';
import { ROUTES } from '../utils/constants';

const CustomizedDrawer = styled(Drawer)`
  .MuiPaper-root {
    background-color: #111;
  }
`;

export default function TopNavbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { connectWallet, currentAccount, walletConnected, tokenId, disconnectWallet } = useWallet();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(10, 10, 10, 0)',
        py: { md: 1 },
        boxShadow: 'none'
      }}>
      <Container maxWidth="xl">
        <Toolbar>
          {/* For Mobile */}
          <IconButton
            size="large"
            sx={{ color: '#FFFFFF', ml: { xs: 2, md: 0 }, display: { xs: 'flex', md: 'none' } }}
            onClick={() => setDrawerOpened(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* For Mobile */}
          <CustomizedDrawer
            anchor="right"
            open={drawerOpened}
            onClose={() => setDrawerOpened(false)}
          >
            <Box my={3}>
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Button component={RouterLink} to="/">
                  <Box component="img" src="/assets/images/logo.png" width={50} />
                </Button>
              </Stack>
              <List sx={{ mt: 2 }} onClick={() => setDrawerOpened(false)}>
                {
                  ROUTES.map(route => (
                    <ListItem key={route.path}>
                      <ListItemButton
                        sx={{ color: grey[300] }}
                      >
                        <Link href={route.path} sx={{ color: 'white', textDecoration: 'none' }}>{route.name}</Link>
                      </ListItemButton>
                    </ListItem>
                  ))
                }
              </List>
            </Box>
          </CustomizedDrawer>

          {/* Logo for desktop */}
          <Button component={RouterLink} to="/" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box component="img" src="/assets/images/logo.png" width={70} ml={1} />
          </Button>

          <Box flexGrow={1}>
            <Stack direction="row" justifyContent="center">
              {/* Logo for desktop */}
              <Button component={RouterLink} to="/" sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Box component="img" src="/assets/images/logo.png" width={70} ml={1} />
              </Button>
            </Stack>
          </Box>
          {
            ROUTES.map(route => (
              <TextButton
                key={route.path}
                sx={{ mr: 4, fontWeight: 600, color: grey[300], display: { xs: 'none', md: 'flex' } }}
              >
                <Link href={route.path} sx={{ color: 'white' }}>{route.name}</Link>
              </TextButton>
            ))
          }
          {
            walletConnected ? (
              <Button variant="contained" onClick={() => disconnectWallet()}>
                {`${currentAccount.slice(0, 8)}...${currentAccount.slice(-4)}`}
              </Button>
            ) : (
              <Button variant="contained" onClick={() => connectWallet()}>Connect wallet</Button>
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}