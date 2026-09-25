// Browser Developer Tools Demo
console.log("🚀 SaaS Help Center Loaded Successfully");
console.log("📊 Browser Info:", {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
});

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

const currentTheme = localStorage.getItem("theme") || "light";
htmlElement.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
    const theme = htmlElement.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";

    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);

    console.log(`🎨 Theme changed to: ${newTheme}`);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("i");
    icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Window Resize
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log(`📐 Window resized: ${window.innerWidth}x${window.innerHeight}`);
    }, 250);
});

// Page Load Performance
window.addEventListener("load", () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);

    if (window.performance) {
        const timing = performance.timing;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        console.log(`📊 DOM Content Loaded: ${domContentLoaded}ms`);
    }
});

// Error Handling
window.addEventListener("error", event => {
    console.error("❌ Global Error:", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
    });
});

// Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            console.log(`👁️ Element visible: ${entry.target.className}`);
        }
    });
}, observerOptions);

document.querySelectorAll(".action-card, .article-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});

// Network Request Monitoring
function trackAPICall(endpoint, method = "GET") {
    const startTime = performance.now();
    console.log(`🌐 API Call Started: ${method} ${endpoint}`);

    setTimeout(() => {
        const endTime = performance.now();
        console.log(`✅ API Call Completed: ${method} ${endpoint} in ${Math.round(endTime - startTime)}ms`);
    }, 500);
}

trackAPICall("/api/help-articles", "GET");
trackAPICall("/api/user/preferences", "POST");
