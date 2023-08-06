import './style.css';

const ul = document.querySelector('ul')
const form = document.querySelector('form')
const input = document.querySelector('form > input')

form.addEventListener("submit", event => {
    event.preventDefault() // pour bloquer la recharger la page automatiquement
    const value = input.value
    input.value = ''
    addTodo(value)
    displayTodo()
})


const todos = [
    {
        text: " je suis kraiem",
        done: false,
        editMode: true
    },
    {
        text: "je suis sheima",
        done: true,
        editMode: false
    }
]



const displayTodo = () => {
    const todoList = todos.map((todo, index) => {
        if (todo.editMode) {
            return createTodoEditElement(todo, index)
        }
        else {
            return createTodoElement(todo, index)
        }
    })
    ul.innerHTML = ""
    ul.append(...todoList)
}

const createTodoElement = (todo, index) => {
    const li = document.createElement('li')
    const buttonDelete = document.createElement('button')
    buttonDelete.innerHTML = "supprimer"
    const buttonEdit = document.createElement('button')
    buttonEdit.innerHTML = "edit"
    buttonEdit.classList.add("success");

    buttonDelete.addEventListener('click', (event) => {
        event.stopPropagation()
        deleteTodo(index)
    })

    buttonDelete.classList.add("danger");

    buttonEdit.addEventListener('click', event => {
        event.stopPropagation()
        toggleEditMode(index)
    })

    li.addEventListener('click', event => {
        toggleTodo(index)
    })
    li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}" > </span>
   <p>${todo.text}</p>
    `
    li.append(buttonEdit, buttonDelete)
    return li
}

const createTodoEditElement = (todo, index) => {
    const li = document.createElement('li')
    const input = document.createElement('input')
    input.type = "text"
    input.value = todo.text
    const buttonCancel = document.createElement('button')
    buttonCancel.innerHTML = 'Cancel'
    buttonCancel.classList.add("danger");
    buttonCancel.addEventListener('click', event => {
        event.stopPropagation()
        toggleEditMode(index)
    })
    const buttonSave = document.createElement('button')
    buttonSave.innerHTML = 'Save'
    buttonSave.classList.add("primary");
    buttonSave.addEventListener('click', event => {
        event.stopPropagation()
        editTodo(index, input)
    })
    li.append(input, buttonSave, buttonCancel)
    return li
}

const addTodo = (text) => {
    todos.push({
        text,
        done: false
    })
}

const deleteTodo = (index) => {
    todos.splice(index, 1)
    displayTodo()
}

const toggleTodo = (index) => {
    todos[index].done = !todos[index].done
    displayTodo()
}

const toggleEditMode = (index) => {
    todos[index].editMode = !todos[index].editMode
    displayTodo()
}

const editTodo = (index, input) => {
    const value = input.value
    todos[index].text = value
    todos[index].editMode = false
    displayTodo()
}

displayTodo()
