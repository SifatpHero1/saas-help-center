// FAQ Accordion
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains("active");

        const category = faqItem.closest(".faq-category");
        category.querySelectorAll(".faq-item").forEach(item => {
            item.classList.remove("active");
        });

        if (!isActive) {
            faqItem.classList.add("active");
            console.log(`📖 FAQ opened: ${button.querySelector("span").textContent}`);
        }
    });
});

// FAQ Category Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const faqCategories = document.querySelectorAll(".faq-category");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.getAttribute("data-category");

        faqCategories.forEach(cat => {
            if (category === "all" || cat.getAttribute("data-category") === category) {
                cat.style.display = "block";
                cat.style.animation = "fadeIn 0.5s ease";
            } else {
                cat.style.display = "none";
            }
        });

        console.log(`🔍 FAQ filter: ${category}`);
    });
});

// Search within FAQ
const faqSearchInput = document.createElement("input");
faqSearchInput.type = "text";
faqSearchInput.placeholder = "Search FAQs...";
faqSearchInput.style.cssText = `
    width: 100%;
    max-width: 500px;
    margin: 0 auto 2rem;
    display: block;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 50px;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
`;

const faqContainer = document.querySelector(".faq-container");
faqContainer.insertBefore(faqSearchInput, faqContainer.firstChild);

faqSearchInput.addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();

    document.querySelectorAll(".faq-item").forEach(item => {
        const question = item.querySelector(".faq-question span").textContent.toLowerCase();
        const answer = item.querySelector(".faq-answer").textContent.toLowerCase();

        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});

faqSearchInput.addEventListener("focus", () => {
    faqSearchInput.style.borderColor = "var(--primary-color)";
    faqSearchInput.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
});

faqSearchInput.addEventListener("blur", () => {
    faqSearchInput.style.borderColor = "var(--border-color)";
    faqSearchInput.style.boxShadow = "none";
});

console.log("❓ FAQ page initialized");
