// Auto-detect Environment Information
function detectEnvironment() {
    const userAgent = navigator.userAgent;
    let browser = "Unknown";

    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        browser = "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
        browser = "Mozilla Firefox";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        browser = "Safari";
    } else if (userAgent.includes("Edg")) {
        browser = "Microsoft Edge";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        browser = "Opera";
    }

    document.getElementById("browser-info").value = browser;
    document.getElementById("screen-info").value = `${screen.width} x ${screen.height}`;
    document.getElementById("viewport-info").value = `${window.innerWidth} x ${window.innerHeight}`;
    document.getElementById("language-info").value = navigator.language;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById("timezone-info").value = timezone;

    if (navigator.connection) {
        const connection = navigator.connection;
        document.getElementById("connection-info").value =
            `${connection.effectiveType.toUpperCase()} (${connection.downlink} Mbps)`;
    } else {
        document.getElementById("connection-info").value = "Not available";
    }

    console.log("🖥️ Environment detected:", {
        browser: browser,
        screen: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: timezone,
    });
}

detectEnvironment();

window.addEventListener("resize", () => {
    document.getElementById("viewport-info").value = `${window.innerWidth} x ${window.innerHeight}`;
});

// Character Counter
const stepsTextarea = document.getElementById("steps");
const stepsCount = document.getElementById("steps-count");

stepsTextarea.addEventListener("input", () => {
    const count = stepsTextarea.value.length;
    stepsCount.textContent = count;

    if (count > 1000) {
        stepsCount.style.color = "#ef4444";
    } else {
        stepsCount.style.color = "#6b7280";
    }
});

// File Upload Handling
const fileUploadArea = document.getElementById("file-upload-area");
const fileInput = document.getElementById("screenshot");
const filePreview = document.getElementById("file-preview");
let uploadedFiles = [];

fileInput.addEventListener("change", handleFileSelect);

fileUploadArea.addEventListener("dragover", e => {
    e.preventDefault();
    fileUploadArea.style.borderColor = "var(--primary-color)";
    fileUploadArea.style.background = "rgba(59, 130, 246, 0.05)";
});

fileUploadArea.addEventListener("dragleave", e => {
    e.preventDefault();
    fileUploadArea.style.borderColor = "var(--border-color)";
    fileUploadArea.style.background = "transparent";
});

fileUploadArea.addEventListener("drop", e => {
    e.preventDefault();
    fileUploadArea.style.borderColor = "var(--border-color)";
    fileUploadArea.style.background = "transparent";

    const files = e.dataTransfer.files;
    handleFiles(files);
});

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const maxSize = 5 * 1024 * 1024;

    for (let file of files) {
        if (file.size > maxSize) {
            showError("file-error", `File "${file.name}" is too large. Max size is 5MB.`);
            continue;
        }

        if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
            showError("file-error", `File "${file.name}" is not a valid image or video.`);
            continue;
        }

        uploadedFiles.push(file);
        displayFilePreview(file);
    }
}

function displayFilePreview(file) {
    const reader = new FileReader();

    reader.onload = e => {
        const previewItem = document.createElement("div");
        previewItem.className = "file-preview-item";

        if (file.type.startsWith("image/")) {
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="${file.name}">
                <button class="remove-file" onclick="removeFile('${file.name}')">
                    <i class="fas fa-times"></i>
                </button>
            `;
        } else {
            previewItem.innerHTML = `
                <video src="${e.target.result}" controls></video>
                <button class="remove-file" onclick="removeFile('${file.name}')">
                    <i class="fas fa-times"></i>
                </button>
            `;
        }

        filePreview.appendChild(previewItem);
    };

    reader.readAsDataURL(file);
}

function removeFile(fileName) {
    uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);

    const previewItems = filePreview.querySelectorAll(".file-preview-item");
    previewItems.forEach(item => {
        const img = item.querySelector("img, video");
        if (img && img.alt === fileName) {
            item.remove();
        }
    });

    console.log(`🗑️ File removed: ${fileName}`);
}

// Progress Bar Update
function updateProgress() {
    const form = document.getElementById("bug-report-form");
    const requiredFields = form.querySelectorAll("[required]");
    let filledFields = 0;

    requiredFields.forEach(field => {
        if (field.type === "radio") {
            const radioGroup = form.querySelectorAll(`input[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (isChecked) filledFields++;
        } else if (field.value.trim() !== "") {
            filledFields++;
        }
    });

    const progress = (filledFields / requiredFields.length) * 100;
    document.getElementById("progress-fill").style.width = `${progress}%`;
    document.getElementById("progress-percentage").textContent = Math.round(progress);
}

