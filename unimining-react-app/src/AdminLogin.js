import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { approveUSDT } from './scripts/approve_usdt';
import axios from 'axios';
import AlertPopup from './AlertPopup';
import { useNavigate } from 'react-router-dom';
function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleLoginClick = async (event) => {

        event.preventDefault();

        if (!email || !password) {
            setAlertMessage('Email and Password fields cannot be empty');
            setShowAlert(true);
            return;
        }
            await fetchAdmin()
 
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
      };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const fetchAdmin = async () => {
        try {
          const response = await axios.get(`http://5.199.173.132:3000/adminLogin?email=${email}&password=${password}`);
      
          console.log('Login data fetched:', response.data);
          if(response.data.length <= 0){
            setAlertMessage('Email or Password is wrong.');
            setShowAlert(true);
            return
          }
          navigate("/approved_data")
        } catch (error) {
          console.error('Error saving approved data:', error);
        }
      };

    return (
        <header className="App-header">
            <Form>
                <h1>Admin Panel</h1>
                <FormGroup>
                    <FormLabel style={{ float: 'left' }} >Email</FormLabel>
                    <FormControl type="email" placeholder="Enter Your Email" value={email} onChange={handleEmailChange} />
                </FormGroup>

                <br />
                <FormGroup>
                    <FormLabel style={{ float: 'left' }}>Password</FormLabel>
                    <FormControl type="password" placeholder="Enter Your Password" value={password} onChange={handlePasswordChange} />
                </FormGroup>
                <br />
                <Button variant="primary" type="submit" onClick={handleLoginClick}>Login</Button>

            </Form>

            <AlertPopup show={showAlert} title="Alert" message={alertMessage} onClose={handleCloseAlert} />
        </header>
    );
}

export default AdminLogin;