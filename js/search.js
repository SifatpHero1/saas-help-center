// Search Data
const searchData = [
    {
        id: 1,
        title: "Getting Started with Our Platform",
        category: "Setup",
        description: "Learn the basics of setting up your account and navigating the dashboard.",
        keywords: ["start", "setup", "begin", "account", "dashboard", "introduction"],
    },
    {
        id: 2,
        title: "Troubleshooting Login Issues",
        category: "Authentication",
        description: "Solutions for common login problems and password reset procedures.",
        keywords: ["login", "password", "reset", "authentication", "sign in", "access"],
    },
    {
        id: 3,
        title: "Integrating with Third-Party Apps",
        category: "Integration",
        description: "Step-by-step guide to connect your favorite tools with our platform.",
        keywords: ["integration", "third-party", "connect", "api", "tools", "apps"],
    },
    {
        id: 4,
        title: "Managing User Permissions",
        category: "Administration",
        description: "How to set up and manage user roles and permissions in your organization.",
        keywords: ["permissions", "roles", "admin", "users", "access control", "manage"],
    },
    {
        id: 5,
        title: "Billing and Subscription Plans",
        category: "Billing",
        description: "Information about pricing, plans, and payment methods.",
        keywords: ["billing", "payment", "subscription", "plan", "pricing", "invoice"],
    },
    {
        id: 6,
        title: "Data Export and Backup",
        category: "Data Management",
        description: "How to export your data and create backups of your information.",
        keywords: ["export", "backup", "data", "download", "save", "restore"],
    },
    {
        id: 7,
        title: "API Documentation",
        category: "Developer",
        description: "Complete guide to using our REST API for custom integrations.",
        keywords: ["api", "developer", "rest", "endpoint", "documentation", "code"],
    },
    {
        id: 8,
        title: "Mobile App Setup",
        category: "Mobile",
        description: "Instructions for installing and configuring our mobile application.",
        keywords: ["mobile", "app", "ios", "android", "install", "phone"],
    },
];

// Search Functionality
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function performSearch(query) {
    if (!query || query.trim() === "") {
        searchResults.classList.remove("active");
        return;
    }

    const searchTerm = query.toLowerCase().trim();
    const results = searchData.filter(item => {
        return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.keywords.some(keyword => keyword.includes(searchTerm))
        );
    });

    displayResults(results);
}

function displayResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <p style="text-align: center; color: #6b7280;">
                    No results found. Try different keywords.
                </p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results
            .map(
                item => `
            <div class="search-result-item" onclick="openArticle(${item.id})">
                <h4 style="color: var(--primary-color); margin-bottom: 0.3rem;">
                    ${item.title}
                </h4>
                <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 0.3rem;">
                    ${item.description}
                </p>
                <span style="color: #9ca3af; font-size: 0.8rem;">
                    <i class="fas fa-folder"></i> ${item.category}
                </span>
            </div>
        `,
            )
            .join("");
    }

    searchResults.classList.add("active");
    console.log(`🔍 Search performed: "${searchInput.value}" - ${results.length} results found`);
}

function openArticle(id) {
    const article = searchData.find(item => item.id === id);
    console.log(`📖 Opening article: ${article.title}`);
    alert(`Opening: ${article.title}\n\nThis would navigate to the full article page.`);
    searchResults.classList.remove("active");
    searchInput.value = "";
}

searchInput.addEventListener(
    "input",
    debounce(e => {
        performSearch(e.target.value);
    }, 300),
);

searchBtn.addEventListener("click", () => {
    performSearch(searchInput.value);
});

document.addEventListener("click", e => {
    if (!e.target.closest(".search-box") && !e.target.closest(".search-results")) {
        searchResults.classList.remove("active");
    }
});

searchInput.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        searchResults.classList.remove("active");
        searchInput.blur();
    }
});

console.log("🔍 Search functionality initialized with", searchData.length, "articles");
