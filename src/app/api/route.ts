import { pool } from "@/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await pool.query("SELECT * FROM todo")
    const result = data.rows
    // return result
    return NextResponse.json({
        result
    })
}

// export async function POST(request: Request) {
//     const data = await request.json()
    
//     return NextResponse.json({
//        data
//     })
// }

// export async function PATCH() {
//     return NextResponse.json({
//         id: 1,
//         text: "Tas1"
//     })
// }

// export async function DELETE() {
//     return NextResponse.json({
//         id: 1,
//         text: "Tas1"
//     })
// }