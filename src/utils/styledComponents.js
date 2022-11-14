import { Button, Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PrimaryButton = styled(Button)`
  color: black;
  border-radius: 25px;
  text-transform: capitalize;
`;

export const CustomDialog = styled(Dialog)({
  '& .MuiPaper-root': {
    borderRadius: 25,
  }
});

export const TextButton = styled(Button)`
  text-transform: capitalize;
`;