import Constants from '../data/constant.json';
const Web3 = require('web3');
let web3

async function getBlockNumber() {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    return (latestBlockNumber);
}

export const connectWeb3 = async (chainType, setBlockNumber, setErrMsg) => {
  try {
    switch (chainType) {
        case 'truffle-dev':
            web3 = new Web3(Constants.truffle["connection-url"]);  // connecting to local ethereum node
            break
        default:
            web3 = new Web3(Constants.truffle["connection-url"]);  // connecting to local ethereum node
    }
    const blockNumber = await getBlockNumber();
    setBlockNumber(blockNumber)
    let accounts =  await web3.eth.getAccounts()
    console.log('accounts ', accounts)
    let chainID = await web3.eth.getChainId()
    console.log('chainID ', chainID)
    let nodeInfo= await web3.eth.getNodeInfo()
    console.log('nodeInfo ', nodeInfo)
   }
    catch (error) {
        console.log(error.message)
        console.log(error.message.length)
        setErrMsg(error.message)
    }
}
