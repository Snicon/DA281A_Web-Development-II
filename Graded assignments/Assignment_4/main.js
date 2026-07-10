/* Sixten Peterson aq9300. */

"use strict";

const API_KEY = "LÄGG TILL API-NYCKEL HÄR" // API-nyckel - bör hållas hemlig
const resultElement = document.getElementById("result"); // resultatelementet (en ol)


// Function som hämtar (söker) filmer baserat på en titel
const fetchMovies = (title) => {
    // DEBUG: console.log(title);
    // Objekt för att hantera AJAX
    const omdbAPI = new XMLHttpRequest();

    const omdbURL = `http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`;

    omdbAPI.addEventListener("load", function() {
        // Konvertera resultatet från JSON
        const result = JSON.parse(this.responseText);
        // Skriv ut resultatet på webbsidan
        addResultsToDOM(result);
    });

    // Ange vilken metod (get) samt URL vi ska skicka med
    omdbAPI.open("get", omdbURL, true);
    // Skicka förfrågan
    omdbAPI.send();
}

// Rensar sökresultaten från DOM
const clearSearchResults = () => {
    if (resultElement.childElementCount > 0) { // Kontrollerar om det finns några barn i resultatelementet
        while (resultElement.firstChild) { // Raderar ett barn åt gången tills null returneras (då alla barn är borttagna och inga resultat finns kvar i DOMen)
            resultElement.removeChild(resultElement.lastChild);
        }
    }
}

// Lägger till sökresultat till DOM
const addResultsToDOM = results => {
    clearSearchResults(); // Börjar med att rensa eventuella tidigare sökresultat

    // Om response är False så hittades inga resultat, därmed informeras användaren genom en liten popup
    if (results.Response === "False") {
        alert("No results found.");
    }

    // Itererar över alla sökresultat och lägger till i DOM
    for (const result in results.Search) {
        let newMovieTitle = document.createElement("li"); // Skapar ett nytt li-element
        newMovieTitle.textContent = `${results.Search[result].Title} (${results.Search[result].Year})`; // Sätter textinnehållet
        resultElement.appendChild(newMovieTitle); // Lägger till det nya elementet i DOM
    }
}

// Definierar variabel för formulärelementet
const form = document.getElementById('search-form');
const query = document.getElementById("query"); // Formulärets sökfält

// Lägger till eventlyssnare och -hanterare för formuläret
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Avbryter att formuläret skickar besökaren vidare.
    const query = form.elements.query.value;

    // Kollar om sökresultatet är giltigt (längre än 0 tecken), om ja så hämtas filmerna från API:n med hjälp av sökordet. Annars informeras besökaren att sökordet är tomt.
    if (query.length > 0) {
        fetchMovies(form.elements.query.value);
    } else {
        alert("A search query is required to perform a search.");
    }
})

// Variabel för "rensaknappen" som tömmer sökfältet
const clearButton = document.getElementById("clear-button");

// Lägger till eventlyssnare och -hanterare för sökordsfältet som visar/döljer "rensaknappen" baserat på om det finns input eller ej.
query.addEventListener("input", function() {
    clearButton.style.display = query.value ? "block" : "none";
});

// Lägger till eventlyssnare och -hanterare för "resnaknappen" så att den kan tömma sökfältet
clearButton.addEventListener("click", function() {
    query.value = ""; // Ändrar värdet på sökfältet till en tom sträng
    clearButton.style.display = "none"; // Döljer knappen
    clearSearchResults(); // Rensar alla sökresultat
});