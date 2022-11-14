import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';
import {
    ERROR,
    CHAIN_ID,
    SWITCH_ERROR_CODE,
    CHAIN_NAME,
    RPC_URLS,
    BLOCK_EXPLORER_URLS,
    NATIVE_CURRENCY_NAME,
    NATIVE_CURRENCY_SYMBOL,
    DECIMALS,
    CONTRACT_ABI,
    CONTRACT_ADDRESS
} from '../utils/constants';
import { AlertMessageContext } from './AlertMessageContext';
import { isNoEthereumObject } from '../utils/errors';
import { injected } from '../utils/connectors';

// ----------------------------------------------------------------------

const initialState = {
    walletConnected: false,
    currentAccount: '',
    tokenId: 0
};

const handlers = {
    SET_WALLET_CONNECTED: (state, action) => {
        return {
            ...state,
            walletConnected: action.payload
        };
    },
    SET_CURRENT_ACCOUNT: (state, action) => {
        return {
            ...state,
            currentAccount: action.payload
        };
    },
    SET_TOKEN_ID: (state, action) => {
        return {
            ...state,
            tokenId: action.payload
        };
    }
};

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const WalletContext = createContext({
    ...initialState,
    connectWallet: () => Promise.resolve(),
    disconnectWallet: () => Promise.resolve()
});

//  Provider
function WalletProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { openAlert } = useContext(AlertMessageContext);
    const { active, activate, deactivate, account, chainId } = useWeb3React();

    const connectWallet = () => {
        console.log('>>>> before activate =>')
        activate(injected, (error) => {
            console.log('>>>> error => ', error)
            if (isNoEthereumObject(error))
                window.open("https://metamask.io/download.html");
        });
    };

    const disconnectWallet = () => {
        deactivate();
        dispatch({
            type: 'SET_CURRENT_ACCOUNT',
            payload: ''
        });

        dispatch({
            type: 'SET_WALLET_CONNECTED',
            payload: false
        });
    };

    const getTokenId = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // console.log('# process.env.REACT_APP_CONTRACT_ADDRESS: ', process.env.REACT_APP_CONTRACT_ADDRESS);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const { _hex } = await contract.getTokenId();

        dispatch({
            type: 'SET_TOKEN_ID',
            payload: Number(_hex)
        });
    };

    useEffect(() => {
        (async () => {
            if (chainId) {
                if (chainId === CHAIN_ID) {
                    dispatch({
                        type: 'SET_CURRENT_ACCOUNT',
                        payload: account
                    });

                    dispatch({
                        type: 'SET_WALLET_CONNECTED',
                        payload: true
                    });

                } else {
                    if (window.ethereum) {
                        //  If the current network isn't the expected one, switch it to the expected one.
                        try {
                            await window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
                            });

                            dispatch({
                                type: 'SET_CURRENT_ACCOUNT',
                                payload: account
                            });

                            dispatch({
                                type: 'SET_WALLET_CONNECTED',
                                payload: true
                            });

                        } catch (switchError) {
                            //  If the expected network isn't existed in the metamask.
                            if (switchError.code === SWITCH_ERROR_CODE) {
                                await window.ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                            chainId: `0x${CHAIN_ID.toString(16)}`,
                                            chainName: CHAIN_NAME,
                                            rpcUrls: RPC_URLS,
                                            blockExplorerUrls: BLOCK_EXPLORER_URLS,
                                            nativeCurrency: {
                                                name: NATIVE_CURRENCY_NAME,
                                                symbol: NATIVE_CURRENCY_SYMBOL, // 2-6 characters length
                                                decimals: DECIMALS,
                                            }
                                        },
                                    ],
                                });
                                dispatch({
                                    type: 'SET_CURRENT_ACCOUNT',
                                    payload: account
                                });

                                dispatch({
                                    type: 'SET_WALLET_CONNECTED',
                                    payload: true
                                });

                            } else {
                                dispatch({
                                    type: 'SET_CURRENT_ACCOUNT',
                                    payload: ''
                                });

                                dispatch({
                                    type: 'SET_WALLET_CONNECTED',
                                    payload: false
                                });

                                openAlert({
                                    severity: ERROR,
                                    message: 'Wallet connection failed.'
                                });
                            }
                        }
                    } else {
                        openAlert({ severity: 'error', message: 'Please install Metamask.' });
                        return;
                    }
                }
                getTokenId();
            }
        })();
    }, [chainId]);

    useEffect(() => {
        if (active) {
            dispatch({
                type: 'SET_CURRENT_ACCOUNT',
                payload: account
            });

            dispatch({
                type: 'SET_WALLET_CONNECTED',
                payload: true
            });

            getTokenId();
        }
    }, []);

    return (
        <WalletContext.Provider
            value={{
                ...state,
                connectWallet,
                disconnectWallet
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export { WalletContext, WalletProvider };
