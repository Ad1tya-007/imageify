## Getting Started

First, install packages:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Then add these in your .env.local
```
# CLERK KEYS
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# CLERK URLS
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# CLERK WEBHOOKS 
WEBHOOK_SECRET=

# MONGODB
MONGODB_URL=

# CLOUDINARY
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# STRIPE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# OTHER
NEXT_PUBLIC_SERVER_URL=<DEPLOYED_VERCEL_LINK>
# NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Now to setup all the keys, secrets and webhooks, you have to create an account on the following
* Clerk : https://clerk.com/
* MongoDB: https://www.mongodb.com/atlas/database
* Cloudinary: https://cloudinary.com/
* Stripe: https://stripe.com/en-ca/payments
* Vercel: https://vercel.com/login (For NEXT_PUBLIC_SERVER_URL)
