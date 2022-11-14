import React from 'react';
import { Outlet } from 'react-router';
import { Box, Stack } from '@mui/material';
import TopNavbar from '../components/TopNavbar';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';

export default function MainLayout() {
  return (
    <Box minHeight="100vh">
      <Stack sx={{ minHeight: 'inherit' }}>
        <TopNavbar />
        <Box flexGrow={1}>
          <Outlet />
        </Box>
      </Stack>
      <Loading />
      <AlertMessage />
    </Box>
  );
}