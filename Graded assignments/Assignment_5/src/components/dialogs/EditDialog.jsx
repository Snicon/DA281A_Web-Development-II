/* Sixten Peterson - aq9300 */
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react"; // HeadlessUI används för dialogrutan.
import {useState} from "react"; // Importerar useState för att göra det möjligt att hålla koll på state, används främst för input i formulär men även för felmeddelande.
import LocalStorageManager from "../../data/LocalStorageManager.js"; // Importerar LocalStorageManager för att kunna "kommunicera" med LocalStorage.

// React-komponenter
import ErrorMessage from "../forms/messages/ErrorMessage.jsx";
import DialogButtonArea from "./partials/DialogButtonArea.jsx";

/**
 * Reactkomponent som agerar dialog i applikationen. Komponenten innehåller ett formulär för att redigera ett valt ord.
 *
 * @param {Object} props
 * @param {string|null} props.isEditingWord - Termen för det ord som redigeras (används för att hämta ordobjektet från
 * local storage)
 * @param {function} props.onClose - Funktionen som anropas för att stänga dialogen
 * @param {function} props.fetchWords - Funktionen som anropas för att hämta ord på nytt och synka UI med local storage
 * @returns {React.JSX.Element}
 */
function EditDialog({isEditingWord, onClose, fetchWords}) {
    const originalWordData = isEditingWord
        ? LocalStorageManager.Get(isEditingWord)
        : null; // Lagrar data för ordet som redigeras, bland annat för att förfylla formuläret åt användaren.

    // React state, specifikt kopplat till formulär.
    const [term, setTerm] = useState(() => originalWordData?.term ?? "");
    const [definition, setDefinition] = useState(() => originalWordData?.definition ?? "");
    const [explanation, setExplanation] = useState(() => originalWordData?.explanation ?? "");

    // React state för felmeddelande
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Försöker spara ändringar till local storage, vid eventuellt misslyckande visas felmeddelande för användaren.
     */
    const handleSaveChanges = () => {
        const word = LocalStorageManager.Get(originalWordData.term); // Hämtar ordets data från local storage
        if (word === null) return; // Tidig returnering om ordet inte finns. Skulle med fördel bytas ut mot något bättre för användarens skull, men rimligtvis krävs det väldigt speciella förutsättningar för att detta ska ske.

        let validInput = false; // Variabel som håller koll på om input är giltig.

        // Försöker justera objektet med setters och fångar eventuella undantag om input är för kort.
        try {
            word.term = term;
            word.definition = definition;
            word.explanation = explanation;
            validInput = true;
        } catch (error) {
            setErrorMessage(error.message);
            validInput = false;
        }

        let updateSuccessful = false; // Variabel som lagrar resultatet av att ett sparförsök till local storage
        if (validInput) {
            updateSuccessful = LocalStorageManager.Update(originalWordData.term, word);
        }

        if (validInput && !updateSuccessful) { // Om det inte gick att spara ändringen visas ett felmeddelande för användaren.
            setErrorMessage("Ändringen misslyckades. Är du säker på att termen inte redan finns i ordboken?")
        } else if (validInput && updateSuccessful) { // Vid giltig input och lyckad uppdatering uppdateras ordlistan för att synka state med local storage, formuläret stängs och formulärstate rensas.
            editSuccessful();
        }
    }

    /**
     * Enkel hjälpfunktion som används i {@link handleSaveChanges} för att uppdatera state, stänga dialog och rensa
     * formulär state.
     */
    const editSuccessful = () => {
        fetchWords(); // Uppdaterar state
        onClose(); // Stänger formulär
        clearFormStates(); // Rensar formulärstate
    }

    /**
     * Rensar state
     */
    const clearFormStates = () => {
        setTerm("");
        setDefinition("");
        setExplanation("");
        setErrorMessage("");
    }

    return (
        // Dialogruta som bygger på HeadlessUI-biblioteket https://headlessui.com/react/dialog (Som Laravelfantast dyrkar jag TailwindLabs https://github.com/tailwindlabs)
        <Dialog open={isEditingWord !== null} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="bg-zinc-900 rounded-xl w-full md:w-1/2 2xl:w-1/5">
                    <div className="bg-zinc-700/40 rounded-xl p-6 border border-zinc-300/20">
                        <DialogTitle className="font-bold text-4xl text-zinc-100 text-center">Redigera ord ({originalWordData && originalWordData.term})</DialogTitle>
                        <Description className="text-zinc-500 mt-2 text-center">Redigera ordet genom att svara på formuläret nedan.</Description>

                        <form action={handleSaveChanges}>
                            <div className="flex flex-col items-start justify-center mt-4 px-4">
                                <label className="text-emerald-400 font-semibold uppercase text-xs mb-1.5 tracking-widest" htmlFor="term">Term</label>
                                <input required value={term} onChange={e => setTerm(e.target.value)} className="border rounded-md border-zinc-300/20 mb-4 py-1 px-2 text-zinc-200 w-full" name="term" id="term" type="text"/>

                                <label className="text-emerald-400 font-semibold uppercase text-xs mb-1.5 tracking-widest" htmlFor="definition">Definition</label>
                                <input required value={definition} onChange={e => setDefinition(e.target.value)} className="border rounded-md border-zinc-300/20 mb-4 py-1 px-2 text-zinc-200 w-full" name="definition" id="definition" type="text"/>

                                <label className="text-emerald-400 font-semibold uppercase text-xs mb-1.5 tracking-widest" htmlFor="explanation">Förklaring</label>
                                <textarea required value={explanation} onChange={e => setExplanation(e.target.value)} className="border rounded-md border-zinc-300/20 mb-4 py-1 px-2 text-zinc-200 w-full h-24" name="explanation" id="explanation"/>
                            </div>

                            {/* Felmeddelande */}
                            { errorMessage && <ErrorMessage message={errorMessage} /> }

                            {/* Knappar, se komponenten. */}
                            <DialogButtonArea handleCancel={onClose} />
                        </form>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default EditDialog;