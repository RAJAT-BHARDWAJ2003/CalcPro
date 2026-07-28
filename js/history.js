// ==========================================
// History Module
// history.js
// ==========================================

// ==========================================
// DOM
// ==========================================

const historyList = document.querySelector(".history-list");
const clearHistoryButton = document.getElementById("clear-history");

// ==========================================
// STATE
// ==========================================

let history = [];

// ==========================================
// INIT
// ==========================================

function initHistory() {

    clearHistoryButton.addEventListener("click", clearHistory);

    renderHistory();

}

// ==========================================
// ADD HISTORY
// ==========================================

function addHistory(expression, result) {

    history.unshift({

        expression,
        result

    });

    renderHistory();

}

// ==========================================
// RENDER
// ==========================================

function renderHistory() {

    historyList.innerHTML = "";

    history.forEach(item => {

        const div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `
            <p>${item.expression}</p>
            <strong>${item.result}</strong>
        `;

        historyList.appendChild(div);

    });

}

// ==========================================
// CLEAR
// ==========================================

function clearHistory() {

    history = [];

    renderHistory();

}

// ==========================================
// EXPORT
// ==========================================

export {

    initHistory,
    addHistory

};