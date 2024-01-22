import { pool } from "@/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(id: number) {
    console.log("id is " + id)
    const data = await pool.query("select * from todo where id = $1 ", [id])
    const result = data.rows[0]
    return NextResponse.json({
        result
    })
}