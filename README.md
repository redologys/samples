# Mobile Experts Inc - Brooklyn Phone Repair Website

A premium, production-ready website for Mobile Experts Inc, Brooklyn's trusted phone repair shop. Built with Next.js 14, TypeScript, Tailwind CSS, and featuring an integrated booking system with SMS/email notifications.

![Mobile Experts Inc](https://via.placeholder.com/1200x630/0a0a0b/3b82f6?text=Mobile+Experts+Inc)

## 🌟 Features

### Customer-Facing

- **Premium Homepage** - Hero section, services overview, testimonials, trust indicators
- **Multi-Step Booking System** - 6-step guided booking flow with real-time availability
- **Repair Tracking** - Real-time status updates with timeline visualization
- **Services Page** - Detailed repair services with pricing
- **Accessories Shop** - Phone cases, screen protectors, and accessories (coming soon)
- **Bill Payment Portal** - Pay phone bills securely online (coming soon)
- **Contact & Location** - Embedded Google Maps, business hours, click-to-call

### Admin Features (Coming Soon)

- Calendar view of all bookings
- Customer database with repair history
- Status updates with SMS/email notifications
- Revenue tracking and analytics
- Inventory management

### Technical Features

- **SMS Notifications** via Twilio
- **Email Notifications** via Resend
- **Payment Processing** via Stripe (coming soon)
- **Database** via PostgreSQL/Prisma
- **Authentication** via NextAuth.js
- **SEO Optimized** with JSON-LD schema, meta tags, sitemap

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or Supabase/Vercel Postgres)

### Installation

1. **Clone the repository**

   ```bash
   cd mobile-experts-brooklyn
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your actual values.

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mobile-experts-brooklyn/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── bookings/      # Booking endpoints
│   │   │   └── notifications/ # Notification endpoints
│   │   ├── book/              # Booking flow pages
│   │   ├── track/             # Repair tracking page
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Design system styles
│   ├── components/
│   │   ├── booking/           # Booking flow components
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Homepage sections
│   │   └── ui/                # Reusable UI components
│   └── lib/
│       ├── constants.ts       # Business info, services, testimonials
│       ├── prisma.ts          # Prisma client
│       ├── utils.ts           # Utility functions
│       └── services/          # External services (Twilio, Resend)
├── .env.example               # Environment variables template
├── package.json
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json
```

## 🔧 Configuration

### Twilio SMS Setup

1. Create a Twilio account at [twilio.com](https://www.twilio.com)
2. Get your Account SID and Auth Token from the console
3. Purchase a phone number
4. Add credentials to `.env.local`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_PHONE_NUMBER=+12345678901
   ```

### Resend Email Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Add and verify your domain
3. Create an API key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxx
   FROM_EMAIL=noreply@yourdomain.com
   ```

### Stripe Payment Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/mobile-experts-brooklyn)

### Production Checklist

- [ ] Set `NEXTAUTH_SECRET` to a secure random string
- [ ] Configure production database URL
- [ ] Set up Twilio production credentials
- [ ] Verify email domain in Resend
- [ ] Set up Stripe live mode keys
- [ ] Configure Google Maps API key restrictions
- [ ] Enable Vercel Analytics

## 📱 SMS Notification Templates

The system sends automated SMS for:

1. **Booking Confirmation** - Immediately after booking
2. **24-Hour Reminder** - Day before appointment
3. **Status Updates** - When repair status changes
4. **Ready for Pickup** - When device is ready

## 🎨 Design System

The website uses a premium design system with:

- **Colors**: Primary (Blue), Accent (Cyan), Success, Warning, Error
- **Typography**: Inter font family with full scale (H1-H6, body, captions)
- **Spacing**: 4px base grid system
- **Shadows**: Subtle glows and elevation
- **Animations**: Smooth transitions with cubic-bezier easing

View the full design system at `/style-guide` (coming soon).

## 📊 SEO Optimization

- **Local SEO** keywords for Brooklyn phone repair
- **JSON-LD** structured data for LocalBusiness
- **Meta tags** for all pages
- **Open Graph** images for social sharing
- **Sitemap** at `/sitemap.xml`
- **Robots.txt** configured

## 🔒 Security

- Input validation on all forms
- CSRF protection via NextAuth
- Rate limiting on API routes (coming soon)
- Secure headers configured

## 📝 License

This project is proprietary and intended for Mobile Experts Inc.

## 🤝 Support

For technical support, please contact the development team.

---

Built with ❤️ for Mobile Experts Inc, Brooklyn NY
