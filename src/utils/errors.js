import { NO_ETHEREUM_OBJECT } from "./constants";

export const isNoEthereumObject = (err) => {
  return NO_ETHEREUM_OBJECT.test(err);
};