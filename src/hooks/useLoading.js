import { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';

const useLoading = () => useContext(LoadingContext);

export default useLoading;