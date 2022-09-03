import { Task } from "./types/task"

const form = document.querySelector<HTMLFormElement>('.formulario')
const input = document.getElementById('tarea') as HTMLInputElement
const list = document.querySelector<HTMLUListElement>('.listado_tareas')

form?.addEventListener("submit", HandleForm)

function HandleForm (e: Event)  {
  e.preventDefault()
  if(input.value == "" || input.value == null) return

  //creamos un objeto con mi input y creamos una fecha
  const myTask = {
    "title": input.value,
    "date": new Date(),
    "done": false
  }

  Listwork(myTask)
  globalTask.push(myTask) 
  saveStorage() //guarda en el localstorage el [{}]

  input.value = ""
} 


function Listwork(task: Task) {
  let { title, date, done } = task;

  //li principal
  const li = document.createElement("LI")

  //work
  const work = document.createElement('P')
  work.textContent = title
  li.append(work)

  //date
  const wdata = document.createElement('P')
  wdata.textContent = date.toString()
  li.append(wdata)

  //done
  const check = document.createElement("input")
  check.type = "checkbox"
  check.checked = done;
  check.addEventListener('change', () => {
    task.done = check.checked
    saveStorage()
  })
  li.append(check)

  list?.append(li)
}

//ARREGLO
const globalTask: Task[] = getStorage() //[] [a, b, c]
globalTask.forEach(x => Listwork(x))

//save
function saveStorage() {
  localStorage.setItem('TASK', JSON.stringify(globalTask))
}
//get
function getStorage(): Task[] {
  const task = localStorage.getItem('TASK')
  return task == null ? [] : JSON.parse(task)
}