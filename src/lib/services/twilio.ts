import twilio from "twilio";
import { BUSINESS_INFO } from "@/lib/constants";

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export interface SMSPayload {
  to: string;
  message: string;
}

// ============================================
// SMS TEMPLATES
// ============================================

export const smsTemplates = {
  bookingConfirmation: (data: {
    customerName: string;
    date: string;
    time: string;
    bookingNumber: string;
    trackingCode: string;
  }) => `
Thanks for booking with ${BUSINESS_INFO.name}! 🛠️

Booking #: ${data.bookingNumber}
Date: ${data.date}
Time: ${data.time}

📍 ${BUSINESS_INFO.fullAddress}
📞 ${BUSINESS_INFO.phone}

Track your repair: ${BUSINESS_INFO.website}/track?code=${data.trackingCode}

See you soon!
  `.trim(),

  reminder24h: (data: {
    customerName: string;
    date: string;
    time: string;
  }) => `
Reminder: ${data.customerName}, your phone repair at ${BUSINESS_INFO.name} is tomorrow at ${data.time}! 📱

📍 ${BUSINESS_INFO.fullAddress}

Need to reschedule? Call ${BUSINESS_INFO.phone}
  `.trim(),

  statusUpdate: (data: {
    status: string;
    message: string;
    trackingCode: string;
  }) => `
Update from ${BUSINESS_INFO.name}:

${data.message}

Track status: ${BUSINESS_INFO.website}/track?code=${data.trackingCode}
  `.trim(),

  readyForPickup: (data: {
    customerName: string;
    deviceModel: string;
  }) => `
Great news, ${data.customerName}! 🎉

Your ${data.deviceModel} is ready for pickup at ${BUSINESS_INFO.name}!

📍 ${BUSINESS_INFO.fullAddress}
🕐 Open until 9 PM

Call if you have questions: ${BUSINESS_INFO.phone}
  `.trim(),

  diagnosticsComplete: (data: {
    technicianName: string;
    issue: string;
    estimatedPrice: string;
  }) => `
Diagnostics Complete at ${BUSINESS_INFO.name}!

Issue: ${data.issue}
Estimated Cost: ${data.estimatedPrice}

${data.technicianName} will call you shortly to discuss options.

📞 ${BUSINESS_INFO.phone}
  `.trim(),
};

// ============================================
// SEND SMS
// ============================================

export async function sendSMS(payload: SMSPayload): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  if (!client || !twilioPhone) {
    console.log("[SMS] Twilio not configured. SMS would be sent:", payload);
    return {
      success: true,
      messageId: "dev-mode-" + Date.now(),
    };
  }

  try {
    const message = await client.messages.create({
      body: payload.message,
      from: twilioPhone,
      to: payload.to,
    });

    console.log("[SMS] Sent successfully:", message.sid);
    
    return {
      success: true,
      messageId: message.sid,
    };
  } catch (error) {
    console.error("[SMS] Failed to send:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ============================================
// SEND BOOKING CONFIRMATION
// ============================================

export async function sendBookingConfirmation(data: {
  customerPhone: string;
  customerName: string;
  date: string;
  time: string;
  bookingNumber: string;
  trackingCode: string;
}) {
  const message = smsTemplates.bookingConfirmation({
    customerName: data.customerName,
    date: data.date,
    time: data.time,
    bookingNumber: data.bookingNumber,
    trackingCode: data.trackingCode,
  });

  return sendSMS({
    to: data.customerPhone,
    message,
  });
}

// ============================================
// SEND 24-HOUR REMINDER
// ============================================

export async function send24HourReminder(data: {
  customerPhone: string;
  customerName: string;
  date: string;
  time: string;
}) {
  const message = smsTemplates.reminder24h({
    customerName: data.customerName,
    date: data.date,
    time: data.time,
  });

  return sendSMS({
    to: data.customerPhone,
    message,
  });
}

// ============================================
// SEND STATUS UPDATE
// ============================================

export async function sendStatusUpdate(data: {
  customerPhone: string;
  status: string;
  message: string;
  trackingCode: string;
}) {
  const smsMessage = smsTemplates.statusUpdate({
    status: data.status,
    message: data.message,
    trackingCode: data.trackingCode,
  });

  return sendSMS({
    to: data.customerPhone,
    message: smsMessage,
  });
}

// ============================================
// SEND READY FOR PICKUP
// ============================================

export async function sendReadyForPickup(data: {
  customerPhone: string;
  customerName: string;
  deviceModel: string;
}) {
  const message = smsTemplates.readyForPickup({
    customerName: data.customerName,
    deviceModel: data.deviceModel,
  });

  return sendSMS({
    to: data.customerPhone,
    message,
  });
}
