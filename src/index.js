import './containerStyles.css';
import './templateStyles.css';
import { TodoApp } from './TodoApp.js';
import { ProjectItem } from './ProjectItem.js';
const contentContainer = document.getElementById('container');
const projectItemsContainer = document.getElementById('projectList');

const defaultProject = {
    title: "Start here",
    description: "This is your new project",
}

function addProjectElements(projects) {
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
        projectItemsContainer.appendChild(projectElement);
    });

}

// This code runs every time the app is opened.
function loadApp(isThereData) {
    if (!isThereData) {
        TodoApp.addProject(new ProjectItem(defaultProject));
        addProjectElements(TodoApp.getAllProjects());
    }
}

// This code add events to the buttons

const addProjectBtn = document.getElementById("addProject");

addProjectBtn.addEventListener('click', () => {
    const projectTitle = prompt("Add the project's title");
    const projectDescription = prompt("Add the project's description");

    const projectData = {
        title: projectTitle,
        description: projectDescription,
    };

    TodoApp.addProject(projectData);
    addProjectElements(TodoApp.getAllProjects());
});

//This is just for testing functionality
loadApp(false);
console.log(TodoApp.getAllProjects());