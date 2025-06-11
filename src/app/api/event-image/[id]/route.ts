import { NextResponse } from "next/server";
import prisma from "@/databases/db";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const image = await prisma.eventImage.findUnique({
    where: { id },
    select: { data: true, contentType: true }
  });
  if (!image) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(image.data, {
    headers: { "Content-Type": image.contentType }
  });
}