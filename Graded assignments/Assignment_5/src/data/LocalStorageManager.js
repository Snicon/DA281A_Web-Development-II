/* Sixten Peterson - aq9300 */
import Word from "./Word.js"; // Importerar Wordklassen som behövs för att representera ett ord/"entry" i ordboken

/**
 * Managerklass som används för att hantera "kommunikation" mot local storage.
 *
 * Syftet är att enkelt återanvända kod utan överdriven kodduplicering. Dessutom separerar detta business logic från UI
 * vilket jag fått lära mig är väldigt viktigt i mina C#- och Javakurser (MAU: DA204E, DA205E & LTU: D0017D, D0018D).
 * Normalt sätt skulle jag inte göra en hel managerklass statisk på detta vis men jag anser det godtyckligt för en enkel
 * uppgift som denna för att slippa skicka igenom ytterligare en prop till varje berörd komponent bara för att ha en
 * instans. Att komplicera ytterligare med state management känns väldigt overkill för en kurs som denna.
 */
class LocalStorageManager {
    /**
     * Lägg till ett ord i localstorage. Måste vara unikt (dvs. får ej förekomma tidigare, term används som unik
     * identifierare)
     * @param {Word} word - Ordet som ska läggas till.
     * @returns {boolean} - Sant om ordet lagts till i local storage, falskt om ordet ej lagts till i local storage.
     * Vilket kan bero på att word-argumentet inte är en instans av Wordklassen och/eller att termen i ordet redan
     * används. Alternativt har en exception uppstått.
     */
    static Add(word) {
        // Säkerställer att argumentet från parametern är en instans av ett ord och att den unika identifieraren inte
        // krockar med ett redan existerande ords term.
        try {
            if (word instanceof Word && LocalStorageManager.Get(word.term) == null) {
                // Lägger till ordet till local storage
                localStorage.setItem(word.term, JSON.stringify({ term: word.term, definition: word.definition,
                    explanation: word.explanation }));
                return true;
            }
        } catch (exception) {
            console.error(exception); // Loggar felet i konsolen för felsökning.
        }

        return false; // Ordet kunde inte lagras i local storage
    }

    /**
     * Försöker hämta ett ord från local storage baserat på den unika identifieraren (ordets term).
     * @param {string} keyName - Ordets unika identifierare (term)
     * @returns {Word|null} - Null om ordet inte kunde hämtas från local storage. En instans av ordet om ett ord
     * lyckades hämtas från local storage.
     */
    static Get(keyName) {
        const item = localStorage.getItem(keyName) // Hämtar ordet från local storage

        if (item === null) return null; // Tidig return eftersom ordet inte kunde hittas i local storage

        const data = JSON.parse(item);
        return new Word(data.term, data.definition, data.explanation); // Returnerar ett ordobjekt
    }

    /**
     * Hämtar alla ord från local storage sorterade i en lista efter bokstavsordning baserat på termen för enklare
     * överblick för användaren.
     * @returns {Word[]} - Lista med Word-objekt sorterade efter ordens term i bokstavsordning.
     */
    static GetAll() {
        const words = [];
        let sortedWords = []
        // Itererar genom alla local storage "entries/items"
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i); // Hämtar nyckeln (key) för posten i local storage med hjälp av index från loopen.
            const value = localStorage.getItem(key); // Hämtar värdet från posten med nyckeln som hämtades ovan.
            const parsedValue = JSON.parse(value); // "Parsar" till JSON för att enklare hantera datan
            words.push(new Word(parsedValue.term, parsedValue.definition, parsedValue.explanation)); // Skapar en instans av ordklassen baserat på JSON från raden ovan och lägger till objektet i en lista med alla ord.
        }

        sortedWords = words.toSorted((a, b) => a.term.localeCompare(b.term, 'sv')); // Slutligen sorteras alla ord, locale sv används för att ta hänsyn till svenska bokstäver såsom åäö.
        return sortedWords; // Returnerar den sorterade listans med ord.
    }

    /**
     * Raderar/tar bort ett ord från local storage med hjälp av ordets unika identifierare (term)
     * @param {string} keyName - Ordets unika identifierare (term)
     * @returns {boolean} - Falskt om den unika identifieraren ej kunde hittas i local storage som nyckel för något av orden. Sant om ordet tagits bort.
     */
    static Remove(keyName) {
        if (localStorage.key(keyName) === null) { // Om nyckeln (den unika identifieraren) inte finns i local storage (är null) görs en tidig returniring av falskt för att visa att ordet inte kunde raderas.
            return false;
        }

        localStorage.removeItem(keyName); // Tar bort ordet från local storage.
        return true; // Ordet blev borttaget som förväntat
    }

    /**
     * Uppdaterar/ändrar ordet med den utvalda nyckeln/termen och ersätter "datan" (den data?, datum? aja det är inte en
     * svenskakurs jag läser - även om det kanske skulle behövas...) i local storage för det ordet med ett nytt ord.
     * Kan jämföras med en HTTP PUT request för den som kan sin webbutveckling/sina HTTP request methods
     *
     * @param keyName - Ordets unika identifierare (term) för det ord som ska uppdateras/ändras
     * @param newWord - Ett ordobjekt som ska ersätta det gamla ordobjektet som lagrats i local storage
     * @returns {boolean} - Sant om uppdateringen lyckats, falskt om den misslycakts. Oftast uppstår misslyckanden i
     * samband med att en term som inte finns i local storage används. Kan även ske då det nya ordet innefattar en term
     * som redan används (förutsatt att termen ändras. Är termen densamma som innan är termen såklart redan definierad
     * men valideringen passerar eftersom det den unika identifieraren - termen - fortfarande bara finns definierad en
     * gång i local storage).
     */
    static Update(keyName, newWord) {
        const originalWord = this.Get(keyName); // Orginalnyckeln för ordet (behövs för att validera)
        const newWordFromStorage = this.Get(newWord.term); // Används för att kolla om termen redan är definierad eller ej

        if (originalWord === null) return false; // Tidig returnering då nyckeln som ska uppdateras är ogiltig (termen finns inte i local storage).
        if (newWordFromStorage !== null && newWordFromStorage.term !== originalWord.term) return false; // Returnerar tidigt. Ordet (termen) är redan definierat och inte detsamma som innan "redigeringen" (det vill säga en ny term). Om termen är densamma som originalet är det okej eftersom det inte uppstår någon duplicering av den unika identifieraren (termen).

        // Sätter ordet i local storage med hjälp av termen som nyckel.
        localStorage.setItem(newWord.term, JSON.stringify({ term: newWord.term, definition: newWord.definition, explanation: newWord.explanation }));
        if (newWord.term !== keyName) { // Om den nya termen är annorlunda från originaltermen för ordet raderas posten med originaltermen från localstorage då en ny nyckel används för ordet.
            localStorage.removeItem(keyName);
        }

        return true; // Ordet är uppdaterat som förväntat
    }
}

export default LocalStorageManager;