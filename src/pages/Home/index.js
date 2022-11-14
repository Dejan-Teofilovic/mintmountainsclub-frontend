import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { ethers } from "ethers";
import useWallet from '../../hooks/useWallet';
import {
  CONTRACT_ABI, CONTRACT_ADDRESS, CURRENT_STEP, PRICE_FOR_PUBLIC, PRICE_FOR_SPECIAL, PRICE_FOR_WHITELIST, SERVER_BASE_URL
} from '../../utils/constants';
import useAlertMessage from '../../hooks/useAlertMessage';

export default function Home() {
  const { currentAccount } = useWallet();
  const { openAlert } = useAlertMessage();

  const mint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      let transaction = null;

      

    } catch (error) {
      openAlert({ severity: 'error', message: error.data ? error.data.message : 'Transaction is failed.' });
    }
  };
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: '20vh' }} spacing={2}>
      <Stack alignItems="center" justifyContent="center" spacing={1} direction="row">
        <TextField type="number" min="0" />
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Button variant="contained">Mint</Button>
      </Stack>
    </Stack>
  );
}