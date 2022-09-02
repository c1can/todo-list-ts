import { Task } from "./types/task"

const form = document.querySelector<HTMLFormElement>('.formulario')
const input = document.getElementById('tarea') as HTMLInputElement
const list = document.querySelector<HTMLUListElement>('.listado_tareas')


form?.addEventListener("submit", HandleForm)

function HandleForm (e: any)  {
  e.preventDefault()
  if(input.value == "" || input.value == null) return

  const myTask = {
    "title": input.value,
    "date": new Date(),
  }

  Listwork(myTask)

  input.value = ""
} 


function Listwork(task: Task) {
  const { title, date } = task;

  const li = document.createElement("LI")
  li.textContent = title

  const wdata = document.createElement('P')
  wdata.textContent = date.toString()
  li.append(wdata)

  const check = document.createElement("input")
  check.type = "checkbox"
  check.checked = false
  li.append(check)

  list?.append(li)
}