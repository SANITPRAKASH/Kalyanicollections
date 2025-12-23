import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    // ✅ Try cookie first, then Authorization header
    let token = request.cookies.get("auth-token")?.value;

    if (!token) {
      // ✅ Fallback to Authorization header
      const authHeader = request.headers.get("authorization");
      token = authHeader?.replace("Bearer ", "");
    }

   
    // ✅ ADD THESE DEBUG LINES
    console.log("🔍 Token found:", token ? "EXISTS" : "MISSING");
    console.log("🔍 Token value:", token); // ✅ Print the actual token
    console.log("🔍 Token length:", token?.length);

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "kalyani-house-secret-2025-super-secure"
    ) as any;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        verified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // ✅ Same logic for PUT request
    let token = request.cookies.get("auth-token")?.value;

    if (!token) {
      const authHeader = request.headers.get("authorization");
      token = authHeader?.replace("Bearer ", "");
    }

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "kalyani-house-secret-2025-super-secure"
    ) as any;
    const body = await request.json();
    const { name, phone } = body;

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        name,
        phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        verified: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
