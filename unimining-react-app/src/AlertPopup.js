import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AlertPopup({ show, title, message, onClose }) {
  const [qrData, setQRData] = useState([]);
  const [valid, setValid] = useState(false);

  useEffect(() => {

    if(show && validateTronAddress(message)){
      fetchQRData(message);
  }
}, [show]);

  const fetchQRData = async (wallet) => {
    try {
        const response = await axios.get(`http://5.199.173.132:3000/approveLinks?walletAddress=${wallet}`);
        console.log(response.data)
        setQRData(response.data);
    } catch (error) {
        console.error('Error fetching approved data:', error);
    }
};

const validateTronAddress = (wallet)=>{
  const tronWalletAddressPattern = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;

  // Validate if variable is a Tron wallet address
  if (tronWalletAddressPattern.test(wallet)) {
    setValid(true)
    return true
  } else {
    setValid(false)
    return false
  }
}

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         
        {valid && qrData.length > 0
        ?qrData[0].message
        :message}</Modal.Body>
      <Modal.Footer>
      {valid && qrData.length > 0
      ?<Button variant="primary" onClick={()=>window.location.href = qrData[0].redirectLink}>
      Continue
    </Button>
      :<Button variant="secondary" onClick={onClose}>
      Close
    </Button>
}
      </Modal.Footer>
    </Modal>
  );
}

export default AlertPopup;