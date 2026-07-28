// ==========================================
// Keyboard Support
// keyboard.js
// ==========================================

function initKeyboard() {

    document.addEventListener("keydown", handleKeyPress);

}

// ==========================================
// MAIN KEYBOARD CONTROLLER
// ==========================================

function handleKeyPress(event) {

    const key = event.key;

    // Numbers
    if (!isNaN(key)) {

        clickButton(key);
        return;

    }

    switch (key) {

        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
        case ".":
        case "(":
        case ")":

            clickButton(key);
            break;

        case "Enter":

            event.preventDefault();
            clickButton("=");
            break;

        case "Backspace":

            clickButton("DEL");
            break;

        case "Delete":

            clickButton("AC");
            break;

        case "Escape":

            clickButton("AC");
            break;

    }

}

// ==========================================
// CLICK BUTTON
// ==========================================

function clickButton(value) {

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {

        if (button.textContent.trim() === value) {

            button.click();

        }

    });

}

// ==========================================
// EXPORT
// ==========================================

export {

    initKeyboard

};