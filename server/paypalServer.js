const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const PAYPAL_ENV = process.env.PAYPAL_ENV || 'sandbox';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const BASE_URL = PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
  console.warn('Warning: PAYPAL_CLIENT_ID or PAYPAL_SECRET not set. Set environment variables before starting the server.');
}

async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal token error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.access_token;
}

function storeTransaction(record) {
  try {
    const file = path.join(__dirname, 'data', 'transactions.json');
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    let existing = [];
    if (fs.existsSync(file)) {
      existing = JSON.parse(fs.readFileSync(file, 'utf-8') || '[]');
    }
    existing.unshift({ savedAt: new Date().toISOString(), ...record });
    fs.writeFileSync(file, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('Failed to store transaction:', err);
  }
}

app.post('/api/paypal/order', async (req, res) => {
  try {
    const { amount, currency = 'USD', description = 'Payment', returnUrl, cancelUrl } = req.body || {};
    if (!amount || !returnUrl || !cancelUrl) {
      return res.status(400).json({ ok: false, error: 'amount, returnUrl, and cancelUrl are required' });
    }
    const token = await getAccessToken();
    const orderRes = await fetch(`${BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          { amount: { currency_code: currency, value: amount.toFixed(2) }, description }
        ],
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
          user_action: 'PAY_NOW',
        },
      }),
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      return res.status(orderRes.status).json({ ok: false, error: orderData });
    }
    const approveLink = (orderData.links || []).find(l => l.rel === 'approve')?.href;
    return res.json({ ok: true, id: orderData.id, approveLink });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
});

app.post('/api/paypal/order/:orderId/capture', async (req, res) => {
  try {
    const { orderId } = req.params;
    const token = await getAccessToken();
    const captureRes = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const captureData = await captureRes.json();
    if (!captureRes.ok) {
      return res.status(captureRes.status).json({ ok: false, error: captureData });
    }
    storeTransaction({ type: 'order', orderId, capture: captureData });
    return res.json({ ok: true, data: captureData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
});

app.post('/api/paypal/subscription', async (req, res) => {
  try {
    const { planId, subscriber = {}, returnUrl, cancelUrl } = req.body || {};
    if (!planId || !returnUrl || !cancelUrl) {
      return res.status(400).json({ ok: false, error: 'planId, returnUrl, cancelUrl required' });
    }
    const token = await getAccessToken();
    const subRes = await fetch(`${BASE_URL}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        plan_id: planId,
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
          brand_name: 'Venty',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
        },
        subscriber,
      }),
    });
    const subData = await subRes.json();
    if (!subRes.ok) {
      return res.status(subRes.status).json({ ok: false, error: subData });
    }
    const approveLink = (subData.links || []).find(l => l.rel === 'approve')?.href;
    storeTransaction({ type: 'subscription_init', subscriptionId: subData.id, raw: subData });
    return res.json({ ok: true, id: subData.id, approveLink });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
});

app.post('/api/paypal/webhook', async (req, res) => {
  try {
    storeTransaction({ type: 'webhook', event: req.body });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true, env: PAYPAL_ENV }));

app.listen(PORT, () => {
  console.log(`PayPal backend running on port ${PORT}`);
});

