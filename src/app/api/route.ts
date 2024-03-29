import { pool } from "@/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await pool.query("SELECT * FROM todo")
    const result = data.rows
    return NextResponse.json({
        result
    })
}

export async function POST(data: string) {
    try {
        const newNote = await pool.query("INSERT INTO todo(text) VALUES ($1) RETURNING *", [data])
        console.log("In API fle: " , newNote.rows[0])
        const result = newNote.rowCount[0]
        return NextResponse.json({
            result
        })
    }
    catch (err) {
        console.log("Error ", err) 
    }

}

export async function PATCH(note: string, id: number) {

    try {
        const updatedTask = await pool.query("UPDATE todo SET text = $1 WHERE id = $2 RETURNING *", [note, id])
        console.log(updatedTask.rows[0])
        const result = updatedTask.rowCount[0]
        return NextResponse.json({
           result
        })
      }
      catch (err) {
        console.log("Error ", err)
      }
}

export async function DELETE(id: number) {
    try {
        const taskToBeDeleted = await pool.query('DELETE FROM todo WHERE id = $1', [id])
        return NextResponse.json({
            taskToBeDeleted
        })
      }
      catch (err) {
        console.log("Error ", err)
      }
    
}