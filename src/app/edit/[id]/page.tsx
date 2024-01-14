import dbConnect, { pool } from "@/utils/dbConnect";
import { redirect } from "next/navigation";

export default async function Edit({params}) {

  dbConnect()
  let id = params.id

  const data = await pool.query("select * from todo where id = $1 ",[id])
    const result = data.rows[0]

  async function editTask(data){
    'use server'
    let note = data.get('note').valueOf()

    try{
      const updatedTask = await pool.query("update todo set text = $1 where id = $2 returning *", [note, id])
      console.log(updatedTask.rows[0])
    }
    catch(err){
      console.log("Error ", err)
    }
    redirect('/')
  }
 
  return (
    <div>
      <div className='m-5'>
        <h1 className='text-center m-5'>
          Edit Task
        </h1>
        <form action={editTask} className='space-y-5'>
          <input type='text' name='note' id='note' placeholder='Add Note'
            defaultValue={result.text}
            className='shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]' />
          <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}