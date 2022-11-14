import { useContext } from 'react';
import { AlertMessageContext } from '../contexts/AlertMessageContext';

const useAlertMessage = () => useContext(AlertMessageContext);

export default useAlertMessage;