import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

export default getLibrary;