

const ethers = require('ethers')

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms))
}
async function TransferEthBalance(
  rpcUrl,  
  privateKey,
  destinationAddress
) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  // 连接到以太坊网络
  try{
    // 使用私钥创建一个签名者
    const wallet = new ethers.Wallet(privateKey, provider);
    const targetAddress = wallet.address;
    // 获取目标地址的 token 余额
    const balance = await provider.getBalance(targetAddress)

    // 如果余额大于 0，执行转账操作
    if (balance > 0) {
    const amount = balance; // 如果需要转账所有余额，将这行替换为 const amount = balance;
    let gasPrice = ethers.parseUnits(config.gasPrice.toString(), 'gwei')
    let gasLimit = 21000
    let gasTotal = gasPrice * BigInt(gasLimit)

    if(amount - gasTotal < 0){
      console.log("小于0")
      return false
    }

    // 发起转账
    const tx = await wallet.sendTransaction({
        to:destinationAddress,
        value: amount - gasTotal,
        gasLimit: gasLimit,
        gasPrice: gasPrice
    })

    // 等待交易确认
    await tx.wait();

    return true
    } else {
    console.log('余额为 0，无需转账。');
    }
    return false
  }catch(e){
    console.log(e)
    return false
  }
}

module.exports = {
    TransferEthBalance
}
