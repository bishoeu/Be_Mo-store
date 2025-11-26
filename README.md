
# BeMoStore — Ready for Vercel

This is a minimal Next.js (TypeScript) landing + mock checkout ready to deploy to Vercel.

## How to deploy
1. Install dependencies:
   ```
   npm install
   ```
2. Run locally:
   ```
   npm run dev
   ```
3. Push to a Git repo and import the repo in Vercel (https://vercel.com/import).

## What I included
- Landing page with SEO meta tags and OG image
- GA4 analytics template in `_app.tsx` (replace G-XXXXXXX with your ID)
- Mock checkout storing orders in localStorage
- Public assets (hero, product, logo, og-image)
- Ready to extend with a backend or real payment gateway

## Adding a real payment gateway
I can add integration code for Paymob, PayTabs, or Fawry — including server API routes for order creation and webhook handling. Ask me which provider you prefer.


## Paymob Payment Integration (Implemented)
I added server-side API routes to handle Paymob checkout:

- `POST /api/paymob/create-payment`  
  Body JSON: `{ amount_cents, currency, merchant_order_id, billing_data, items }`  
  Returns: `{ payment_url, payment_token, order_id }` — open `payment_url` in an iframe or redirect the customer.

- `POST /api/paymob/webhook`  
  Receives Paymob transaction callbacks. Verifies HMAC signature (set `PAYMOB_HMAC_KEY`).

### Environment variables
Copy `.env.example` to `.env.local` and fill keys:
```
PAYMOB_API_KEY=
PAYMOB_INTEGRATION_ID=
PAYMOB_IFRAME_ID=
PAYMOB_HMAC_KEY=
```

### Notes & next steps
- Use a production DB to persist orders and verify payment status on webhook.  
- After deploy, configure the webhook URL inside Paymob dashboard to `<https://your-vercel-domain>/api/paymob/webhook` and set the HMAC key there.  
- I used the Accept endpoints documented by Paymob (auth tokens -> ecommerce/orders -> acceptance/payment_keys). If you want I can also implement PayTabs or Fawry integrations similarly.


## Admin Dashboard
Open `/admin` and use `NEXT_PUBLIC_ADMIN_PASS` (set in Vercel environment variables) to access a simple admin page listing orders.

## Notifications (Email & SMS)
- Email endpoint: `POST /api/notify/email` with `{ to, subject, text, html }` — uses SMTP credentials.
- SMS endpoint: `POST /api/notify/sms` with `{ to, body }` — uses Twilio credentials.

## Products API
- `GET /api/products/list` — lists products from MongoDB.
- `POST /api/products/seed` — (dev only) seeds a demo product.

## Orders API
- `POST /api/orders/create` — create an order (supports `payment_method: 'cod'|'online'`). For online it will attempt to call `/api/paymob/create-payment` and return a `payment_url`.
- `GET /api/orders/list` — list recent orders.

## Final notes
- Set environment variables in Vercel dashboard (Settings → Environment Variables).
- Replace `NEXT_PUBLIC_BASE_URL` with your deployment URL to enable server-side internal calls.



## Added features (done for you)
- Enhanced Admin dashboard with search, filter, change order status and product management UI.
- Product CRUD APIs and admin pages (create, edit, delete) with Cloudinary upload endpoint.
- Dynamic product pages `/products/[slug]` with SEO meta tags.
- SendGrid email API endpoint (`/api/notify/sendgrid`) for reliable email delivery.
- PayTabs integration stub (`/api/paytabs/create-payment`) — ready to wire server keys.
- Orders status update API (`/api/orders/update-status`) for admins.

## Cloudinary setup
- Create an unsigned upload preset named `unsigned_preset` (or change `CLOUDINARY_UPLOAD_PRESET`).
- Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in Vercel env vars.

## SendGrid
- Set `SENDGRID_API_KEY` and `SENDGRID_FROM`. Use `/api/notify/sendgrid` to send transactional emails.

## PayTabs
- Set `PAYTABS_PROFILE_ID` and `PAYTABS_SERVER_KEY` to start creating payments via PayTabs.

## Notes & Security
- The admin interface uses a simple client-side session check for fast access. For production, secure the admin with proper auth (JWT, OAuth, NextAuth).
- Cloudinary unsigned upload is used for simplicity. For production, use signed uploads or server-side signing.
- All env secrets should be stored in Vercel Environment Variables (not in repo).
