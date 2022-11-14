import { useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';

const useWallet = () => useContext(WalletContext);

export default useWallet;