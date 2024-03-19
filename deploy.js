const { configDotenv } = require('dotenv');
const baaTokenJson = require('./build/BAA.json')
const badTokenJson = require('./build/BAD.json');
const { Web3 } = require('web3')


configDotenv();
//Create Admin account and deploy the contract using abi
async function deployContracts() {
   const baaTokenAbi = baaTokenJson.abi;
   const baaBytecode = baaTokenJson.bytecode;
   // const badTokenAbi = badTokenJson.abi;
   //    console.log(baaBytecode)
   const web3 = new Web3(new Web3.providers.HttpProvider(process.env.MUMBAI_RPC_URL));
   const signer = web3.eth.accounts.privateKeyToAccount(process.env.ADMIN_PRIVATE_KEY);
   console.log(`signer===>`,signer)
   const baaContract = new web3.eth.Contract(baaTokenAbi);
   //    console.log(baaContract.deploy)
   const deployBaaContract = await baaContract.deploy({ data: baaBytecode, arguments: [] })
   // console.log(deployBaaContract)

   let estimateGasTokenA = Number.parseFloat(await deployBaaContract.estimateGas({from: signer.address})) * 1.1;
   console.log(`Estimated Gas for token A =======> ${Number.parseInt(estimateGasTokenA)}`)
   let txnCount = await web3.eth.getTransactionCount(signer.address);
   console.log(`deployBaaContract ===>`,deployBaaContract)
   console.log(`Nonce while token A is getting deployed ===> ${txnCount}`)
   // const baaSignContract = await signer.signTransaction(deployBaaContract);
   // console.log(baaSignContract);
   const deployedtokenA = await deployBaaContract.send({
      from: signer.address,
      gas: Number.parseInt(estimateGasTokenA),
      nonce: txnCount
   }).once("transactionHash",(txnHash)=> {
      console.log(`Transaction Hash =====> ${txnHash}`)
   }).once("receipt",(receipt)=> {
      console.log(`Receipt ====> ${receipt}`)
   }).once("error", (error) => {
      console.log(`Error: ${error}`);
  });

}

deployContracts()