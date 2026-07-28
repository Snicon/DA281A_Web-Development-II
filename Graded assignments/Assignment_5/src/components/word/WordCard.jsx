/* Sixten Peterson - aq9300 */
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid' // Skräp- och pennikonerna från HeroIcons-biblioteket

/**
 * React-komponent som representerar ett ord i ordboken i forms av ett kort ("card"). Komponenten innehåller även knappar för att redigera och radera ordet.
 * @param {Object} props
 * @param {string} props.term - Termen för ordet.
 * @param {string} props.definition - Definitionen av ordet.
 * @param {string} props.explanation - Förklaringen av ordet.
 * @param {function} props.removeWord - Funktion som körs när användaren klickar på knappen för att ta bort ordet.
 * @param {function} props.onEditOpen - Funktion som öppnar redigeringsdialogen.
 * @param {function} props.setIsEditingWord - Funktion för att lagra vilket ord som redigeras i state, kritisk för att redigeringen av ordet ska fungera i dialogen.
 * @returns {React.JSX.Element}
 */
function WordCard({ term, definition, explanation, removeWord, onEditOpen, setIsEditingWord}) {
    /**
     * Hanterar redigering genom att öppna redigeringsdialogen samt sätta ordet som redigeras till ordet i komponenten (som identifieras genom propsen)
     */
    const handleEdit = () => {
        onEditOpen();
        setIsEditingWord(term)
    }

    return (
        <article
            className="bg-zinc-700/40 border border-zinc-300/20 rounded-xl p-4"
        > {/* Article-elementet används för sitt semantiska värde, https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article */}
            <div
                className="flex justify-between items-center"
            > {/* Flexbox används för att justera layouten, ordet hamnar till vänster och ikonerna för att redigera och ta bort till höger. */}
                <h2
                    className="text-2xl sm:text-4xl font-bold text-emerald-400"
                >
                    {term}
                    <span
                        className="text-lg text-zinc-100"
                    >
                        , {definition}
                    </span>
                </h2>
                <div
                    className="flex space-x-2"
                >
                    <button
                        className="group p-2 hover:cursor-pointer"
                        onClick={handleEdit}
                    > {/* Öppnar redigeringsdialogen då knappen trycks. */}
                        <PencilIcon
                            className="w-6 h-auto text-zinc-500 transition-colors duration-300 group-hover:text-yellow-300"
                        />
                        <span
                            className="sr-only"
                        >
                            Redigera ordet "{term}"
                        </span>
                    </button>
                    <button
                        className="group p-2 hover:cursor-pointer"
                        onClick={() => removeWord(term)}
                    > {/* Kallar på funktionen för att ta bort ordet när knappen trycks. */}
                        <TrashIcon
                            className="w-6 h-auto text-zinc-500 transition-colors duration-300 group-hover:text-red-400"
                        />
                        <span
                            className="sr-only"
                        >
                            Radera ordet "{term}"
                        </span>
                    </button>
                </div>
            </div>
            <p
                className="text-sm md:text-base text-zinc-400 mt-2"
            >
                <span
                    className="font-bold"
                >
                    Förklaring</span>: {explanation}
            </p>
        </article>
    )
}

export default WordCard;