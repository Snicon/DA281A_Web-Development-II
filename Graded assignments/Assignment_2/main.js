/* Sixten Peterson - aq9300 */
"use strict";

/**
 * Uppgift 1
 * =========
 */
// Definierar en funktion som returnerar det största talet
const max = (num1, num2) => {
    if (num1 > num2) {
        return num1;
    } else {
        return num2;
    }
};

// Definierar en funktion som returnerar det minsta talet
const min = (num1, num2) => {
    if (num1 > num2) {
        return num2;
    } else {
        return num1
    }
};

/**
 * Uppgift 2
 * =========
 */
// Definierar en funktion som returnerar en array med nummer, 0 till n där n är numret i funktionens argument (exklusiv)
const range = (num) => {
    // Variabel med ny tom array
    const arr = [];

    // For-loop som lägger till ett nytt nummer i arrayen tills numret är lika med n - 1.
    for (let i = 0; i < num; i++) {
        // Lägger till ett nummer längst bak i arrayen
        arr.push(i);
    }

    // Returnerar arrayen
    return arr;
};

// Testar funktionen i enlighet med uppgiftsbeskrivningen.
const testArray = range(10);
console.log(testArray);

/**
 * Uppgift 3
 * =========
 */
// Definierar en ny funktion som summerar talen i en array
const sum = (arr) => {
    // Variabel som håller koll på summan
    let total = 0;

    // For-loop som adderar varje tal i arrayen till summan, en efter en.
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }

    // Returnerar totalen
    return total;
};

// Testar funktionen i enlighet med uppgiftsbeskrivningen.
const numbers = [5, 10, 15, 20, 25];
const sumOfNumbers = sum(numbers);
console.log(sumOfNumbers);

/**
 * Uppgift 4
 * =========
 */
// Definierar en funktion som räknar hur många gånger ett visst tecken förekommer i en sträng.
const countCharacter = (word, char) => {
    // Variabel som håller koll på antalet förekomster
    let occurrences = 0;

    // For loop som går igenom varje tecken i strängen och adderar en förekomst till variabeln ovan om tecknet i strängen matchar tecken-argumentet.
    for (let i = 0; i < word.length; i++) {
        if (word[i] === char) {
            occurrences++;
        }
    }

    // Returnerar resultatet
    return occurrences;
};

// Definierar några variabler med strängar
const testString1 = "Jane Doe";
const testString2 = "Abracadabra";

// Testar funktionen som är definierad ovan, precis som i uppgiftsbeskrivningen.
console.log(countCharacter(testString1, "e")); // => 2
console.log(countCharacter(testString2, "a")); // => 4 (obs. litet "a")

/**
 * Uppgift 5
 * =========
 */
// Definierar funktion som kollar om en sträng är en palindrom eller ej och returnerar sant/falskt.
const palindrome = str => {
    // Delar upp strängen till flera delar genom en array där varje tecken blir ett eget element, vänder på ordningen i arrayen och sätter till sist samman alla elementen i omvänd ordning till en sträng. Slutligen returneras sant om ordet i strängen förblir detsamma efter omvändningen, eller falskt om inte.
    return str.split("",).reverse().join("") === str;
};

// Testar funktionen i enlighet med uppgiftsbeskrivningen
console.log(palindrome("sirap - paris")); // skickar tillbaka "true"
console.log(palindrome("lorem ipsum")); // skickar tillbaka "false"

/**
 * Uppgift 6
 * =========
 */
// Definierar ett objekt i enlighet med uppgiftsbeskrivningen
const person = {
    firstName: "Sixten",
    lastName: "Peterson",
    age: 21,
    family: ["Maria Loorents Peterson", "Martin Peterson", "Julius Peterson", "Zelda Sjöblom"]
};

/**
 * Uppgift 7
 * =========
 */
// Definierar ett nytt objekt med samma struktur som i den tidigare uppgiften.
let person1 = {
    firstName: "Jane",
    lastName: "Doe",
    age: 25,
    family: ["John", "Eliza", "Elise"]
};

// Definierar en funktion som skriver ut objektet i konsolen.
const printPerson = (person) => {
    console.log(`Full name: ${person1.firstName} ${person1.lastName}, Age: ${person1.age}`);
    console.log("Family: " + person1.family.join(", "));
};

// Testar funktionen
printPerson(person1);

/**
 * Uppgift 8
 * =========
 */
// Definierar en funktion som returnerar ett objekt med höjd och bredd.
const createBox = (height, width) => {
    return {
        height,
        width,
    }
};

// Testar funktionen i enlighet med uppgiftsbeskrivningen.
const box = createBox(15, 20);
// Skriv ut attributen
console.log(box.height); // skickar tillbaka 15
console.log(box.width); // skickar tillbaka 20

/**
 * Uppgift 9
 * =========
 */
// Definierar en funktion som returnerar ett objekt enligt given instruktion.
const triangle = (height, width) => {
    return {
        height,
        width,
        area() {
            return (this.height * this.width) / 2;
        }
    }
};

// Testar funktionen och funktionen i objektet som returneras av triangle-funktionen
const result = triangle(2, 4);
console.log(result);
console.log(result.area());

/**
 * Uppgift 10
 * =========
 */
// Definierar en funktion som returnerar en array bestående av namnen på alla attributet i objektet från argumentet av funktionen
const attributes = obj => {
    return Object.keys(obj);
};

// Testar enligt uppgiftsbeskrivning
const testObject1 = {
    width: 15,
    height: 20
};

const attrsFromObject1 = attributes(testObject1);
console.log(attrsFromObject1); // skickar tillbaka ["width", "height"]

const testObject2 = {
    a: 1,
    b: 2,
    c: 3
};

const attrsFromObject2 = attributes(testObject2);
console.log(attrsFromObject2); // skickar tillbaka ["a", "b", "c"]