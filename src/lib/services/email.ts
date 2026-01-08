import { Resend } from "resend";
import { BUSINESS_INFO } from "@/lib/constants";

// Initialize Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const fromEmail = process.env.FROM_EMAIL || "noreply@mobileexpertsbrooklyn.com";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// ============================================
// EMAIL TEMPLATES
// ============================================

const baseStyles = `
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #0a0a0b; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .card { background: #18181b; border-radius: 16px; padding: 32px; border: 1px solid #27272a; }
    .header { text-align: center; margin-bottom: 24px; }
    .logo { font-size: 24px; font-weight: bold; color: #3b82f6; }
    h1 { color: #ffffff; margin: 0 0 8px 0; font-size: 24px; }
    h2 { color: #ffffff; margin: 0 0 16px 0; font-size: 20px; }
    p { color: #a1a1aa; margin: 0 0 16px 0; line-height: 1.6; }
    .highlight { background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1)); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 20px; margin: 20px 0; }
    .booking-number { font-size: 28px; font-weight: bold; color: #3b82f6; font-family: monospace; }
    .detail-row { display: flex; padding: 12px 0; border-bottom: 1px solid #27272a; }
    .detail-label { color: #71717a; width: 120px; }
    .detail-value { color: #ffffff; font-weight: 500; }
    .button { display: inline-block; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 8px; }
    .button-outline { background: transparent; border: 1px solid #3b82f6; color: #3b82f6; }
    .footer { text-align: center; margin-top: 32px; color: #71717a; font-size: 14px; }
    .location-box { background: #27272a; border-radius: 12px; padding: 16px; margin: 20px 0; }
  </style>
`;

