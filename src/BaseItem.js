export const BaseItem = class {
    title;
    description;
    id;
    constructor({
        title = "(Empty)",
        description = "(Empty)"
    } = {}) {

        this.id = crypto.randomUUID();

        this.setTitle(title);
        this.setDescription(description);
    }

    setTitle(title) {
        this.title = this._sanitizeText(title);
    }

    setDescription(description) {
        this.description = this._sanitizeText(description);
    }

    update(data = {}) {

        if ("title" in data) {
            this.setTitle(data.title);
        }

        if ("description" in data) {
            this.setDescription(data.description);
        }
    }

    _sanitizeText(value,
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