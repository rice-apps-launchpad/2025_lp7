import {NextRequest} from "next/server";

let currentKing = "Nobody"


// —— GET request (client will GET: who is on the hill?) ——

export async function GET() {
}


// —— POST request (client will POST: I am the new king of the hill) ——

type NewKingPost = {
  newKing: string,
}

export async function POST(request: NextRequest) {

}