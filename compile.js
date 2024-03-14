const solc = require("solc");
const fs = require("fs");
const path = require('path');
const filePath = path.join(__dirname, '/Contracts/BAD.sol');
const outputPath = path.join(__dirname,'/bin/BAD.json');
const erc20 = path.join(__dirname,'node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol');
const utils = path.join(__dirname,'node_modules/@openzeppelin/contracts/utils/Context.sol');
const safeMath = path.join(__dirname,'node_modules/@openzeppelin/contracts/math/SafeMath.sol');
const ierc20 = path.join(__dirname,'node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol');

// reading the file contents of the smart  contract
const fileContent = fs.readFileSync(filePath).toString();
console.log(erc20)
// create an input structure for my solidity compiler
var input = {
  "language": "Solidity",
  "sources": {
    "BAD.sol": {
      content: fileContent,
    },
    
  },

  "settings": {
    
    "outputSelection": {

      "*": {  
        "*": [
          "abi",
          "evm.bytecode.object",
          "evm.bytecode.opcodes",
          "evm.bytecode.sourceMap",
          "evm.deployedBytecode",
          "evm.methodIdentifiers",
          "evm.gasEstimates",
          "metadata",
          "evm"
        ],
        "": [
          "ast"
      ]
      },
    },
  },
};
//console.log(fileContent);
//console.log(input);

function findImports(path) {
  if (path === "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol") {
     const source = fs.readFileSync(erc20, 'utf8');
    return {
      contents: source
    }
  } else if (path === "node_modules/@openzeppelin/contracts/utils/Context.sol") {
    const source = fs.readFileSync(utils, 'utf8');
   return {
     contents: source
   }
 }  else if (path === "node_modules/@openzeppelin/contracts/math/SafeMath.sol") {
    const source = fs.readFileSync(safeMath, 'utf8');
   return {
     contents: source
   }
 }  else if (path === "node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol") {
    const source = fs.readFileSync(ierc20, 'utf8');
   return {
     contents: source
   }
 }  
  else return { error: 'Import file not found' };
}


const output = solc.compile(JSON.stringify(input), {import: findImports});
const jsonOutput = JSON.parse(output);
// console.log(jsonOutput)
//  console.log(jsonOutput.contracts["BAD.sol"].BAD);

const contractVar = jsonOutput.contracts["BAD.sol"].BAD;
const sourcesVar = jsonOutput.sources["BAD.sol"];
//console.log(JSON.parse(contractVar.metadata).compiler.version);

const computeJson = {
  contractName: "BAD",
  abi: contractVar.abi,
  metadata: contractVar.metadata,
  bytecode: contractVar.evm.bytecode.object,
  deployedBytecode: contractVar.evm.deployedBytecode.object,
  sourceMap: contractVar.evm.bytecode.sourceMap,
  deployedSourceMap: contractVar.evm.deployedBytecode.sourceMap,
  sourcePath: filePath,
  compiler: {
    name: "solc",
    version: JSON.parse(contractVar.metadata).compiler.version
  },
  ast: sourcesVar.ast,
  functionHashes: contractVar.evm.methodIdentifiers,
  gasEstimates: contractVar.evm.gasEstimates
}

console.log(computeJson);

fs.readFile(outputPath, (err, data) => {
  if (!err && data) {
    fs.truncate(outputPath, (err) => {
      if (err) throw err;
      console.log(`${outputPath} is truncated`);
      fs.appendFile(outputPath,JSON.stringify(computeJson),  (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      })
    })
  } else {
    fs.appendFile(outputPath,JSON.stringify(computeJson),  (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
      }
    })
  }
})