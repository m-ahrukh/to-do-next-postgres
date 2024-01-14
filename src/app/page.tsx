import dbConnect, {pool} from '@/utils/dbConnect'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {

  dbConnect()

  const data = await pool.query("select * from todo")
  const result = data.rows

  //Insert Query
  async function addTask(data){
    'use server'
    let note = data.get("note")?.valueOf();
    let tasksLength  = result.length

    try{
      const newNote = await pool.query("insert into todo(id, text) values ($1, $2) returning *", [tasksLength+1, note])
      console.log(newNote.rows[0])
    }
    catch(err){
      console.log("Error ", err)
    }
    redirect('/')
  }

  async function deleteTask(data){
    'use server'
    let id = data.get('id').valueOf()

    try{
      const taskToBeDeleted = await pool.query('delete from todo where id = $1',[id])
    }
    catch(err){
      console.log("Error ", err)
    }
    redirect('/')
  }

  return (
    <main className='m-10'>
      <div className='m-5'>
        <h1 className='text-center m-5'>
          Add Task
        </h1>
        <form action={addTask} className='space-y-5'>
          <input type='text' name='note' id='note' placeholder='Add Note'
          className='shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]' />
          <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
        </form>
      </div>
      {
        result.map((dataRow)=> {
          return (
            <div className='flex flex-row'>
              <div className='flex flex-row gap-5 w-1/2'>
              <p>{dataRow.id}:</p>
              <p>{dataRow.text}</p>
              </div>
              <div className='w-1/2 flex flex-row gap-5'>
                <Link href={'/edit/'+dataRow.id}>
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
