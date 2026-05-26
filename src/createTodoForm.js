import "./todoFormStyle.css";
import { CheckListItem } from "./CheckListItem.js";

export function createTodoForm(onSubmit, data = {}) {

    /*
    FORM CONTAINER
    */

    const formContainer = document.createElement("div");
    formContainer.classList.add("todo-form-container");

    const formTitle = document.createElement("h2");

    formTitle.textContent =
        data.title
            ? "Edit Todo Item"
            : "Create a new Todo Item";

    /*
    FORM
    */

    const form = document.createElement("form");
    form.classList.add("todo-form");

    /*
    TITLE
    */

    const titleGroup = document.createElement("div");
    titleGroup.classList.add("form-group");

    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "todo-title";
    titleLabel.textContent = "Title *";

    const titleInput = document.createElement("input");

    titleInput.type = "text";
    titleInput.id = "todo-title";
    titleInput.name = "todo-title";
    titleInput.required = true;
    titleInput.maxLength = 40;

    if (data.title) {
        titleInput.value = data.title;
    }

    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);

    /*
    DESCRIPTION
    */

    const descriptionGroup = document.createElement("div");
    descriptionGroup.classList.add("form-group");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = "todo-description";
    descriptionLabel.textContent = "Description";

    const descriptionInput =
        document.createElement("textarea");

    descriptionInput.id = "todo-description";
    descriptionInput.name = "todo-description";
    descriptionInput.maxLength = 150;
    descriptionInput.rows = 4;

    if (data.description) {
        descriptionInput.value = data.description;
    }

    descriptionGroup.appendChild(descriptionLabel);
    descriptionGroup.appendChild(descriptionInput);

    /*
    DUE DATE
    */

    const dueDateGroup = document.createElement("div");
    dueDateGroup.classList.add("form-group");

    const dueDateLabel = document.createElement("label");
    dueDateLabel.htmlFor = "todo-date";
    dueDateLabel.textContent = "Due Date";

    const dueDateInput = document.createElement("input");

    dueDateInput.type = "date";
    dueDateInput.id = "todo-date";
    dueDateInput.name = "todo-date";

    if (data.dueDate) {
        dueDateInput.value = data.dueDate;
    }

    dueDateGroup.appendChild(dueDateLabel);
    dueDateGroup.appendChild(dueDateInput);

    /*
    PRIORITY
    */

    const priorityGroup = document.createElement("div");
    priorityGroup.classList.add("form-group");

    const priorityLabel = document.createElement("label");
    priorityLabel.htmlFor = "todo-priority";
    priorityLabel.textContent = "Priority";

    const prioritySelect =
        document.createElement("select");

    prioritySelect.id = "todo-priority";

    const priorities = [
        { value: 1, text: "Low" },
        { value: 2, text: "Medium" },
        { value: 3, text: "High" },
    ];

    priorities.forEach(priority => {

        const option = document.createElement("option");

        option.value = priority.value;
        option.textContent = priority.text;

        if (
            data.priority &&
            Number(data.priority) === priority.value
        ) {
            option.selected = true;
        }

        prioritySelect.appendChild(option);
    });

    priorityGroup.appendChild(priorityLabel);
    priorityGroup.appendChild(prioritySelect);

    /*
    NOTES
    */

    const notesGroup = document.createElement("div");
    notesGroup.classList.add("form-group");

    const notesLabel = document.createElement("label");
    notesLabel.htmlFor = "todo-notes";
    notesLabel.textContent = "Notes";

    const notesInput =
        document.createElement("textarea");

    notesInput.id = "todo-notes";
    notesInput.name = "todo-notes";
    notesInput.rows = 4;
    notesInput.maxLength = 300;

    if (data.notes) {
        notesInput.value = data.notes;
    }

    notesGroup.appendChild(notesLabel);
    notesGroup.appendChild(notesInput);

    /*
    CHECKLIST SECTION
    */

    const checklistSection =
        document.createElement("div");

    checklistSection.classList.add("checklist-section");

    const checklistTitle =
        document.createElement("h3");

    checklistTitle.textContent = "Checklist";

    const checklistContainer =
        document.createElement("div");

    checklistContainer.classList.add(
        "checklist-container"
    );

    /*
    FUNCTION TO CREATE CHECKLIST INPUT
    */

    function createChecklistRow(checkData = {}) {

        const row = document.createElement("div");

        row.classList.add("checklist-row");

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        if (checkData.isDone) {
            checkbox.checked = true;
        }

        const taskInput =
            document.createElement("input");

        taskInput.type = "text";
        taskInput.placeholder = "Checklist task";
        taskInput.maxLength = 60;

        if (checkData.task) {
            taskInput.value = checkData.task;
        }

        const removeButton =
            document.createElement("button");

        removeButton.type = "button";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            row.remove();
        });

        row.appendChild(checkbox);
        row.appendChild(taskInput);
        row.appendChild(removeButton);

        checklistContainer.appendChild(row);
    }

    /*
    LOAD EXISTING CHECKLIST
    */

    if (
        data.checkList &&
        Array.isArray(data.checkList)
    ) {

        data.checkList.forEach(checkItem => {
            createChecklistRow(checkItem);
        });
    }

    /*
    ADD CHECKLIST BUTTON
    */

    const addChecklistButton =
        document.createElement("button");

    addChecklistButton.type = "button";
    addChecklistButton.textContent =
        "Add Checklist Item";

    addChecklistButton.addEventListener(
        "click",
        () => {
            createChecklistRow();
        }
    );

    checklistSection.appendChild(checklistTitle);
    checklistSection.appendChild(checklistContainer);
    checklistSection.appendChild(addChecklistButton);

    /*
    BUTTONS
    */

    const buttonContainer =
        document.createElement("div");

    buttonContainer.classList.add(
        "todo-form-buttons"
    );

    const submitButton =
        document.createElement("button");

    submitButton.type = "submit";
    submitButton.textContent = "Save";

    const cancelButton =
        document.createElement("button");

    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", () => {
        formContainer.remove();
    });

    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(cancelButton);

    /*
    BUILD FORM
    */

    form.appendChild(titleGroup);
    form.appendChild(descriptionGroup);
    form.appendChild(dueDateGroup);
    form.appendChild(priorityGroup);
    form.appendChild(notesGroup);
    form.appendChild(checklistSection);
    form.appendChild(buttonContainer);

    formContainer.appendChild(formTitle);
    formContainer.appendChild(form);

    /*
    SUBMIT
    */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const checklistItems = [];

        const rows =
            checklistContainer.querySelectorAll(
                ".checklist-row"
            );

        rows.forEach(row => {

            const checkbox =
                row.querySelector(
                    'input[type="checkbox"]'
                );

            const taskInput =
                row.querySelector(
                    'input[type="text"]'
                );

            if (taskInput.value.trim() !== "") {

                checklistItems.push(
                    new CheckListItem({
                        task: taskInput.value,
                        isDone: checkbox.checked,
                    })
                );
            }
        });

        const todoData = {
            title: titleInput.value,
            description: descriptionInput.value,
            dueDate: dueDateInput.value,
            priority: Number(prioritySelect.value),
            notes: notesInput.value,
            checkList: checklistItems,
        };

        onSubmit(todoData);

        formContainer.remove();
    });

    return formContainer;
}