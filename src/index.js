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
    projects.forEach(project => {
        const projectElement = document.createElement('h2');
        projectElement.setAttribute("class", "projectElement");
        projectElement.textContent = project.title;
        projectItemsContainer.appendChild(projectElement);
    });

}

function loadApp(isThereData) {
    if (!isThereData) {
        TodoApp.addProject(new ProjectItem(defaultProject));
        addProjectElements(TodoApp.getAllProjects());
    }
}

loadApp(false);
console.log(TodoApp.getAllProjects());