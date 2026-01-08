import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmation } from "@/lib/services/twilio";
import { sendBookingConfirmationEmail } from "@/lib/services/email";
import { generateBookingNumber, generateTrackingCode } from "@/lib/utils";

// In a real app, this would save to the database
// For now, we'll simulate the booking process

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      deviceType,
      deviceBrand,
      deviceModel,
      issueType,
      issueDescription,
      appointmentDate,
      appointmentTime,
      customerName,
      customerPhone,
      customerEmail,
      estimatedPrice,
      estimatedTime,
    } = body;

    // Validate required fields
    if (!deviceModel || !issueType || !appointmentDate || !appointmentTime || !customerName || !customerPhone || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate booking identifiers
    const bookingNumber = generateBookingNumber();
    const trackingCode = generateTrackingCode();

    // Format date for display
    const dateObj = new Date(appointmentDate);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // In production, save to database here
    // const booking = await prisma.booking.create({...})

    console.log("[Booking] Created:", {
      bookingNumber,
      trackingCode,
      deviceModel,
      issueType,
      appointmentDate: formattedDate,
      appointmentTime,
      customerName,
    });

    // Send SMS confirmation
    const smsResult = await sendBookingConfirmation({
      customerPhone,
      customerName,
      date: formattedDate,
      time: appointmentTime,
      bookingNumber,
      trackingCode,
    });

    console.log("[Booking] SMS result:", smsResult);

    // Send email confirmation
    const emailResult = await sendBookingConfirmationEmail({
      customerEmail,
      customerName,
      deviceModel,
      issue: issueType,
      date: formattedDate,
      time: appointmentTime,
      estimatedPrice: `$${estimatedPrice?.min || 0} - $${estimatedPrice?.max || 0}`,
      estimatedTime: estimatedTime || "30-60 minutes",
      bookingNumber,
      trackingCode,
    });

    console.log("[Booking] Email result:", emailResult);

    return NextResponse.json({
      success: true,
      bookingNumber,
      trackingCode,
      message: "Booking confirmed successfully",
      notifications: {
        sms: smsResult.success,
        email: emailResult.success,
      },
    });
  } catch (error) {
    console.error("[Booking] Error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to create booking",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get available time slots for a date
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json(
      { error: "Date parameter is required" },
      { status: 400 }
    );
  }

  try {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();

    // Business hours
    const hours = [
      { open: "10:00", close: "19:00" }, // Sunday
      { open: "09:00", close: "21:00" }, // Monday
      { open: "09:00", close: "21:00" }, // Tuesday
      { open: "09:00", close: "21:00" }, // Wednesday
      { open: "09:00", close: "21:00" }, // Thursday
      { open: "09:00", close: "21:00" }, // Friday
      { open: "09:00", close: "21:00" }, // Saturday
    ];

    const dayHours = hours[dayOfWeek];
    const slots: { time: string; available: boolean }[] = [];

    // Generate 30-minute slots
    const [openHour, openMin] = dayHours.open.split(":").map(Number);
    const [closeHour, closeMin] = dayHours.close.split(":").map(Number);
    
    let currentMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;

    while (currentMinutes < closeMinutes) {
      const hour = Math.floor(currentMinutes / 60);
      const minute = currentMinutes % 60;
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      
      const timeString = `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
      
      // In production, check database for existing bookings
      // For now, randomly mark some slots as unavailable
      const available = Math.random() > 0.2;
      
      slots.push({ time: timeString, available });
      currentMinutes += 30;
    }

    return NextResponse.json({
      date: dateStr,
      slots,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get time slots" },
      { status: 500 }
    );
  }
}
