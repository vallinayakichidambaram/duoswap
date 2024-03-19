//Create admin account and store it in env file
//Env file contents - Admin public address, private key and infura/alchemy url for Avalanche testnet

//Once token is deployed, store the address of the deployed token in the env file -> from there take it and pass it to swap contract


//rpc - https://avalanche-fuji-c-chain-rpc.publicnode.com	
//wss - wss://avalanche-fuji-c-chain-rpc.publicnode.com	
// Faucet - https://core.app/tools/testnet-faucet/?subnet=c&token=c
// https://core.app/tools/testnet-faucet/?subnet=wagmi&token=wagmi
const { configDotenv } = require('dotenv');
const { Web3 } = require('web3')
configDotenv()
async function createAdminAccount () {
    const web3 = new Web3(process.env.MUMBAI_RPC_URL);
    const adminAccount = web3.eth.accounts.create();
    console.log(`Admin Account=====> ${adminAccount.address}`);
    console.log(`Admin Private Key=====> ${adminAccount.privateKey}`);

}



createAdminAccount()