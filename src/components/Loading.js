import React from 'react';
import { CircularProgress, DialogContent } from '@mui/material';
import useLoading from '../hooks/useLoading';
import { CustomDialog } from '../utils/styledComponents';

export default function Loading() {
  const { isLoading } = useLoading();
  return (
    <CustomDialog open={isLoading}>
      <DialogContent>
        <CircularProgress sx={{ color: 'black' }} />
      </DialogContent>
    </CustomDialog>
  );
}