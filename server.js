const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Import PayPal SDK
const paypal = require('@paypal/checkout-server-sdk');

// PayPal environment setup
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set in environment variables');
    }

    // Use live mode if PAYPAL_MODE is set to 'live', otherwise use sandbox
    if (process.env.PAYPAL_MODE === 'live') {
        return new paypal.core.LiveEnvironment(clientId, clientSecret);
    } else {
        return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    }
}

// Create Order API
app.post('/api/payment/create-order', async (req, res) => {
    try {
        const { amount, currency = 'USD' } = req.body;

        if (!amount || parseFloat(amount) <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: parseFloat(amount).toFixed(2)
                }
            }]
        });

        const response = await client().execute(request);
        res.json({ id: response.result.id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
});

// Capture Order API
app.post('/api/payment/capture-order', async (req, res) => {
    try {
        const { orderID } = req.body;

        if (!orderID) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        const response = await client().execute(request);
        res.json(response.result);
    } catch (error) {
        console.error('Error capturing order:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Payment API is running' });
});

// Serve the main page for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`PayPal Mode: ${process.env.PAYPAL_MODE || 'sandbox'}`);
});
