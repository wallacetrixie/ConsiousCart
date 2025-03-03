require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const CONSUMER_KEY = 'tEVkQMy0kecFolAABzL19kRyyDzb0KtYu1AHGG7tuH5n5cmw';
const CONSUMER_SECRET = 'StopXyRZsDcN4Zzhzxd4CFeFoIoidVz64qTgMtVufonG22pS5iRuxAVCOBKx1yNF';
const BUSINESS_SHORT_CODE = '174379';
const PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2c2e74c9c644c13c7e5a2cddf672c9b0';
const CALLBACK_URL ='https://sandbox.safaricom.co.ke/mpesa/';

if (!CONSUMER_KEY || !CONSUMER_SECRET || !BUSINESS_SHORT_CODE || !PASSKEY || !CALLBACK_URL) {
  console.error('Missing required environment variables. Check your .env file.');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to get access token
const getAccessToken = async () => {
  try {
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

    const response = await axios.get(url, {
      headers: { 'Authorization': `Basic ${auth}` }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response?.data || error.message);
    throw new Error('Failed to obtain access token');
  }
};

// Function to generate timestamp and password
const generatePassword = () => {
  const now = new Date();
  const timestamp = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0');

  const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString('base64');
  return { password, timestamp };
};

// Function to format phone number correctly
const formatPhoneNumber = (phone) => {
  if (phone.startsWith('+254')) {
    return phone.replace('+', '');
  } else if (phone.startsWith('254')) {
    return phone;
  } else if (phone.startsWith('0')) {
    return `254${phone.slice(1)}`;
  }
  throw new Error('Invalid phone number format');
};

// Route to initiate STK push
app.post('/api/stkpush', async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;

    if (!phoneNumber || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid phone number or amount' });
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    const accessToken = await getAccessToken();
    const { password, timestamp } = generatePassword();

    const stkPushUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const data = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: BUSINESS_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: 'P-Lan Event Payment',
      TransactionDesc: 'Payment for event services'
    };

    const response = await axios.post(stkPushUrl, data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('STK push error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data?.errorMessage || 'STK push request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
