const paypal = require('@paypal/checkout-server-sdk');

// PayPal environment setup
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const mode = process.env.PAYPAL_MODE || 'sandbox';

    // Debug logging
    console.log('PAYPAL_CLIENT_ID:', clientId ? 'SET' : 'NOT SET');
    console.log('PAYPAL_CLIENT_SECRET:', clientSecret ? 'SET' : 'NOT SET');
    console.log('PAYPAL_MODE:', mode);

    if (!clientId || !clientSecret) {
        throw new Error('PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set in environment variables');
    }

    // Use live mode if PAYPAL_MODE is set to 'live', otherwise use sandbox
    if (mode === 'live') {
        return new paypal.core.LiveEnvironment(clientId, clientSecret);
    } else {
        return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    }
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
};
