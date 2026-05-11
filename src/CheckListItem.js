export const CheckListItem = class {
    constructor({
        task = "(Empty)",
        isDone = false
    }) {
        this.id = crypto.randomUUID();
        this.task = task.trim();
        this.isDone = isDone;
    }

    setTask(text) {
        this.task = sanitizeText(text);
    }

    toggle() {
        this.isDone = !this.isDone;
    }

    #sanitizeText(value,
        fallback = "(Empty)") {
        if (typeof value !== "string") {
            return fallback;
        }

        const trimmed = value.trim();

        return trimmed === ""
            ? fallback
            : trimmed;
    }
}