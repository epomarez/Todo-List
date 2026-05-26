import './containerStyles.css';
import './templateStyles.css';
import { TodoApp } from './TodoApp.js';
import { ProjectItem } from './ProjectItem.js';
import { TodoItem } from './TodoItem.js';
import { createProjectForm } from './createProjectForm.js';
import { createTodoForm } from './createTodoForm.js';
const contentContainer = document.getElementById('container');
const projectItemsContainer = document.getElementById('projectList');
const todoItemsContainer = document.getElementById('todoList');
const subRightContainer = document.getElementById('subRightContainer');
let currentProjectId;

const defaultProject = {
    title: "Start here",
    description: "This is your new project",
}

function renderProjectList(projects) {
    // The while loop purpose is to avoid duplication of 
    // dom elements
    while (projectItemsContainer.firstChild) {
        projectItemsContainer.removeChild(projectItemsContainer.firstChild);
    }

    // Create an html element according to each stored project
    projects.forEach(project => {
        const projectElement = document.createElement('h2');
        projectElement.setAttribute("class", "projectElement");
        projectElement.textContent = project.title;

        projectElement.addEventListener('click', () => {
            currentProjectId = project.id;
            renderTodoList(project.getAllTodoItems());
        });

        projectItemsContainer.appendChild(projectElement);
    });

}

function renderTodoList(todos) {
    // The while loop purpose is to avoid duplication of 
    // dom elements
    while (todoItemsContainer.firstChild) {
        todoItemsContainer.removeChild(todoItemsContainer.firstChild);
    }

    // Create an html element according to each stored project
    todos.forEach(todo => {
        const todoElement = document.createElement('h3');
        todoElement.setAttribute("class", "todoElement");
        todoElement.textContent = todo.title;
        todoItemsContainer.appendChild(todoElement);
    });
}

// This code runs every time the app is opened.
function loadApp(isThereData) {
    if (!isThereData) {
        const newProject = new ProjectItem(defaultProject);
        currentProjectId = newProject.id;
        TodoApp.addProject(newProject);
        renderProjectList(TodoApp.getAllProjects());
    }
}

// This adds or deletes certain html elements according to the selected button.
function cleanAndAppend(container, content) {
    container.removeChild(container.lastChild);
    container.appendChild(content);
}

// This code add events to the buttons

const addProjectBtn = document.getElementById("addProject");

addProjectBtn.addEventListener('click', () => {
    const existingForm =
        subRightContainer.querySelector("#form-container");
    const projectFormElement = createProjectForm(
        (projectData) => {
            const newProject = new ProjectItem(projectData);
            currentProjectId = newProject.id;
            TodoApp.addProject(newProject);
            renderProjectList(TodoApp.getAllProjects());
        }
    )
    if (existingForm) {
        cleanAndAppend(subRightContainer, projectFormElement);
    } else {
        subRightContainer.appendChild(projectFormElement);
    }

});

const addTodoBtn = document.getElementById("addTodo");
addTodoBtn.addEventListener('click', () => {
    const existingForm =
        subRightContainer.querySelector("#form-container");
    const todoFormElement = createTodoForm(
        (todoData) => {
            const newTodo = new TodoItem(todoData);
            const currentProject = TodoApp.getAllProjects().find(
                (project) => project.id === currentProjectId
            );

            currentProject.addTodoItem(newTodo);
            renderTodoList(currentProject.getAllTodoItems());
        }
    )
    if (existingForm) {
        cleanAndAppend(subRightContainer, todoFormElement);
    } else {
        subRightContainer.appendChild(todoFormElement);
    }


});
//This is just for testing functionality
loadApp(false);
console.log(TodoApp.getAllProjects());