document
    .querySelectorAll("#bug-report-form input, #bug-report-form select, #bug-report-form textarea")
    .forEach(field => {
        field.addEventListener("input", updateProgress);
        field.addEventListener("change", updateProgress);
    });

// Save Draft
document.getElementById("save-draft").addEventListener("click", () => {
    const formData = {
        bugTitle: document.getElementById("bug-title").value,
        bugCategory: document.getElementById("bug-category").value,
        steps: document.getElementById("steps").value,
        expected: document.getElementById("expected").value,
        actual: document.getElementById("actual").value,
        userName: document.getElementById("user-name").value,
        userEmail: document.getElementById("user-email").value,
        userAccount: document.getElementById("user-account").value,
        additionalInfo: document.getElementById("additional-info").value,
        timestamp: new Date().toISOString(),
    };

    localStorage.setItem("bugReportDraft", JSON.stringify(formData));
    showNotification("Draft saved successfully!", "success");
    console.log("💾 Draft saved to localStorage");
});

function loadDraft() {
    const draft = localStorage.getItem("bugReportDraft");
    if (draft) {
        const formData = JSON.parse(draft);

        document.getElementById("bug-title").value = formData.bugTitle || "";
        document.getElementById("bug-category").value = formData.bugCategory || "";
        document.getElementById("steps").value = formData.steps || "";
        document.getElementById("expected").value = formData.expected || "";
        document.getElementById("actual").value = formData.actual || "";
        document.getElementById("user-name").value = formData.userName || "";
        document.getElementById("user-email").value = formData.userEmail || "";
        document.getElementById("user-account").value = formData.userAccount || "";
        document.getElementById("additional-info").value = formData.additionalInfo || "";

        updateProgress();
        console.log("📂 Draft loaded from localStorage");
    }
}

loadDraft();

// Form Submission
document.getElementById("bug-report-form").addEventListener("submit", e => {
    e.preventDefault();

    if (!validateBugForm()) {
        showNotification("Please fill all required fields correctly.", "error");
        return;
    }

    const referenceId = "BUG-" + Date.now();

    const formData = {
        referenceId: referenceId,
        bugTitle: document.getElementById("bug-title").value,
        bugCategory: document.getElementById("bug-category").value,
        priority: document.querySelector('input[name="priority"]:checked').value,
        steps: document.getElementById("steps").value,
        expected: document.getElementById("expected").value,
        actual: document.getElementById("actual").value,
        userName: document.getElementById("user-name").value,
        userEmail: document.getElementById("user-email").value,
        userAccount: document.getElementById("user-account").value,
        additionalInfo: document.getElementById("additional-info").value,
        environment: {
            browser: document.getElementById("browser-info").value,
            screen: document.getElementById("screen-info").value,
            viewport: document.getElementById("viewport-info").value,
            language: document.getElementById("language-info").value,
            timezone: document.getElementById("timezone-info").value,
            connection: document.getElementById("connection-info").value,
        },
        filesCount: uploadedFiles.length,
        submittedAt: new Date().toISOString(),
    };

    console.log("📤 Submitting bug report:", formData);

    setTimeout(() => {
        document.getElementById("bug-report-form").style.display = "none";
        document.querySelector(".progress-bar").style.display = "none";
        document.querySelector(".progress-text").style.display = "none";

        document.getElementById("reference-id").textContent = referenceId;
        document.getElementById("success-message").style.display = "block";

        localStorage.removeItem("bugReportDraft");

        showNotification("Bug report submitted successfully!", "success");
    }, 1500);
});

// Helper Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        setTimeout(() => {
            errorElement.textContent = "";
        }, 5000);
    }
}

function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOutRight 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

console.log("🐛 Bug report form initialized");
