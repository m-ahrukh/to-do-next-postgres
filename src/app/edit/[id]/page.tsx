import { PATCH } from "@/app/api/route";
import { GET } from "@/app/api/tasks/[id]/route";
import dbConnect, { pool } from "@/utils/dbConnect";
import { redirect } from "next/navigation";

export default async function Edit({ params }) {

  dbConnect()
  let id = params.id

  // const data = await pool.query("select * from todo where id = $1 ", [id])
  // const result = data.rows[0]

  const response = await GET(id)
  const responseData = await response.json();

  if (!responseData) {
    return null;
  }

  const result = responseData.result;

  async function editTask(data) {
    'use server'
    let note = data.get('note').valueOf()

    // try {
    //   const updatedTask = await pool.query("UPDATE todo SET text = $1 WHERE id = $2 RETURNING *", [note, id])
    //   console.log(updatedTask.rows[0])
    // }
    // catch (err) {
    //   console.log("Error ", err)
    // }

    PATCH(note, id)
    redirect('/')
  }

  return (
    <div>
      <div className='m-5 justify-center items-center'>
        <h1 className='text-center mb-3 mx-5 font-semibold'>
          Edit Task
        </h1>
        <form action={editTask} className='flex flex-col justify-center items-center'>
          <input type='text' name='note' id='note' placeholder='Add Note'
            defaultValue={result.text}
            className='shadow-lg rounded-md shadow-black h-10 p-3 w-[100%] mb-6' />
          <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}