import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import Player from "@/models/playerModel";

//Get all user players

export async function GET(request, { params }) {
  await connectToDatabase();

  const { clerkId } = params;

  try {
    const data = await Player.find({ clerkId });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error);
  }
}
// create a player for the user
export async function POST(request, { params }) {
  await connectToDatabase();
  const body = await request.json();
  const { clerkId } = params;
  body.clerkId = clerkId;

  try {
    const player = await Player.create(body);

    return NextResponse.json({ player });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
