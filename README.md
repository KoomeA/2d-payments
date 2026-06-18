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
PAYPAL_MODE=sandbox
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