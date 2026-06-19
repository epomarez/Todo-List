import { BaseItem } from "./BaseItem.js";
import { CheckListItem } from "./CheckListItem.js";

export const TodoItem = class extends BaseItem {

    constructor({
        title,
        description,
        dueDate = null,
        priority = 1,
        notes,
        checkList = [],
        isDone = false
    }) {
        super({ title, description });
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = this._sanitizeText(notes);
        this.checkList = checkList;
        this.isDone = isDone;
    }

    update(data) {

        super.update(data);
        if ("dueDate" in data) {
            this.dueDate = this._sanitizeText(data.dueDate);
        }
        if (typeof data.priority === "number") {
            this.priority = data.priority;
        }
        this.notes = this._sanitizeText(data.notes);

    }

    toggleIsDone() {
        this.isDone = !this.isDone;
    }

    addCheck(checkItem = new CheckListItem()) {
        this.checkList.push(checkItem);
    }

    removeCheck(checkItemId) {
        this.checkList = this.checkList.filter(
            item => item.id != checkItemId
        );
    }

    getAllCheckItems() {
        return this.checkList;
    }
}