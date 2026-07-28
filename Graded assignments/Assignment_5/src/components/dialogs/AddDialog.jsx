/* Sixten Peterson - aq9300 */
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react"; // HeadlessUI används för dialogrutan.
import {useState} from "react"; // Importerar useState för att göra det möjligt att hålla koll på state, används främst för input i formulär men även för felmeddelande.
import LocalStorageManager from "../../data/LocalStorageManager.js"; // Importerar LocalStorageManager för att kunna "kommunicera" med LocalStorage.
import Word from "../../data/Word.js"; // Importerar Word-klassen som representerar en "entry" i den enkla ordboken

// React-komponenter
import ErrorMessage from "../forms/messages/ErrorMessage.jsx";
import DialogButtonArea from "./partials/DialogButtonArea.jsx";

/**
 * Reactkomponent som agerar dialog i applikationen. Komponenten innehåller ett formulär för att lägga till ett nytt ord.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Om dialogen ska vara öppen eller ej
 * @param {function} props.onClose - Funktionen som anropas för att stänga dialogen
 * @param {function} props.fetchWords - Funktionen som anropas för att hämta ord på nytt och synka UI med local storage
 * @returns {React.JSX.Element}
 */
function AddDialog({isOpen, onClose, fetchWords}) {
    // React state, specifikt kopplat till formulär.
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");
    const [explanation, setExplanation] = useState("");

    // React state, specifikt kopplat till formulär.
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Rensar state
     */
    const clearFormStates = () => {
        setTerm("");
        setDefinition("");
        setExplanation("");
        setErrorMessage("");
    }

    /**
     * Hjälpfunktion för att stänga dialogen, rensar state och anropar onClose().
     */
    const handleOnClose = () => {
        clearFormStates();
        onClose();
    }

    /**
     * Försöker lägga till ett nytt ord i local storage, vid eventuellt misslyckande informeras användaren med hjälp av ett felmeddelande.
     */
    function addWord() {
        try {
            if (LocalStorageManager.Get(term) != null) {
                setErrorMessage("Termen \"" + term + "\" har redan definierats en gång, vänligen definiera en annan term.")
            } else {
                const word = new Word(term, definition, explanation); // Skapar ny instans av ordklassen
                const status = LocalStorageManager.Add(word); // Försöker lägga till ordet till local storage

                if (!status) {
                    setErrorMessage("Misslyckades med att lägga till ordet, vänligen försök på nytt.")
                } else {
                    fetchWords(); // Synkar state med local storage
                    handleOnClose(); // Stänger dialog
                }
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        // Dialogruta som bygger på HeadlessUI-biblioteket https://headlessui.com/react/dialog (Som Laravelfantast dyrkar jag TailwindLabs https://github.com/tailwindlabs)
        <Dialog open={isOpen} onClose={handleOnClose} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="bg-zinc-900 rounded-xl w-full md:w-1/2 2xl:w-1/5">
                    <div className="bg-zinc-700/40 rounded-xl p-6 border border-zinc-300/20">
                        <DialogTitle className="font-bold text-4xl text-zinc-100 text-center">Lägg till ett nytt ord</DialogTitle>
                        <Description className="text-zinc-500 mt-2 text-center">Skapa ett nytt ord genom att svara på formuläret nedan.</Description>

                        <form action={addWord}>
                            <div className="flex flex-col items-start justify-center mt-4 px-4">
                                <label className="text-emerald-400 font-semibold uppercase text-xs mb-1.5 tracking-widest" htmlFor="term">Term</label>
                                <input required value={term} onChange={e => setTerm(e.target.value)} className="border rounded-md border-zinc-300/20 mb-4 py-1 px-2 text-zinc-200 w-full" id="term" name="term" type="text"/>

                                <label className="text-emerald-400 font-semibold uppercase text-xs mb-1.5 tracking-widest" htmlFor="definition">Definition</label>
                                <input required value={definition} onChange={e => setDefinition(e.target.value)} className="border rounded-md border-zinc-300/20 mb-4 py-1 px-2 text-zinc-200 w-full" id="definition" name="definition" type="text"/>

                                <label className="text-emerald-400 font-semibold uppercase text-xs mb-1.5 tracking-widest" htmlFor="explanation">Förklaring</label>
                                <textarea required value={explanation} onChange={e => setExplanation(e.target.value)} className="border rounded-md border-zinc-300/20 mb-4 py-1 px-2 text-zinc-200 w-full h-24" id="explanation" name="explanation"/>
                            </div>

                            {/* Felmeddelande */}
                            { errorMessage && <ErrorMessage message={errorMessage} /> }

                            {/* Knappar, se komponenten. */}
                            <DialogButtonArea handleCancel={handleOnClose}/>
                        </form>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default AddDialog;