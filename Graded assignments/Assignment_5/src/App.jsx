/* Sixten Peterson - aq9300

 Allmän kommentar för uppgiften:
 För kommentering har jag valt att använda https://jsdoc.app/ då det är JavaScripts motsvarighet till Javas Javadoc och
 C#s "XML documentation comments" som jag har använt i andra programmeringskurser. Jag har dock simplifierat genom att
 utesluta lite Reactspecifikt bland annat.

 I övrigt är kodbasen uppdelad i renodlad Reactkod - i components och src - samt affärslogik (business logic) - i
 datakatalogen som befinner sig i src. Då jag är van vid OOP från Java och C# har jag gjort två enklare klasser i
 datakatlogen i syfte att lära mig mer om hur JavaScript hanterar klasser och objekt.

 Ytterligare används TailwindCSS (för CSS), HeadlessUI (för dialoger) och HeroIcons (för ikoner) utöver de bibliotek som
 Vite och Rect inkluderar i projektet. Jag har försökt vara tydlig i kommentarer med vad som är extrabibliotek. Alla
 CSS-klasser kommer från TailwindCSS.
 */

// React komponenter importeras nedan:
import Header from "./components/misc/Header.jsx";
import SearchForm from "./components/forms/SearchForm.jsx";
import AddButton from "./components/buttons/AddButton.jsx";
import AddDialog from "./components/dialogs/AddDialog.jsx";
import WordContainer from "./components/word/WordContainer.jsx";
import EditDialog from "./components/dialogs/EditDialog.jsx";
import Footer from "./components/navigation/Footer.jsx";

import {useEffect, useState} from "react"; // React hooks
import LocalStorageManager from "./data/LocalStorageManager.js"; // Importerar LocalStorageManagern

/**
 * Rotkomponenten för Reactapplikationen.
 * @returns {React.JSX.Element}
 */
function App() {
    // Applikationsdata state
    const [words, setWords] = useState([]); // Alla ord från local storage, börjar som en tom array
    const [searchTerm, setSearchTerm] = useState(""); // Sökord för att söka i ordboksdatabasen

    // Dialog states
    const [isAddOpen, setIsAddOpen] = useState(false); // Dialog för att lägga till ord
    const [isEditingWord, setIsEditingWord] = useState(null); // Dialog för att redigera rod

    /**
     * Funktionen uppdaterar URL:en i webbläsaren för att inkludera eventuellt sökord.
     * @param {string} newTerm - Det nya sökordet som önskas
     */
    const updateURL = newTerm => {
        const url = new URL(window.location); // Enkelt förklarat lagras URL:en i webbläsaren i en variabel
        url.searchParams.set('search', newTerm); // Uppdaterar sökordet i URL:en med hjälp av den nya termen
        window.history.pushState({}, '', url); // Uppdaterar URL:en i webbläsaren
    }

    /**
     * Uppdaterar state med alla ord från LocalStorageManager, vilket med andra ord synkar webbplatsen med local storage.
     */
    const fetchWords = () => {
        setWords(LocalStorageManager.GetAll());
    }

    useEffect(() => {
        fetchWords(); // Synkar state med local storage

        const urlParams = new URLSearchParams(window.location.search); // hämtar ut sökordet ur URL:en.
        const urlSearchTerm = urlParams.get("search"); // Hämtar värdet för "search"-parametern, null om inget värde.
        if (urlSearchTerm) { // Om sökordet inte är null.
            setSearchTerm(urlSearchTerm); // Sätter sökordet i state
        }
    }, []);

    useEffect(() => {
        updateURL(searchTerm); // Uppdaterar URL:en i webbläsaren när state för sökord förändras så att webbläsaren är i synk med state
    }, [searchTerm]);

    /**
     * Öppnar dialogen för att lägga till ett nytt ord genom att ändra state för isAddOpen
     */
    const onOpen = () => {
        setIsAddOpen(true);
    }

    /**
     * Stänger dialogen för att lägga till ett nytt ord genom att ändra state för isAddOpen
     */
    const onClose = () => {
        setIsAddOpen(false);
    }

    /**
     * Öppnar dialogen för att redigera ett ord genom att ändra state för isEditOpen
     */
    const onEditOpen = (term) => {
        setIsEditingWord(term);
    }

    /**
     * Stänger dialogen för att redigera ett ord genom att ändra state för isEditOpen
     */
    const onEditClose = () => {
        setIsEditingWord(null);
    }

    /**
     * Nyckeln för att sökfunktionen ska fungera. Genom att kopiera ordlistan till en filtrerad ordlista som bara innehgåller ord som matchar med sökordet.
     * @type {Word[]}
     */
    const filteredWords = words.filter(word => word.term.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className={`px-12 md:px-0 max-w-2xl mx-auto ${(isAddOpen || isEditingWord !== null) && "blur-sm "}`}> {/* Container div, blur-sm appliceras då någon av dialogerna är öppna för att "maskera" bakgrunden och hålla fokus på dialogerna */}
                <Header/> {/* Headerkomponenten visar huvudtitel och kort infotext */}

                <main> {/* Huvudinnehållet på webbplatsen */}
                    <SearchForm term={searchTerm} setTerm={setSearchTerm}/> {/* Sökformulär för att söka efter ord i ordboken */}
                    <AddButton onClick={onOpen}
                               className={`fixed bottom-24 lg:bottom-12 right-12 z-10 hover:cursor-pointer hover:bg-emerald-600 ${(isAddOpen || isEditingWord !== null) && "hidden"}`}
                    /> {/* Knapp för att öppna dialogen där användaren kan lägga till ett nytt ord. */}

                    {/* Container som innehåller kort för varje ord från ordlistan i state... eller ja, den filtrerade kopian av den listan. */}
                    <WordContainer words={filteredWords} fetchWords={fetchWords} onEditOpen={onEditOpen} setIsEditingWord={setIsEditingWord}/>
                </main>

                {/* Dialogrutor som kontrolleras genom state */}
                <AddDialog onClose={onClose} isOpen={isAddOpen} fetchWords={fetchWords}/>
                <EditDialog key={isEditingWord} onClose={onEditClose} isEditingWord={isEditingWord} fetchWords={fetchWords} /> {/* Key är kritisk för att dialogen ska "förfyllas" med rätt data*/}
            </div>

            <Footer /> {/* Enkel footer */}
        </>
    );
}

export default App
