# PayPal Payment Processor

A simple web interface for processing payments via PayPal API, specifically designed for 2D card payments (standard card payments without 3D Secure authentication).

## Features

- Clean, modern UI for payment processing
- Support for multiple currencies (USD, EUR, GBP, CAD, AUD)
- PayPal SDK integration for secure checkout
- Server-side order creation and capture
- Ready for deployment on Netlify or Vercel

## Prerequisites

1. **PayPal Developer Account**
   - Sign up at [https://developer.paypal.com](https://developer.paypal.com)
   - Create a REST API app in the PayPal Developer Dashboard
   - Get your Client ID and Client Secret

2. **Node.js** (for local development)
   - Download from [https://nodejs.org](https://nodejs.org)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your PayPal credentials:

```
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
NODE_ENV=development
```

### 3. Update Frontend Client ID

Open `public/index.html` and replace `YOUR_PAYPAL_CLIENT_ID` with your actual PayPal Client ID (around line 133):

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_ACTUAL_CLIENT_ID&currency=USD"></script>
```

### 4. Run Locally

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Deployment

### Deploy to Netlify

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm install`
     - Publish directory: `public`

3. **Set Environment Variables in Netlify**
   - Go to Site settings → Environment variables
   - Add:
     - `PAYPAL_CLIENT_ID`: Your PayPal Client ID
     - `PAYPAL_CLIENT_SECRET`: Your PayPal Client Secret
     - `NODE_ENV`: `production`

4. **Deploy**
   - Netlify will automatically deploy your site
   - Update the Client ID in `public/index.html` to use your live PayPal credentials

### Deploy to Vercel

1. **Push your code to GitHub** (same as above)

2. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

3. **Deploy via Vercel Dashboard**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Other
     - Root Directory: `./`
   - Click "Deploy"

4. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add:
     - `PAYPAL_CLIENT_ID`: Your PayPal Client ID
     - `PAYPAL_CLIENT_SECRET`: Your PayPal Client Secret
     - `NODE_ENV`: `production`

5. **Update Client ID**
   - After deployment, update the Client ID in `public/index.html` to use your live PayPal credentials
   - Redeploy the changes

## Testing

### Sandbox Testing

1. Use your **Sandbox** credentials for testing
2. Get sandbox test accounts from [https://developer.paypal.com/dashboard/accounts](https://developer.paypal.com/dashboard/accounts)
3. Test the payment flow with sandbox accounts

### Live Testing

1. Switch to **Live** credentials in environment variables
2. Update `NODE_ENV=production`
3. Use real PayPal accounts for small test transactions

## Project Structure

```
paypal-payment-processor/
├── public/
│   └── index.html          # Frontend payment interface
├── api/
│   └── payment/
│       ├── create-order.js # Vercel API route
│       └── capture-order.js # Vercel API route
├── netlify/
│   └── functions/
│       └── server.js      # Netlify serverless function
├── server.js              # Local development server
├── package.json           # Dependencies
├── netlify.toml          # Netlify configuration
├── vercel.json           # Vercel configuration
├── .env.example          # Environment variables template
└── README.md             # This file
```

## API Endpoints

### POST /api/payment/create-order
Creates a PayPal order.

**Request Body:**
```json
{
  "amount": "10.00",
  "currency": "USD"
}
```

**Response:**
```json
{
  "id": "ORDER_ID"
}
```

### POST /api/payment/capture-order
Captures a PayPal order payment.

**Request Body:**
```json
{
  "orderID": "ORDER_ID"
}
```

**Response:**
```json
{
  "status": "COMPLETED",
  "purchase_units": [...]
}
```

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- Switch to live credentials only in production
- Implement proper error handling and logging in production
- Consider adding rate limiting and authentication for production use

## Support

For issues with PayPal API, visit:
- [PayPal Developer Documentation](https://developer.paypal.com/docs/api/)
- [PayPal Stack Overflow](https://stackoverflow.com/questions/tagged/paypal)

## License

MIT
