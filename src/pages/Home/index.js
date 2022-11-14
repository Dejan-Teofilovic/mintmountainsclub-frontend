import React, { useState } from 'react';
import { Box, Button, Card, CardContent, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ethers } from "ethers";
import { Icon } from '@iconify/react';
import useWallet from '../../hooks/useWallet';
import {
  CONTRACT_ABI, CONTRACT_ADDRESS, CURRENT_STEP, ERROR, MINT_AMOUNT_LIMIT, PRICE_FOR_PUBLIC, PRICE_FOR_SPECIAL, PRICE_FOR_WHITELIST, SUCCESS
} from '../../utils/constants';
import useAlertMessage from '../../hooks/useAlertMessage';
import api from '../../utils/api';

export default function Home() {
  const { currentAccount } = useWallet();
  const { openAlert } = useAlertMessage();
  const theme = useTheme();

  const [mintAmount, setMintAmount] = useState(1);

  const increaseMintAmount = () => {
    if (mintAmount < MINT_AMOUNT_LIMIT) {
      setMintAmount(mintAmount + 1);
    }
  };

  const decreaseMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };

  const mint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      let transaction = null;

      if (CURRENT_STEP < 3) {
        const hexProof = (await api.put(`/merkleTree/getHexProof/${currentAccount}`, { wlNumber: CURRENT_STEP })).data;
        console.log('>>>>>>>> hexProof => ', hexProof);
        if (hexProof.length == 0) {
          return openAlert({ severity: ERROR, message: "You can't mint now because you aren't registered in our whitelist address. Please wait for our public mint." });
        }
        if (CURRENT_STEP === 1) {
          //  Special mint
          transaction = await contract.allowlistmint1(hexProof, mintAmount, { value: ethers.utils.parseEther(String(PRICE_FOR_SPECIAL)) });
        } else {
          //  Whitelist mint
          transaction = await contract.allowlistmint2(hexProof, mintAmount, { value: ethers.utils.parseEther(String(PRICE_FOR_WHITELIST)) });
        }
      } else {
        //  Public mint
        transaction = await contract.publicMint(mintAmount, { value: ethers.utils.parseEther(String(PRICE_FOR_PUBLIC)) });
      }

      await transaction.wait();
      openAlert({ severity: SUCCESS, message: 'Minted!' });

    } catch (error) {
      console.log('>>>>>> error => ', error);
      openAlert({ severity: ERROR, message: error.data ? error.data.message : 'Transaction is failed.' });
    }
  };
  return (
    <Box position="relative" zIndex={20}>
      <Stack direction="row" justifyContent="center" width="100%" mt={20} >
        <Card sx={{ maxWidth: 300, minWidth: 300, '&.MuiCard-root': { backgroundColor: 'rgba(255, 255, 255, 0.7)' } }}>
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <IconButton
                  sx={{ fontSize: 24, color: theme.palette.primary.main }}
                  onClick={() => decreaseMintAmount()}
                  disabled={mintAmount <= 1}
                >
                  <Icon icon="ant-design:minus-circle-outlined" />
                </IconButton>

                <Box>
                  <Typography fontSize={36} textAlign="center">{mintAmount}</Typography>
                </Box>

                <IconButton
                  sx={{ fontSize: 24, color: theme.palette.primary.main }}
                  onClick={() => increaseMintAmount()}
                  disabled={mintAmount >= MINT_AMOUNT_LIMIT}
                >
                  <Icon icon="ant-design:plus-circle-outlined" />
                </IconButton>
              </Stack>

              <Stack direction="row" justifyContent="center">
                <Button
                  size="large"
                  variant="contained"
                  disabled={!currentAccount}
                  onClick={() => mint()}
                >Mint</Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}