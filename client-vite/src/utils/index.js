import { createThirdwebClient, getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { WAKEME_CRYPTO_CONTRACT_ADDRESS } from "./constants";

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

export const thirdwebClient = createThirdwebClient({ clientId });

export const wakemecryptoContract = getContract({
  address: WAKEME_CRYPTO_CONTRACT_ADDRESS,
  client: thirdwebClient,
  chain: polygonAmoy
});
