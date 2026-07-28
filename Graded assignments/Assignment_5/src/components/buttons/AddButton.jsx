/* Sixten Peterson - aq9300 */
import {PlusIcon} from "@heroicons/react/24/outline"; // Plusikon från HeroIcons-biblioteket

/**
 * React-komponent för att skapa ett nytt ord (eller snarare öppna pop-up-rutan med formuläret för att skapa ett ord). Logiken för att öppna rutan mottas genom onClick-propset
 * @param {Object} props
 * @param {string} props.className - Klassnamn att applicera på komponenten, påverkar specifikt knappelementet i komponenten.
 * @param {function} props.onClick - Funktionen som körs när knappen klickas
 * @returns {JSX.Element}
 */
function AddButton({className, onClick}) {
    return (
        <button onClick={onClick} className={`group ${className}`}> {/* Kanpp-element med onClick-event som hämtas från propsen, tillåter även css-klasser genom props. */}
            <PlusIcon className="w-16 h-auto text-white group-hover:bg-emerald-600 bg-emerald-400 rounded-md p-2 border-2 border-white transition-colors duration-300 ease-in-out"/> {/* Ikon från HeroIcons-biblioteket. */}
            <span className="sr-only">Lägg till ett nytt ord</span> {/* Beskrivande text för knappen som enbart visas för skärmläsare i syfte att öka tillgängligheten för webbsidan. */}
        </button>
    )
}

export default AddButton; // Exporterar funktionen