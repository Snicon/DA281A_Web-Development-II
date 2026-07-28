/* Sixten Peterson - aq9300 */
import WordCard from "./WordCard.jsx"; // Importerar React-komponent för ordkortet, används för att visa ett ordkort för varje ord ifrån local storage
import LocalStorageManager from "../../data/LocalStorageManager.js"; // Importerar manager-klassen som sköter "kommunikationen" med local storage

/**
 * React-komponent
 * @param {Object} props
 * @param {Array} props.words - Array med alla ord som ska visas på webbsidan.
 * @param {Function} props.onEditOpen - Funktion som öppnar redigeringsdialog.
 * @param {Function} props.fetchWords - Funktion som hämtar alla ord från local storage
 * @param {Function} setIsEditingWord - Funktion för att sätta vilket ord som redigeras
 * @returns {React.JSX.Element}
 */
function WordContainer({words, onEditOpen, fetchWords, setIsEditingWord}) {
    /**
     * Enkel funktion för att ta bort ett ord, först bekräftar användaren om den vill ta bort ordet. Om användaren vill ta bort ordet raderas ordet från local storage och alla orden laddas in på nytt från local storage för att uppdatera UI-state så att det är aktuellt.
     * @param {string} wordTerm - vilket ord som ska tas bort, term agerar unik identifierare.
     */
    function removeWord(wordTerm) {
        if (confirm(`Är du säker på att du vill ta bort ${wordTerm}?`)) { // Användaren får bekräfta om den vill ta bort ordet
            LocalStorageManager.Remove(wordTerm); // Användaren har valt ja, ordet raderas därmed från local storage
            fetchWords(); // Hämtar orden på nytt.
        }
        // Om användaren väljer nej händer inget.
    }

    return (
        <div
            className="mt-24 flex flex-col space-y-6"
        > {/* Använder flexbox för layout, flex-direction är satt till kolumn för att radda up varje ord på sidan */}
            {/* Om det inte finns några ord lagrade i local storage visas ett meddelande som förklarar hur användaren lägger till ett ord. */}
            { words.length === 0 ? (
                <p
                    className="text-center text-lg text-red-400"
                >
                    <span className="font-bold">Hoppsan!</span> Antingen finns inga ord i ordboken eller också har du sökt efter ett ord som inte finns i ordboken. Du vet väl att du kan lägga till ett nytt genom att klicka på plusknappen längst ner i högra hörnet?
                </p>
            ) : (
                // map-funktionen används som en glorifierad for each för att visa varje ord i words-listan i en egen ordkort-komponent (WordCard)
                words.map((word, i) => (
                    <WordCard
                        term={word.term}
                        definition={word.definition}
                        explanation={word.explanation}
                        removeWord={removeWord}
                        onEditOpen={onEditOpen}
                        setIsEditingWord={setIsEditingWord}
                        key={i}
                    />
                ))
            )}
        </div>
    )
}

export default WordContainer; // Exporterar funktionen