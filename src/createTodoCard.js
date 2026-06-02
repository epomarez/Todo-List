import "./todoCardStyles.css";

export function createTodoCard(
    todo,
    {
        onToggle = () => { },
        onDelete = () => { },
        onSelect = () => { },
    } = {}
) {

    const card = document.createElement("div");
    card.classList.add("todo-card");

    if (todo.isDone) {
        card.classList.add("completed");
    }

    /*
    CHECKBOX
    */

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = todo.isDone;

    checkbox.addEventListener("click", (event) => {
        event.stopPropagation();

        onToggle(todo);
    });

    /*
    CONTENT
    */

    const content = document.createElement("div");
    content.classList.add("todo-card-content");

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const description = document.createElement("p");
    description.textContent = todo.description;

    content.appendChild(title);
    content.appendChild(description);

    /*
    DELETE BUTTON
    */

    const deleteButton = document.createElement("button");

    deleteButton.classList.add("delete-todo-btn");
    deleteButton.textContent = "✕";

    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        onDelete(todo, card);
    });

    /*
    SELECT CARD
    */

    card.addEventListener("click", () => {
        onSelect(todo);
    });

    /*
    BUILD
    */

    card.appendChild(checkbox);
    card.appendChild(content);
    card.appendChild(deleteButton);

    return card;
}