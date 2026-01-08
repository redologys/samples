# Twilio SMS Webhook Setup Guide

This guide details how to set up Twilio SMS notifications for booking confirmations.

## Prerequisites

1.  **Twilio Account**: Sign up at [twilio.com](https://www.twilio.com/).
2.  **Phone Number**: Purchase a Twilio phone number.
3.  **Account SID & Auth Token**: Get these from your Twilio Console.

## Environment Variables

Add the following to your `.env` file:

```env
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Implementation Steps

1.  **Install Twilio SDK**:
    `npm install twilio`

2.  **Create API Route**:
    We have set up the database schema to track notifications. You should create a server action or API route to send SMS.

    Example `src/lib/sms.ts`:

    ```typescript
    import twilio from "twilio";

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    export async function sendSMS(to: string, body: string) {
      try {
        const message = await client.messages.create({
          body,
          from: process.env.TWILIO_PHONE_NUMBER,
          to,
        });
        return message;
      } catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
      }
    }
    ```

3.  **Triggering SMS**:
    Call `sendSMS` when a booking is confirmed in your `BookingWizard`'s submit handler (server-side).

## Webhook Setup (Optional - for incoming replies)

If you want to handle customers replying to your SMS:

1.  Create a route at `src/app/api/webhooks/twilio/route.ts`.
2.  Go to **Twilio Console > Phone Numbers > Manage > Active Numbers**.
3.  Click your number.
4.  Scroll to **Messaging > A Message Comes In**.
5.  Select **Webhook** and enter your URL: `https://your-domain.com/api/webhooks/twilio`.
6.  Ensure "HTTP POST" is selected.

## Testing

1.  Use `localhost` environment.
2.  If testing webhooks locally, use **ngrok** to expose your localhost port:
    `ngrok http 3000`
3.  Use the ngrok URL in Twilio Console.
