import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";
import Player from "@/models/playerModel";

export async function GET(request, { params }) {
  await connectToDatabase();

  const { id } = params;

  try {
    const data = await Player.findById(id);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error);
  }
}
