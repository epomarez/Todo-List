import "./projectFormStyle.css";
export function createProjectForm(onSubmit) {

    const formContainer = document.createElement("div");
    formContainer.id = "form-container";

    // TITLE
    const formDescription = document.createElement("h3");
    formDescription.textContent =
        "Add a new project to manage your activities!";

    // FORM
    const form = document.createElement("form");
    form.classList.add("project-form");
    /*
    PROJECT TITLE
    */

    const titleParagraph = document.createElement("p");
    titleParagraph.classList.add('form-group');

    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "project-title";

    const titleText = document.createElement("span");
    titleText.textContent = "Project title: ";

    const titleRequired = document.createElement("strong");

    const titleRequiredSpan = document.createElement("span");
    titleRequiredSpan.setAttribute("aria-label", "required");
    titleRequiredSpan.textContent = "*";

    titleRequired.appendChild(titleRequiredSpan);

    titleLabel.appendChild(titleText);
    titleLabel.appendChild(titleRequired);


    const titleInput = document.createElement("input");

    titleInput.type = "text";
    titleInput.name = "project-title";
    titleInput.id = "project-title";
    titleInput.required = true;
    titleInput.maxLength = 40;

    titleParagraph.appendChild(titleLabel);
    titleParagraph.appendChild(titleInput);

    /*
    PROJECT DESCRIPTION
    */

    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.classList.add('form-group');

    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = "project-description";

    const descriptionText = document.createElement("span");
    descriptionText.textContent = "Project description:";

    descriptionLabel.appendChild(descriptionText);

    const descriptionInput =
        document.createElement("textarea");

    descriptionInput.name = "project-description";
    descriptionInput.id = "project-description";
    descriptionInput.maxLength = 75;
    descriptionInput.rows = 4;
    descriptionInput.cols = 30;

    descriptionParagraph.appendChild(descriptionLabel);
    descriptionParagraph.appendChild(descriptionInput);

    /*
    BUTTONS
    */

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("project-form-buttons");
    // SUBMIT BUTTON
    const submitButton = document.createElement("button");

    submitButton.type = "submit";
    submitButton.id = "submit-button";
    submitButton.textContent = "Submit";

    // CANCEL BUTTON
    const cancelButton = document.createElement("button");

    cancelButton.type = "button";
    cancelButton.id = "cancel-button";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", () => {
        formContainer.remove();
    });

    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(cancelButton);

    /*
    BUILD FORM
    */

    form.appendChild(titleParagraph);
    form.appendChild(descriptionParagraph);
    form.appendChild(buttonContainer);


    formContainer.appendChild(formDescription);
    formContainer.appendChild(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const projectData = {
            title: titleInput.value,
            description: descriptionInput.value,
        };

        onSubmit(projectData);
        formContainer.remove();
    });

    return formContainer;
}