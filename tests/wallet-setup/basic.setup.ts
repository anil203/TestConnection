import { defineWalletSetup } from '@synthetixio/synpress';
import { MetaMask } from '@synthetixio/synpress/playwright';
import "dotenv/config";

const SEED_PHRASE = process.env.SEED_PHRASE;
const PASSWORD = process.env.WALLET_PASSWORD;

const polygonNetworkConfig = {
  name: 'Polygon Mainnet',
  rpcUrl: 'https://polygon.llamarpc.com',
  chainId: 137,
  symbol: 'POL',
  blockExplorerUrl: 'https://polygonscan.com/'
};

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {

  const metamask = new MetaMask(context, walletPage, PASSWORD);

  await metamask.importWallet(SEED_PHRASE);
  await metamask.addNetwork(polygonNetworkConfig);
  await metamask.switchNetwork(polygonNetworkConfig.name); 

})