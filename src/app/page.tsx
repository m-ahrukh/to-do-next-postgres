import dbConnect, { pool } from '@/utils/dbConnect'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { DELETE, GET, POST} from './api/route'

export default async function Home() {

  dbConnect()

  // const data = await pool.query("sELECT * FROM todo")
  // const result = data.rows

  const response = await GET()
  const responseData = await response.json();

  if (!responseData) {
    return null;
  }

  const result = responseData.result || [];

  //Insert Query
  async function addTask(data) {
    'use server'
    let note = data.get("note")?.valueOf();
    //let tasksLength = result.length

    // try {
    //   const newNote = await pool.query("INSERT INTO todo(text) VALUES ($1) RETURNING *", [note])
    //   console.log(newNote.rows[0])
    // }
    // catch (err) {
    //   console.log("Error ", err)
    // }
    await POST(note)
    redirect('/')
  }

  async function deleteTask(data) {
    'use server'
    let id = data.get('id').valueOf()
    // try {
    //   const taskToBeDeleted = await pool.query('DELETE FROM todo WHERE id = $1', [id])
    // }
    // catch (err) {
    //   console.log("Error ", err)
    // }

    await DELETE(12);
    redirect('/')
  }

  return (
    <main className=' mt-10 flex flex-col justify-center items-center'>
      <h1 className='font-bold' style={{ fontSize: '24px' }}>To Do Application</h1>
      <div className='mb-3 mx-5'>
        <h1 className='text-center m-5 font-semibold'>
          Add Task
        </h1>
        <form action={(addTask)} className='flex flex-col justify-center items-center'>
          <input type='text' name='note' id='note' placeholder='Add Note'
            className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
          <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
        </form>
      </div>
      {
        result.map((dataRow) => {
          return (
            <div className='flex flex-row mt-4'>
              <div className='flex flex-row gap-5 w-1/2 my-4'>
                <p>{dataRow.text}</p>
              </div>
              <div className='w-1/2 flex flex-row gap-5 my-2'>
                <Link href={'/edit/' + dataRow.id}>
                  <button className='bg-cyan-600 font-bold text-white p-2'>UPDATE</button>
                </Link>
                <form action={deleteTask}>
                  <input type='text' name="id" value={dataRow.id} hidden />
                  <button className='bg-red-600 font-bold text-white p-2' type='submit'>DELETE</button>
                </form>
              </div>
            </div>
          )
        })
      }
    </main>
  )
}
