// Select form element using ID
const addToDo = document.getElementById('addToDo');

//Add event listener for the 'Submit'
addToDo.addEventListener('submit', function (event) {event.preventDefault();

    const taskInput = document.getElementById('task');
    const taskValue = taskInput.value;

    console.log('Form submitted with new taks:', taskValue);

    taskInput.value='';
})

const password = "TeamTwinkleToes";