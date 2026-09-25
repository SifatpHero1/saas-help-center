// Bug Form Validation
function validateBugForm() {
    let isValid = true;

    document.querySelectorAll(".error-message").forEach(el => {
        el.textContent = "";
    });

    const bugTitle = document.getElementById("bug-title");
    if (!bugTitle.value.trim()) {
        showError("title-error", "Bug title is required");
        isValid = false;
    } else if (bugTitle.value.length < 10) {
        showError("title-error", "Title must be at least 10 characters");
        isValid = false;
    }

    const bugCategory = document.getElementById("bug-category");
    if (!bugCategory.value) {
        showError("category-error", "Please select a category");
        isValid = false;
    }

    const priority = document.querySelector('input[name="priority"]:checked');
    if (!priority) {
        showError("priority-error", "Please select a priority level");
        isValid = false;
    }

    const steps = document.getElementById("steps");
    if (!steps.value.trim()) {
        showError("steps-error", "Steps to reproduce are required");
        isValid = false;
    } else if (steps.value.length < 20) {
        showError("steps-error", "Please provide more detailed steps (min 20 characters)");
        isValid = false;
    }

    const expected = document.getElementById("expected");
    if (!expected.value.trim()) {
        showError("expected-error", "Expected behavior is required");
        isValid = false;
    }

    const actual = document.getElementById("actual");
    if (!actual.value.trim()) {
        showError("actual-error", "Actual behavior is required");
        isValid = false;
    }

    const userName = document.getElementById("user-name");
    if (!userName.value.trim()) {
        showError("name-error", "Name is required");
        isValid = false;
    }

    const userEmail = document.getElementById("user-email");
    if (!userEmail.value.trim()) {
        showError("email-error", "Email is required");
        isValid = false;
    } else if (!isValidEmail(userEmail.value)) {
        showError("email-error", "Please enter a valid email address");
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById("bug-title").addEventListener("blur", function () {
    if (this.value.trim() && this.value.length < 10) {
        showError("title-error", "Title must be at least 10 characters");
    } else {
        document.getElementById("title-error").textContent = "";
    }
});

document.getElementById("user-email").addEventListener("blur", function () {
    if (this.value.trim() && !isValidEmail(this.value)) {
        showError("email-error", "Please enter a valid email address");
    } else {
        document.getElementById("email-error").textContent = "";
    }
});

console.log("✅ Form validation initialized");
