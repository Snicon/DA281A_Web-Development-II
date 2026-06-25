/* Sixten Peterson - aq9300 */
"use strict";

/**
 * Uppgift 1
 * =========
 */
// Utför och skriver ut enkel matematik i konsolen
console.log(5 * 2 < 12);
console.log(55 > 22);
console.log(16 / 4 === 4);
console.log(8 + 2 <= 128);
console.log(32 * 8 >= 255);

/**
 * Uppgift 2
 * =========
 */
// Definierar variabler med strängar
let tuesday = "Tisdag";
let hamburger = "Hamburgare";
let iWillBeBack = "I'll be back";

// Skriver ut olika delar av strängarna i konsolen baserat på uppgiftsbeskrivningen
console.log(tuesday.substring(0, 3));
console.log(hamburger.substring(3, 10));
console.log(iWillBeBack.substring(5, 12));

/**
 * Uppgift 3
 * =========
 */
// Definierar variabler med strängar
let learning = "It's Learning";
let goodParts = "JavaScript: The Good Parts";

// Skriver ut olika delar av strängarna i konsolen i versaler/gemener baserat på uppgiftsbeskrivningen
console.log(learning.substring(5, 13).toUpperCase());
console.log(goodParts.substring(16, 26).toLowerCase());

/**
 * Uppgift 4
 * =========
 */
// Definierar variabel med en array av nummer
let numbers = [128, 256, 512, 1024, 2048];

// Variabel som håller koll på summan av alla nummer, initialiserad till 0
let sumOfNumbers = 0;

// For-loop som summerar alla nummer genom att addera varje nummer i arrayen till sumOfNumbers-variabeln
for (let i = 0; i < numbers.length; i++) {
    sumOfNumbers += numbers[i];
}
// Skriver ut summan i konsolen
console.log(sumOfNumbers);

// Räknar ut genomsnittet och sparar det till en variabel
let avgNumber = sumOfNumbers / numbers.length;
// Skriver ut i konsolen
console.log(avgNumber);

// Lägger till summan av alla nummer i slutet av arrayen, och därefter skrivs arrayen ut i konsolen.
numbers.push(sumOfNumbers);
console.log(numbers);

/**
 * Uppgift 5
 * =========
 */
// Lagrar strängar i en array
let countries = ["Sweden", "Denmark", "Finland", "Norway"];

// Skriver ut de tre första bokstäverna av det andra elementet ("Denmark") i konsolen
console.log(countries[1].substring(0, 3));

// Variabel för summan av bokstäver i alla element, initialiserad till 0
let sumOfLetters = 0;
// Adderar antalet bokstäver i varje sträng till sumOfLetters
for (let i = 0; i < countries.length; i++) {
    sumOfLetters += countries[i].length;
}

// Dividerar summan av alla bokstäver med antalet strängar i arrayen för att räkna ut genomsnittet.
let avgLetters = sumOfLetters / countries.length;
// Skriver ut genomsnittet i konsolen.
console.log(avgLetters);

/**
 * Uppgift 6
 * =========
 */
// Definierar variabel med en array av värden
let values = [3, 5, "Jane", true, 144, false];

// "Vänder på innehållet"
values.reverse();
// Skriver ut i konsolen
console.log(values);

/**
 * Uppgift 7
 * =========
 */
// Definierar flera variabler bestående av olika arrayer som består av olika typer av data.
let names = ["Jane", "Joe", "Eliza"];
let ages = [21, 34, 22];
let hasPet = [true, false, true];

// "Slår ihop" alla arrayer till en ny.
let multipleArrays = names + ages + hasPet;
// Skriver ut den nya arrayen i konsolen
console.log(multipleArrays);

/**
 * Uppgift 8
 * =========
 */
// Definierar variabel bestående av en array med strängar
let actors = ["Sherlock", "Watson", "Bo"];
// Slår ihop alla strängar i arrayen med ett bindesstreck mellan strängarna och skriver ut det i konsolen.
console.log(actors.join(" - "));

/**
 * Uppgift 9
 * =========
 */
// Definierar variabel med en int
let amount = 14;

// Nyttjar en if-sats för att skriva ut olika strängar i konsolen beroende på värdet av variabeln ovan.
if (amount < 50) {
    console.log("Less then 50!");
} else if (amount >= 50 && amount < 65) {
    console.log("Optimal range for the amount!")
} else {
    console.log("Too much!")
}

/**
 * Uppgift 10
 * =========
 */
// Variabel med antalet rader
let rows = 8;

// Utför utskrifter i enlighet med uppgiftsbeskrivningen
for (let i = 0; i < rows; i++) {
    console.log("#".repeat(i));
}