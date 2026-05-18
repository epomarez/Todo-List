import { BaseItem } from './BaseItem.js';
import { TodoItem } from './TodoItem.js';
export const ProjectItem = class extends BaseItem {

    constructor({ title, description }) {
        super({ title, description });
        this.todos = [];
    }

    addTodoItem(todoItem = new TodoItem()) {
        this.todos.push(todoItem);
    }

    removeTodoItem(itemId) {
        this.todos = this.todos.filter(
            todoItem => todoItem.id != itemId);
    }

    getAllTodoItems() {
        return this.todos;
    }
}