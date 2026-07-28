/* Sixten Peterson - aq9300 */
/**
 * Ordklassen representerar ett ord i ordboken.
 *
 * Enkelt förklarat består ett ord i ordboken av en term, termen agerar unik identifierar och beskriver vilket ord det
 * rör sig om. Ytterligare har varje ord en definition där ordet (termen) definieras. Slutligen finns en förklaring här
 * kan det t.ex. finnas ett exempel på hur ordet används i en mening eller en annan förklaring som beskriver vad ordet
 * (termen) innebär.
 *
 * Utöver väldigt enkla setters och getters finns enklare valideringsregler som anropas i konstruktorn.
 */
class Word {
    static MIN_STRING_LENGTH = 3; // Konstant för minsta tillåtna sträng, tar bort magiska nummer (vana sedan Javakursen D0017D på LTU)

    #term = ""; // Fält för ordets term
    #definition = ""; // Fält för ordets definition
    #explanation = ""; // Fält för ordets förklaring

    /**
     * Klassens konstruktor, används då en ny instans av ordklassen skapas.
     * @param {string} term - Termen för ordet
     * @param {string} definition - Definitionen för ordet
     * @param {string} explanation - Förkalringen för ordet
     */
    constructor(term, definition, explanation) {
        this.term = term; // Använder settern för att sätta termen
        this.definition = definition; // Använder settern för att sätta definitionen
        this.explanation = explanation; // Använder settern för att sätta förklaringen
    }

    /**
     * Getter för termen, returnerar värdet i termfältet.
     * @returns {string} värdet i termfältet
     */
    get term() {
        return this.#term;
    }

    /**
     * Setter för termen, sätter termen till det givna värdet om det uppfyller kravet för minsta tillåtna tecken (3)
     * @param {string} term - Den nya termen
     * @throws {TypeError} Argumentet term måste vara minst tre tecken långt.
     */
    set term(term) {
        if (!this.#validMinimumLength(term)) throw new TypeError("Termen måste vara minst " + Word.MIN_STRING_LENGTH + " tecken lång.")
        this.#term = term;
    }

    /**
     * Getter för definitionen, returnerar värdet i definitionsfältet.
     * @returns {string} värdet i definitionsfältet
     */
    get definition() {
        return this.#definition;
    }

    /**
     * Setter för definitionen, sätter definitionen till det givna värdet om det uppfyller kravet för minsta tillåtna tecken (3)
     * @param {string} definition - Den nya definitionen
     * @throws {TypeError} Argumentet definition måste vara minst tre tecken långt.
     */
    set definition(definition) {
        if (!this.#validMinimumLength(definition)) throw new TypeError("Definitionen måste vara minst " + Word.MIN_STRING_LENGTH + " tecken lång.");
        this.#definition = definition;
    }

    /**
     * Getter för förklaringen, returnerar värdet i förklaringsfältet.
     * @returns {string} värdet i förklaringsfältet.
     */
    get explanation() {
        return this.#explanation;
    }

    /**
     * Setter för förklaringen, sätter förklaringen till det givna värdet om det uppfyller kravet för minsta tillåtna tecken (3)
     * @param {string} explanation - Den nya förklaringen
     * @throws {TypeError} Argumentet explanation måste vara minst tre tecken långt.
     */
    set explanation(explanation) {
        if (!this.#validMinimumLength(explanation)) throw new TypeError("Förklaringen måste vara minst " + Word.MIN_STRING_LENGTH + " tecken lång.");
        this.#explanation = explanation;
    }

    /**
     * Enkel hjälpmetod som validerar längden på en given sträng. Minst 3 tecken.
     * @param {string} string - Strängen som valideras
     * @returns {boolean} - Sant om strängen är minst 3 tecken lång, falskt om den är mindre än tre tecken lång.
     */
    #validMinimumLength(string) {
        return (string.length >= Word.MIN_STRING_LENGTH)
    }
}

export default Word;