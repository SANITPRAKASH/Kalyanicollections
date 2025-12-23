import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    // Validation
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check OTP from database
    const storedOTP = await prisma.oTP.findUnique({
      where: { email },
    });

    if (!storedOTP) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Check if OTP matches
    if (storedOTP.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Check if OTP is expired
    if (new Date() > storedOTP.expiresAt) {
      // Delete expired OTP
      await prisma.oTP.delete({
        where: { email },
      });

      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // OTP is valid - delete it from database
    await prisma.oTP.delete({
      where: { email },
    });

    // Update user verification status
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { verified: true },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    // ✅ ADD THIS
    console.log("✅ Generated token:", token);
    console.log("✅ Token length:", token.length);

    // Send welcome email for new registrations
    if (!user.verified) {
      await sendWelcomeEmail(user.email, user.name);
    }

    // Set cookie
    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        verified: updatedUser.verified,
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
