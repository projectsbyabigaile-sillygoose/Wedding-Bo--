// Set target date
const target = new Date("May 28, 2026 15:30:00").getTime();

// Update timer every 1s
const timer = setInterval(() => {
    const diff = target - new Date().getTime();

    //Convert ms to days, hours, mins, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText = `${days}d ${hours}h ${mins}m ${secs}s`;

    // Stop when finished
    if (diff < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerText = "YAY";

    }
}, 1000);

// Select form element
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addToDo');
    const input = document.getElementById('task');
    const assigneeSelect = document.getElementById('assignee');
    const brideList = document.getElementById('brideTasks');
    const groomList = document.getElementById('groomTasks');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskText = input.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Create task text
        const span = document.createElement('span');
        span.textContent = taskText;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        // Append elements to li
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Append li to correct list
        const assignee = assigneeSelect.value;
        if (assignee === 'bride') {
            brideList.appendChild(li);
        } else {
            groomList.appendChild(li);
        }

        input.value = ''; // clear input
    });
});
