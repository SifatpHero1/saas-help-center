// Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("contact-name").value,
        email: document.getElementById("contact-email").value,
        subject: document.getElementById("contact-subject").value,
        priority: document.getElementById("contact-priority").value,
        message: document.getElementById("contact-message").value,
        timestamp: new Date().toISOString(),
    };

    console.log("📧 Contact form submitted:", formData);

    setTimeout(() => {
        showNotification("Message sent successfully! We'll get back to you soon.", "success");
        document.getElementById("contact-form").reset();
    }, 1000);
});

// Live Chat Button
document.getElementById("start-chat").addEventListener("click", () => {
    showNotification("Live chat feature would open here. Demo mode!", "success");
    console.log("💬 Live chat initiated");
});

// Schedule Video Call
document.getElementById("schedule-call").addEventListener("click", () => {
    showNotification("Video call scheduling would open here. Demo mode!", "success");
    console.log("📹 Video call scheduled");
});

// Helper Function
function showNotification(message, type) {
    const notification = document.createElement("div");
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
    notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

console.log("📞 Contact page initialized");
