import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import axios from 'axios';

const QRCodeGenerator = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState('');
  const [redirectLink, setRedirectLink] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handleGenerateQRCode = async() => {
    setShowQRCode(true);
    await saveQRGeneratorData()
  };

  
  const saveQRGeneratorData = async () => {
    try {
      const response = await axios.post('http://5.199.173.132:3000/approveLinks', {
        walletAddress,
        message,
        redirectLink,

      });
  
      console.log('Approved data saved:', response.data);
    } catch (error) {
      console.error('Error saving approved data:', error);
    }
  };

  return (
    <header className="App-header">

      <Form>
      <h1>QR Code Generator</h1>
        <Form.Group controlId="walletAddress">
          <Form.Label style={{ float: 'left' }}>Wallet Address:</Form.Label>
          <Form.Control
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label style={{ float: 'left' }}>Message:</Form.Label>
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="redirectLink">
          <Form.Label style={{ float: 'left' }}>Redirect Link:</Form.Label>
          <Form.Control
            type="text"
            value={redirectLink}
            onChange={(e) => setRedirectLink(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={handleGenerateQRCode}>
          Generate QR Code
        </Button>
      </Form>

      {showQRCode && (
        <div>
            
        <br />
          <Form.Label style={{ float: 'left' }}>Link: {`${window.location.origin}/approve?wallet=${walletAddress}`}</Form.Label> <br />
          <QRCode value={`${window.location.origin}/approve?wallet=${walletAddress}`} />
        </div>
      )}
    </header>
  );
};

export default QRCodeGenerator;