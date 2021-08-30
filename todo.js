'use strict';

let tasks = [];

 

const addTask = function () {

    const taskname = document.querySelector('#task-name').value;

    const priority = document.querySelector('#task_priority').value;

    if (taskname != "" && priority > 0) {

        // addTableRow(document.querySelector('#tasks_tbody'),taskname,priority);

        tasks.push({

            name: taskname,

            priority: priority

        });

        renderTable();

    }

}

 

const getPriorityName = function (priority) {

    switch (priority) {

        case "1":

            return "High";

        case "2":

            return "Medium";

        case "3":

            return "Low";

        default:

            return "";

    }

}

 

const moveUp = function (index){

    if(index == 0) return;

    const oldTask = tasks[index];

    tasks[index] = tasks[index-1];

    tasks[index-1] = oldTask;

    renderTable();

}

 

const moveDown = function (index){

    if(index == tasks.length -1) return;

    const oldTask = tasks[index];

    tasks[index] = tasks[index+1];

    tasks[index+1] = oldTask;

    renderTable();

}

 

const deleteTask = function (index){

    if (!confirm("Are you sure?")) return;

    tasks.splice(index,1);

    renderTable();

}

 

const editTask = function (editIndex){

    const table = document.querySelector('#tasks_tbody');

    table.innerHTML = "";

    let row;

    for (let index = 0; index < tasks.length; index++) {

        if(editIndex == index){

            row = `

            <tr>

                <td>${index+1}</td>

                <td>

                    <input type="text" class="form-control" id="task-name_edit" placeholder=${tasks[index].name}>

                </td>

                <td>

                    <select name="priorty" id="task_priority_edit" class="form-control">

                        <option value="1">High</option>

                        <option value="2">Medium</option>

                        <option value="3">Low</option>

                    </select>

                </td>

                <td>

                    ${index > 0 ?`<button class="btn btn-sm btn-secondary" onclick="moveUp(${index})">Up</button>` :``}

                    ${index < tasks.length-1 ?`<button class="btn btn-sm btn-secondary" onclick="moveDown(${index})">Down</button>` :``}

                </td>

                <td>

                    <button class="btn btn-success btn-sm" onclick="saveTask(${index})">Save</button>

                    <button class="btn btn-danger btn-sm"  onclick="renderTable()">Cancel</button>

                    <button class="btn btn-danger btn-sm"  onclick="deleteTask(${index})">Delete</button>

 

                </td>

                

            </tr>

        `;

        }else{

            row = `

                <tr>

                    <td>${index+1}</td>

                    <td>${tasks[index].name}</td>

                    <td>${getPriorityName(tasks[index].priority)}</td>

                    <td>

                        ${index > 0 ?`<button class="btn btn-sm btn-secondary" onclick="moveUp(${index})">Up</button>` :``}

                        ${index < tasks.length-1 ?`<button class="btn btn-sm btn-secondary" onclick="moveDown(${index})">Down</button>` :``}

                    </td>

                    <td>

                        <button class="btn btn-primary btn-sm"  onclick="editTask(${index})">Edit</button>

                        <button class="btn btn-danger btn-sm"  onclick="deleteTask(${index})">Delete</button>

 

                    </td>

                    

                </tr>

            `;

        }

        table.insertAdjacentHTML('beforeEnd', row);

 

    }

    

}

 

const saveTask = function (index){

    const taskname = document.querySelector('#task-name_edit').value;

    const priority = document.querySelector('#task_priority_edit').value;

 

    if (taskname != "" && priority > 0) {

        tasks[index].name =  taskname;

        tasks[index].priority =  priority;

        renderTable();

    }

    

}

 

const renderTable = function () {

    const table = document.querySelector('#tasks_tbody');

    table.innerHTML = "";

    

    for (let index = 0; index < tasks.length; index++) {

        let row = `

        <tr>

            <td>${index+1}</th>

            <td>${tasks[index].name}</th>

            <td>${getPriorityName(tasks[index].priority)}</th>

            <td>

                ${index > 0 ?`<button class="btn btn-sm btn-secondary" onclick="moveUp(${index})">Up</button>` :``}

                ${index < tasks.length-1 ?`<button class="btn btn-sm btn-secondary" onclick="moveDown(${index})">Down</button>` :``}

            </td>

            <td>

                <button class="btn btn-primary btn-sm"  onclick="editTask(${index})">Edit</button>

                <button class="btn btn-danger btn-sm"  onclick="deleteTask(${index})">Delete</button>

            </td>

            

        </tr>

    `;

        table.insertAdjacentHTML('beforeEnd', row);

 

    }

}

 

document.querySelector('#add').addEventListener('click', addTask);
