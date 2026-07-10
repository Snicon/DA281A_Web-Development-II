/* Sixten Peterson aq9300. */

"use strict";

/**
 * Uppgift 1
 * =========
 */
let messageBox = document.getElementById("message-box"); // "Hittar" elementet med rätt id och lagrar i variabel för enklare hantering

// Definierar ett objekt som tillhandahåller vardera knapp element för enklare hantering
let buttons = {
    success: document.getElementById("success"),
    error: document.getElementById("error"),
    info: document.getElementById("info"),
};

// Nyttjar en for-loop för att lägga till en ny eventlyssnare och -hanterare på vardera knapp som finns i objektet.
for (const button in buttons) {
    buttons[button].addEventListener("click", () => {
        messageBox.className = button; // Sätter klassnamnet för elemenetet med "message-box" idt till knappens namn vilket i sin tur ger rätt färg på elementet.
    });
}

/**
 * Uppgift 2
 * =========
 */
// Definierar variabler för de olika elementen av intresse för uppgiften genom att hämta elementet baserat på ID.
let items = document.getElementById("items"); // Själva ul-elementet för listan.
let addButton = document.getElementById("add-item"); // Knappen för att lägga till något nytt i listan.

addButton.addEventListener("click", () => { // Lägger till en eventlyssnare och -hanterare.
    let input = prompt("Write a text you want to add to the list.") // Använder prompt-funktionen för att ta emot input från besökaren.

    let newItem = document.createElement("li"); // Skapar ett nytt li-element.
    newItem.textContent = input; // Sätter textinnehållet för det nya li-elementet till besökarens input.
    items.appendChild(newItem); // Lägger till det nya li-elementet i slutet av listan
});

/**
 * Uppgift 3
 * =========
 */
// Definierar variabel för ta-bort-knappen
let removeButton = document.getElementById("remove-item");

removeButton.addEventListener("click", () => { // Lägger till en eventlyssnare och -hanterare.
    if (items.childElementCount > 0) { // Kontrollerar om det finns fler barn till ul-elementet eller ej. Om det finns raderas det sista elementet.
        items.lastElementChild.remove();
    } else {
        console.log("No items left to remove.") // Annars skrivs en liten logg ut i konsolen.
    }
});

/**
 * Uppgift 4
 * =========
 */
// Definierar variabel ta-bort-knapparna
let buttonsTask4 = document.getElementsByClassName("remove-list-item");

for (let i = 0; i < buttonsTask4.length; i++) { // Nyttjar for-loop för att lägga till eventlyssnare och -hanterare till varje knapp.
    buttonsTask4[i].addEventListener("click", function() {
        if (confirm("Are you sure you want to delete this item?")) { // Bekräftar att användaren vill ta bort li:n från listan.
            this.parentElement.parentElement.remove(); // Tar bort hela li-elementet och därmed även dess barn.
        }
    });
}

/**
 * Uppgift 5
 * =========
 */
// Definierar variabel för formulärelementet
let form = document.getElementById("apply-for-pet");
form.addEventListener("submit", (event) => {
    // Del 1 (logga till konsol):
    event.preventDefault(); // Avbryter att formuläret skickar besökaren vidare.

    // Lagrar fromulärdatan i ett objekt för enklare hantering av vår data.
    const formData = {
        firstname: form.elements.firstname.value,
        lastname: form.elements.lastname.value,
        age: form.elements.age.value,
        email: form.elements.email.value,
        pet: form.elements.pet.value,
    }

    console.log(formData); // Loggar formulärinnehållet i konsolen.

    // Del 2:
    // Lagrar funktioner för validering i ett objekt för att hålla det sammanhållet, antar att det är vana från mina C#- och Javakurser där OOP sällan är ett val utan snarare ett måste.
    const validationRules = {
        isNotEmpty(formData) { // Funktion som kollar om någon del av formuläret är tomt.
            for (const formPart in formData) {
                if (formData[formPart] === "") {
                    return false; // Formuläret innehåller minst ett tomt fält
                }
            }

            return true; // Formuläret innehåller inga tomma fält.
        },
        isMax50Chars(value) { // Kontrollerar om ett värde är 0 till 50 bokstäver
            return value.length > -1 && value.length <= 50;
        },
        isAgeValid(value) { // Kontrollerar om ett värde är en siffra större än 0
            return typeof Number(value) === "number" && value > 0;
        },
        isPetChosen(value) { // Kontrollerar om ett husdjur är valt i formuläret.
            return value.length > 0; // Ett husdjur är valt om värdet inte är tomt
        }
    }

    // Kallar på vardera valideringsmetod för vardera fält och informerar besökaren om eventuella fel.
    if (!validationRules.isNotEmpty(formData)) {
        alert("Please fill out the form.");
    } else if (!validationRules.isMax50Chars(formData.firstname)) {
        alert("Your first name must be less than 50 characters.");
    } else if (!validationRules.isMax50Chars(formData.lastname)) {
        alert("Your last name must be less than 50 characters.");
    } else if (!validationRules.isAgeValid(formData.age)) {
        alert("Your age must be a positive number.");
    } else if (!validationRules.isMax50Chars(formData.email)) {
        alert("Your email must be less than 50 characters.");
    } else if (!validationRules.isPetChosen(formData.pet)) {
        alert("The type of pet is required, please choose one.");
    } else {
        event.target.submit(); // Skickar iväg formuläret.
    }
})