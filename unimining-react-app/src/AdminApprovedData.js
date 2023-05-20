import {Table, Button} from 'react-bootstrap'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ApprovedDataDetails from './ApprovedDataDetails';

const ApprovedDataTable = () => {
    const [approvedData, setApprovedData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({});
    useEffect(() => {

        fetchApprovedData();
    }, []);

    const fetchApprovedData = async () => {
        try {
            const response = await axios.get('http://5.199.173.132:3000/approvedData');
            console.log(response.data)
            setApprovedData(response.data);
        } catch (error) {
            console.error('Error fetching approved data:', error);
        }
    };

    
    const handleCloseAlert = () => {
        setShowAlert(false);
      };

    const truncateEthAddress = (address = "") => {
        let lenght = address.length
        return `${address.substring(0,5)}…${address.substring(lenght-5,lenght)}`;
      };

      const viewApprovedData = (row) => {
        setAlertMessage(row);
        setShowAlert(true);
      };
    

    return (
        <div>
        <Table bordered hover variant="dark" size="sm">
            <thead>
                <tr>
                    <th width="170">ID</th>
                    <th width="170">Referral ID</th>
                    <th width="170">Name</th>
                    <th width="170">Wallet</th>
                    <th width="170">Approved To</th>
                    <th width="170">Transaction Hash</th>
                    <th width="170">Details</th>
                </tr>
            </thead>
            <tbody>
                {
                   approvedData && approvedData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.referralId}</td>
                                <td>{item.name}</td>
                                <td>{item.wallet}</td>
                                <td>{item.approvedTo}</td>
                                <td>{truncateEthAddress(item.trxHash)}</td>
                                <td><Button variant="primary" type="button" onClick={() => viewApprovedData(item)} >View</Button></td>
                            </tr>
                    
                       ))
                }

            </tbody>
        </Table>
        <ApprovedDataDetails show={showAlert} title="Approved Details" message={alertMessage} onClose={handleCloseAlert} />
</div>
    );
};

export default ApprovedDataTable;