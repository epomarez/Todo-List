import { ProjectItem } from "./ProjectItem";
import { TodoItem } from "./TodoItem";
import { CheckListItem } from "./CheckListItem";

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