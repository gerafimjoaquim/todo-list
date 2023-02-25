const formAddTodo = query('.form-add-todo')
const todosContainer = query('.todos-container')
const inputSearchTodo = query('.form-search input')

const btnGoToRepository = query('.btn-go-to-repository')

const addTodo = inputValue => {
	const inputNotEmpty = inputValue.length

	if (inputNotEmpty) {
		todosContainer.innerHTML += `
		<li class="list-group-item" data-todo="${inputValue}">
	        <span>${inputValue}</span>
	        <span data-trash="${inputValue}">⛌</span>
		</li>
		`
	}
}

const filterTodos = (todos, inputValue, returnMatchedTodos)  => todos
	.filter(({ textContent }) => {
		const matchedTodos = textContent.toLowerCase().includes(inputValue)
		return returnMatchedTodos ? matchedTodos : !matchedTodos
	})



const hideTodos = (todos, inputValue) => {

	filterTodos(todos, inputValue, true)
	.forEach(todo => todo.classList.remove('hidden'))
}

const showTodos = (todos, inputValue) => {
	filterTodos(todos, inputValue, false)
	.forEach(todo => todo.classList.add('hidden'))
}

const removeTodo = clickedElement => {
	const trashValue = clickedElement.dataset.trash

	if (trashValue) {
		query(`[data-todo="${trashValue}"]`).remove()
	}
}

formAddTodo.addEventListener('submit', event => {
	event.preventDefault()
	const inputValue = event.target.add.value.trim()

	addTodo(inputValue)
	event.target.reset()
})

inputSearchTodo.addEventListener('input', ({ target }) => {
	const inputValue = target.value.trim().toLowerCase()
	const todos = Array.from(todosContainer.children)

	hideTodos(todos, inputValue)
	showTodos(todos, inputValue)
	
})

todosContainer.addEventListener('click', ({ target }) => {
	const clickedElement = target
	removeTodo(clickedElement)
})

function goToRepository () {
	const repositoryName = 'https://github.com/gerafimjoaquim/todo-list'

	setAttribute(btnGoToRepository, 'target', '_blank')
	setAttribute(btnGoToRepository, 'href', repositoryName)

}

btnGoToRepository.addEventListener('click', goToRepository)