export const emailTemplates = {
  bookingConfirmation: (data: {
    customerName: string;
    deviceModel: string;
    issue: string;
    date: string;
    time: string;
    estimatedPrice: string;
    estimatedTime: string;
    bookingNumber: string;
    trackingCode: string;
  }) => `
<!DOCTYPE html>
<html>
<head>${baseStyles}</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">📱 ${BUSINESS_INFO.name}</div>
        <h1>Booking Confirmed!</h1>
        <p>Thanks for choosing us, ${data.customerName}!</p>
      </div>
      
      <div class="highlight">
        <p style="margin: 0; color: #71717a; font-size: 14px;">Booking Number</p>
        <div class="booking-number">${data.bookingNumber}</div>
      </div>
      
      <h2>Appointment Details</h2>
      <div style="background: #27272a; border-radius: 12px; padding: 16px;">
        <div class="detail-row">
          <span class="detail-label">Device</span>
          <span class="detail-value">${data.deviceModel}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Issue</span>
          <span class="detail-value">${data.issue}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${data.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time</span>
          <span class="detail-value">${data.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Est. Time</span>
          <span class="detail-value">${data.estimatedTime}</span>
        </div>
        <div class="detail-row" style="border: none;">
          <span class="detail-label">Est. Price</span>
          <span class="detail-value" style="color: #22c55e;">${data.estimatedPrice}</span>
        </div>
      </div>
      
      <div class="location-box">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #fff;">📍 Our Location</p>
        <p style="margin: 0; color: #a1a1aa;">${BUSINESS_INFO.fullAddress}</p>
        <p style="margin: 8px 0 0 0; color: #a1a1aa;">📞 ${BUSINESS_INFO.phone}</p>
      </div>
      
      <div style="text-align: center; margin-top: 24px;">
        <a href="${BUSINESS_INFO.website}/track?code=${data.trackingCode}" class="button">Track Your Repair</a>
        <a href="${BUSINESS_INFO.googleMapsUrl}" class="button button-outline">Get Directions</a>
      </div>
      
      <div class="footer">
        <p>Questions? Call us at ${BUSINESS_INFO.phone}</p>
        <p style="color: #52525b; font-size: 12px;">
          ${BUSINESS_INFO.name} | ${BUSINESS_INFO.fullAddress}
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim(),

  reminder24h: (data: {
    customerName: string;
    deviceModel: string;
    date: string;
    time: string;
    bookingNumber: string;
  }) => `
<!DOCTYPE html>
<html>
<head>${baseStyles}</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">📱 ${BUSINESS_INFO.name}</div>
        <h1>Reminder: Your Appointment is Tomorrow!</h1>
      </div>
      
      <p>Hi ${data.customerName},</p>
      <p>This is a friendly reminder about your phone repair appointment tomorrow.</p>
      
      <div class="highlight">
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${data.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time</span>
          <span class="detail-value">${data.time}</span>
        </div>
        <div class="detail-row" style="border: none;">
          <span class="detail-label">Device</span>
          <span class="detail-value">${data.deviceModel}</span>
        </div>
      </div>
      
      <div class="location-box">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #fff;">📍 Where to Find Us</p>
        <p style="margin: 0; color: #a1a1aa;">${BUSINESS_INFO.fullAddress}</p>
      </div>
      
      <p style="color: #71717a; font-size: 14px;">
        Need to reschedule? Please call us at ${BUSINESS_INFO.phone} as soon as possible.
      </p>
      
      <div style="text-align: center; margin-top: 24px;">
        <a href="${BUSINESS_INFO.googleMapsUrl}" class="button">Get Directions</a>
      </div>
      
      <div class="footer">
        <p>See you tomorrow!</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim(),

  readyForPickup: (data: {
    customerName: string;
    deviceModel: string;
    bookingNumber: string;
  }) => `
<!DOCTYPE html>
<html>
<head>${baseStyles}</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">📱 ${BUSINESS_INFO.name}</div>
        <h1>🎉 Your Device is Ready!</h1>
      </div>
      
      <p>Great news, ${data.customerName}!</p>
      <p>Your <strong>${data.deviceModel}</strong> repair is complete and ready for pickup!</p>
      
      <div class="highlight" style="text-align: center;">
        <p style="margin: 0; color: #22c55e; font-size: 18px; font-weight: bold;">
          ✓ Repair Complete
        </p>
      </div>
      
      <div class="location-box">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #fff;">📍 Pick Up Location</p>
        <p style="margin: 0; color: #a1a1aa;">${BUSINESS_INFO.fullAddress}</p>
        <p style="margin: 8px 0 0 0; color: #a1a1aa;">🕐 Open until 9 PM today</p>
      </div>
      
      <p style="background: #27272a; padding: 12px; border-radius: 8px; text-align: center;">
        <span style="color: #71717a;">Booking Number: </span>
        <strong style="color: #3b82f6;">${data.bookingNumber}</strong>
      </p>
      
      <div style="text-align: center; margin-top: 24px;">
        <a href="${BUSINESS_INFO.googleMapsUrl}" class="button">Get Directions</a>
        <a href="tel:${BUSINESS_INFO.phoneClean}" class="button button-outline">Call Store</a>
      </div>
      
      <div class="footer">
        <p>Thank you for choosing ${BUSINESS_INFO.name}!</p>
        <p style="color: #52525b; font-size: 12px;">
          Don't forget to leave us a review if you loved our service! ⭐
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim(),
};

// ============================================
// SEND EMAIL
// ============================================

export async function sendEmail(payload: EmailPayload): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  if (!resend) {
    console.log("[Email] Resend not configured. Email would be sent:", {
      to: payload.to,
      subject: payload.subject,
    });
    return {
      success: true,
      messageId: "dev-mode-" + Date.now(),
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `${BUSINESS_INFO.name} <${fromEmail}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("[Email] Sent successfully:", data?.id);
    
    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ============================================
// SEND BOOKING CONFIRMATION EMAIL
// ============================================

export async function sendBookingConfirmationEmail(data: {
  customerEmail: string;
  customerName: string;
  deviceModel: string;
  issue: string;
  date: string;
  time: string;
  estimatedPrice: string;
  estimatedTime: string;
  bookingNumber: string;
  trackingCode: string;
}) {
  const html = emailTemplates.bookingConfirmation({
    customerName: data.customerName,
    deviceModel: data.deviceModel,
    issue: data.issue,
    date: data.date,
    time: data.time,
    estimatedPrice: data.estimatedPrice,
    estimatedTime: data.estimatedTime,
    bookingNumber: data.bookingNumber,
    trackingCode: data.trackingCode,
  });

  return sendEmail({
    to: data.customerEmail,
    subject: `✅ Booking Confirmed - ${BUSINESS_INFO.name}`,
    html,
  });
}

// ============================================
// SEND 24-HOUR REMINDER EMAIL
// ============================================

export async function send24HourReminderEmail(data: {
  customerEmail: string;
  customerName: string;
  deviceModel: string;
  date: string;
  time: string;
  bookingNumber: string;
}) {
  const html = emailTemplates.reminder24h({
    customerName: data.customerName,
    deviceModel: data.deviceModel,
    date: data.date,
    time: data.time,
    bookingNumber: data.bookingNumber,
  });

  return sendEmail({
    to: data.customerEmail,
    subject: `📅 Reminder: Your Appointment Tomorrow - ${BUSINESS_INFO.name}`,
    html,
  });
}

// ============================================
// SEND READY FOR PICKUP EMAIL
// ============================================

export async function sendReadyForPickupEmail(data: {
  customerEmail: string;
  customerName: string;
  deviceModel: string;
  bookingNumber: string;
}) {
  const html = emailTemplates.readyForPickup({
    customerName: data.customerName,
    deviceModel: data.deviceModel,
    bookingNumber: data.bookingNumber,
  });

  return sendEmail({
    to: data.customerEmail,
    subject: `🎉 Your ${data.deviceModel} is Ready! - ${BUSINESS_INFO.name}`,
    html,
  });
}
