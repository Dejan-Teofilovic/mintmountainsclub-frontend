import React from 'react';
import { Outlet } from 'react-router';
import { Box, Stack } from '@mui/material';
import TopNavbar from '../components/TopNavbar';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';

export default function MainLayout() {
  return (
    <Box className="bg-main" sx={{ minHeight: '100vh' }}>
      <Stack sx={{ minHeight: 'inherit' }}>
        <TopNavbar />
        <Box flexGrow={1}>
          <Box
            component="img"
            src="assets/images/image-card-1.png"
            alt=""
            position="absolute"
            right={50}
            width="12%"
            top={100}
            zIndex={10}
            sx={{
              transform: 'rotate(30deg)'
            }}
          />
          <Box
            component="img"
            src="assets/images/image-card-2.png"
            alt=""
            position="absolute"
            right={400}
            width="12%"
            top={400}
            zIndex={10}
            sx={{
              transform: 'rotate(60deg)'
            }}
          />
          <Box
            component="img"
            src="assets/images/image-card-3.png"
            alt=""
            position="absolute"
            left={100}
            width="12%"
            top={300}
            zIndex={10}
            sx={{
              transform: 'rotate(30deg)'
            }}
          />
          <Outlet />
        </Box>
      </Stack>
      <Loading />
      <AlertMessage />
    </Box>
  );
}