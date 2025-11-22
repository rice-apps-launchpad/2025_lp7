import {NextRequest} from "next/server";

let currentKing = "Nobody"

export async function GET() {
  return Response.json({ king: currentKing })
}

type NewKingPost = {
  newKing: string,
}

export async function POST(request: NextRequest) {
  const res = await request.json() as NewKingPost
  currentKing = res.newKing
  return Response.json({ king: currentKing })
}