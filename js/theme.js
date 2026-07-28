// ==========================================
// Theme Module
// theme.js
// ==========================================

// ==========================================
// DOM
// ==========================================

const themeToggle = document.getElementById("theme-toggle");

// ==========================================
// CONSTANTS
// ==========================================

const STORAGE_KEY = "calculator-theme";

// ==========================================
// INITIALIZE
// ==========================================

function initTheme() {

    loadTheme();

    themeToggle.addEventListener("click", toggleTheme);

}

// ==========================================
// TOGGLE
// ==========================================

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");

}

// ==========================================
// LOAD
// ==========================================

function loadTheme() {

    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeToggle.textContent = "☀️";

    } else {

        document.body.classList.remove("dark");

        themeToggle.textContent = "🌙";

    }

}

// ==========================================
// EXPORT
// ==========================================

export {

    initTheme

};