import { ProjectItem } from "./ProjectItem.js";
import { TodoItem } from "./TodoItem.js";
import { CheckListItem } from "./CheckListItem.js";

export const TodoApp = {
    Projects: [],
    addProject(project) {
        this.Projects.push(project);
    },
    getAllProjects() {
        return this.Projects;
    },
    removeProject(projectId) {
        this.Projects = this.Projects.filter(
            project => project.id !== projectId
        );
    },
};