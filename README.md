# React Template Project – Real Stripe Payment Integration

This project is a React-based template adapted from an HTML theme, featuring dynamic pages for login, registration, blog, courses, cart, and checkout. It currently uses Stripe's test mode for payment simulation. To enable **real payments** with Stripe, follow the steps below.

---

## How to Enable Real Stripe Payments

### 1. Create a Stripe Account
- Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register) and sign up for a free Stripe account.

### 2. Get Your Live API Keys
- In the Stripe dashboard, switch from "Test mode" to "Live mode" (toggle in the left sidebar).
- Go to **Developers > API keys**.
- Copy your **Publishable key** and **Secret key** (starts with `pk_live_...` and `sk_live_...`).

### 3. Update Your React App
- In your React app, locate where the Stripe publishable key is used (usually in `src/pages/Checkout.jsx` or a Stripe config file).
- Replace the test key (`pk_test_...`) with your **live publishable key**.

```
// Example:
<Elements stripe={loadStripe('pk_live_YOUR_LIVE_KEY_HERE')}>
  {/* ... */}
</Elements>
```

### 4. Set Up a Backend for Real Payments
Stripe **requires a backend** to securely create PaymentIntents and handle secret keys. You cannot process real payments from the frontend only.

#### Example Node.js/Express Backend
1. Install dependencies:
   ```bash
   npm install express stripe cors
   ```
2. Create a file (e.g., `server.js`):
   ```js
   const express = require('express');
   const Stripe = require('stripe');
   const cors = require('cors');
   const app = express();
   const stripe = Stripe('sk_live_YOUR_SECRET_KEY');

   app.use(cors());
   app.use(express.json());

   app.post('/create-payment-intent', async (req, res) => {
     const { amount, currency } = req.body;
     try {
       const paymentIntent = await stripe.paymentIntents.create({
         amount, // in cents
         currency,
       });
       res.send({ clientSecret: paymentIntent.client_secret });
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });

   app.listen(4242, () => console.log('Server running on port 4242'));
   ```
3. Start your backend:
   ```bash
   node server.js
   ```

#### Update Your Frontend to Use the Backend
- In your React app, update the payment flow to call your backend's `/create-payment-intent` endpoint to get a `clientSecret` for Stripe Elements.
- Use this `clientSecret` to complete the payment.

---

## Security Notes
- **Never expose your Stripe secret key in frontend code.**
- Always use HTTPS in production.
- Test thoroughly in Stripe's test mode before going live.

---

## Need Help?
- See [Stripe’s React integration docs](https://stripe.com/docs/stripe-js/react) for more details.
- For backend setup, see [Stripe’s server quickstart](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#web-create-payment-intent).
- If you need help wiring up the backend or connecting it to your React app, ask your assistant for step-by-step guidance! 